<?php
include "getApi.php";


//https://www.w3schools.com/php/php_mysql_connect.asp
class Database{
    protected $servername;
    protected $username;
    protected $password;
    protected $_conn;

    public function __construct(string $servername, string $username, string $password){
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
    }

    // need to write a heandler!!!

    public function connect($db=null){
        //connects to the DB and ends the programm in case of error
        $this->_conn = new mysqli($this->servername, $this->username, $this->password,$db);
        if($this->_conn->connect_error){
            die("Failed to connect ". $this->_conn->connect_error);
        }
        
    }

    public function disconnect(){
        //disconnects from DB
        $this->_conn->close();
    }

    protected function executeSQL(string $statment, Array $param = []){
        //querys SQL --> when executed correctly returns true else dies
        
        if(!empty($param)){
            #echo "<br> args";
            $stmt = $this->_conn->prepare($statment); //parameter = ? for value; name of var needs to metch
            if($stmt === false){
                die("some thing went wrong<br>".$this->_conn->error."<br>".$statment);
            }

            $type = "";#generate types
            foreach ($param as $parami => $parame) {
                $type .= gettype($parame)[0];
                #echo(gettype($parame));
            }

            $stmt->bind_param($type, ...$param);
            $stmt->execute();
            
            
            #https://stackoverflow.com/questions/24363755/mysqli-bind-results-to-an-array
            #converts output to array
            
            #creating "header" of table
            $meta = $stmt->result_metadata();
            if (gettype($meta) == "boolean") {
                $stmt->close();
                return $meta;
            }
            while ($field = $meta->fetch_field()) 
            { 
                $params[] = &$row[$field->name]; 
            }
            call_user_func_array(array($stmt, 'bind_result'), $params); 

            #filling iwth content
            while ($stmt->fetch()) { 
                foreach($row as $key => $val) 
                { 
                    $c[$key] = $val; 
                } 
                $result[] = $c; 
            } 


            //$stmt->close();
            #checks if result is set, since when the query dont return anything result would'nt be set
            return !isset($result) ? [] : $result;

        }else{
            
            $stmt = $this->_conn->query($statment);
            if($stmt === false){
                die("some thing went wrong"."<br>".$this->_conn->error."<br>".$statment);
            }
            else if($stmt === true){
                #executed without a return
                return true;
            }else{
                #https://stackoverflow.com/questions/1501274/get-array-of-rows-with-mysqli-result
                # convert result to array
                while($row = $stmt->fetch_row()) {
                    $result[] = $row;
                }
                return $result;
            }
        }
    }

    public function executeSQLFromFile(string $pathToFile){
        $statment = ""; //temp var for 
        foreach (file($pathToFile) as $line){
            $statment .= $line;
            if(strpos($line,";") !== false){
                $this->executeSQL($statment);
                $statment = "";
            }
        }
    }
}










class FoodBD extends Database{
    #constructor from parent

    public function addProvider(int $id, string $name, string $location, string $url)# id null for auto 
    {
        $this->executeSQL("INSERT INTO provider (id, name, location, url) VALUES (?, ?, ?, ?);", [$id,$name,$location,$url]);
    }

    public function getMaxTagId()
    {
        $id = $this->executeSQL("SELECT MAX(id) FROM tags;")[0][0];
        #echo "<p>".$id."<p>";
        return isset($id) ?  (int) $id : (int) 0;
    }

    public function addTag(string $tag,$id = null)
    {
        #echo "<p>".$tag."->id:".$id."<p>";
        if(!isset($id)){
            $this->executeSQL("INSERT INTO tags (tag) VALUES (?);",[$tag]);
        }else{
            $this->executeSQL("INSERT INTO tags (id,tag) VALUES (?,?);",[$id,$tag]);
        }
    }

    public function getTagId(string $tag)
    {
        $r = $this->executeSQL("SELECT id FROM tags WHERE tag = ?;",[$tag]);
        return (count($r) > 0) ? $r[0]["id"] : null;
    }

    public function addOffer(string $id = null,int $providerId,string $name,string $description,string $date,int $averageRating = null,$price = null)
    {
        $values = (isset($id) ? "id," : "")."providerId,name,description,date".(isset($averageRating) ? ",averageRating" : "").(isset($price) ? ",price" : "");
        #echo $values;
        $param = array();
        foreach ([$id,$providerId,$name,$description,$date,$averageRating,$price] as $p){
            if (isset($p)){
                $param = array_merge($param,array($p));
            }
        }
        #echo var_dump($param);
        $this->executeSQL("INSERT INTO offer ($values) VALUES (".str_repeat("?,",count($param) -1)."?)",$param);
    }
    
    public function addOffer2Tags(int $offerId,int $tagId)
    {
        $this->executeSQL("INSERT INTO offer2tags (offerId,tagId) VALUES (?,?);",[$offerId,$tagId]);
    }
    
    public function getAllOfferByDate(String $date, Array $provider = array())
    {
        if(count($provider) == 0 ){#
            $offer = $this->executeSQL("SELECT id, providerId, name, description, price, averageRating FROM offer WHERE offer.date = ?;",[$date]);#geting all relervant food
        }else {
            #echo var_dump([$date,...$provider]);
            #echo var_dump("(".str_repeat("?,",count($provider)-1)."?)");
            $offer = $this->executeSQL("SELECT id, providerId, name, description, price, averageRating FROM offer WHERE offer.date = ? AND offer.providerId in (".str_repeat("?,",count($provider)-1)."?);",[$date,...$provider]);#geting all relervant food
        }
        #echo var_dump($offer)."<br><br>";
        
        foreach ($offer as $id => $food) {#adding tags and comments
            #adding tags
            $offer[$id]["tags"] = array();
            $tags = $this->executeSQL("SELECT tags.tag FROM offer2tags JOIN tags ON offer2tags.tagId = tags.id WHERE offer2tags.offerId = ?;",[$food["id"]]);
            if($tags[0]["tag"] != ""){#tag not empty
                $offer[$id]["tags"] = array();
                foreach ($tags as $tag) {#only appends the values
                    $offer[$id]["tags"] = array_merge($offer[$id]["tags"], array($tag["tag"]));
                }
            }
            #echo var_dump($offer[$id]["tags"])."<br><br>";

            #adding comments
            $comments = $this->executeSQL("SELECT ratings.comment FROM ratings WHERE ratings.offerId = ?;",[$offer[$id]["id"]]);
            $offer[$id]["comments"] = array();
            foreach ($comments as $commentId => $comment) {#adding only the value of comment
                $offer[$id]["comments"] = array_merge($offer[$id]["comments"], array($tag["comment"]));
            }
        }
        return $offer;
    }

    public function getUserId()
    {   
        $id =(int) $this->executeSQL("SELECT MAX(id) FROM userId;")[0][0];
        #echo var_dump($id);
        if($id == "NULL"){
            $id = 0;
        }
        #echo var_dump($id);

        $this->executeSQL("INSERT INTO userId (id) VALUES (?);",[$id + 1]);
        #echo var_dump($id);
        return $id + 1; 
    }

    public function setRating(int $rating, int $offerId, int $userId, String $comment = null)
    {
        if(!isset($comment)){
            $this->executeSQL("INSERT INTO ratings (userId,offerId,rating) VALUES (?,?,?)",[$userId,$offerId,$rating]);
        } else{
            $this->executeSQL("INSERT INTO ratings (userId,offerId,rating,comment) VALUES (?,?,?,?)",[$userId,$offerId,$rating,$comment]);
        }
        $this->updateAverageRating($offerId);
    }

    public function delRating(int $offerId, int $userId)
    {
        $this->executeSQL("DELETE FROM ratings WHERE offerId = ? AND userId = ?;",[$offerId,$userId]);
        $this->updateAverageRating($offerId);
    }

    public function editRating(int $offerId, int $userId, int $rating = null, String $comment = null)
    {
        if(isset($rating) && !isset($comment)){
            $this->executeSQL("UPDATE ratings SET rating = ? WHERE offerId = ? AND userId = ?;",[$rating,$offerId,$userId]);
        }else if(isset($comment) && !isset($rating)){
            $this->executeSQL("UPDATE ratings SET comment = ? WHERE offerId = ? AND userId = ?;",[$comment,$offerId,$userId]);
        }else if(isset($rating) && isset($comment)){
            $this->executeSQL("UPDATE ratings SET rating = ?, comment = ? WHERE offerId = ? AND userId = ?;",[$rating,$comment,$offerId,$userId]);
        }
        $this->updateAverageRating($offerId);
    }
    private function calcAverageRating(int $offerId)
    {
        $ratings = $this->executeSQL("SELECT rating FROM ratings WHERE ratings.offerId = ?;",[$offerId]);#getting all ratings for rating id
        #echo "<br>".var_dump($ratings);
        
        $sum = 0;
        foreach ($ratings as $rating){
            $sum += $rating["rating"];#adding all ratings
        }

        return count($ratings)==0 ? null : $sum/count($ratings);#returns null if there are no ratings else returns the average
    }

    private function updateAverageRating(int $id){
        $averageRating = round($this->calcAverageRating($id),1); # gets the average for a id and rounds it to one decermial number
        #echo $averageRating;
        if(isset($averageRating)){#may isset($averageRating) ?  $this->executeSQL("UPDATE offer SET averageRating = ? WHERE id = ?",[$averageRating,$id]) : $this->executeSQL("UPDATE offer SET averageRating = NULL WHERE id = ?",[$id]);
            $this->executeSQL("UPDATE offer SET averageRating = ? WHERE id = ?",[$averageRating,$id]); #update averagerating to calc
        }else{
            $this->executeSQL("UPDATE offer SET averageRating = NULL WHERE id = ?",[$id]);#update average rating to null
        }
    }

    #del
    public function dropDB()
    {
        $this->executeSQL("DROP DATABASE lunchboxfooddb;");
    }

}


function fillFoodDB(Database $db){
    

    # adding provider
    #echo "<br><br><br><p>".var_dump(getProvider())."<p>";
    foreach (getProvider() as $provider) {
        $provider = (array) $provider;
        #echo "<br><br>".var_dump($provider);
        $db->addProvider(...$provider);
    }
    #adding tags and adding offer
    foreach (getOffer() as $offer){
        $offer = (array) $offer;
        
        if(!in_array("price",array_keys($offer))){#change!!!!!!!!!!!!!!!!!!!!!!!
            #echo "<br> offer without price ". var_dump($offer);
            $offer["price"] = null;
        }
        #echo "<p>".var_dump($offer)."<p>";
        $db->addOffer($offer["id"],$offer["provider"],$offer["name"],$offer["description"],$offer["day"],null,$offer["price"]);

        if(count($offer["tags"]) == 0){
            $offer["tags"][0] = "";
        }
        #echo "<br>".var_dump($offer["tags"]);

        foreach($offer["tags"] as $tagId => $tag){
            $id = $db->getTagId($tag);
            #echo "<br>".var_dump($id);
            if(!isset($id)){#tag not in db
                $id = $db->getMaxTagId()+1;
                $db->addTag($tag,$id);
            }
            #echo "<br>adding ",var_dump($offer["id"]),"-->", var_dump($id);
            $db->addOffer2Tags($offer["id"],$id);
        }
        #echo "<br><br>".var_dump($tags);
    }

    
}

/*
$db = new Database("localhost","root","");
$db->connect();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
$db->execute("SELECT * FROM offer");
$db->disconnect();
*/

/*
class DBHandler implements SessionHandlerInterface{ 

}
*/
?>