<?php
include "getApi.php";#for filling

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
            die("Failed to connect! ". $this->_conn->connect_error);
        }
        
    }

    public function disconnect(){
        //disconnects from DB
        $this->_conn->close();
    }

    protected function executeSQL(string $statment, Array $param = []){   
        if(!empty($param)){
            #echo "<br> args";
            $stmt = $this->_conn->prepare($statment); //parameter replaced with ? --> args need to be in order of questionmark
            if($stmt === false){
                die("something went wrong<br>".$this->_conn->error."<br>with the Quesrry: ".$statment."<br> and the args: ".var_dump($param));
            }

            $type = "";#generate types
            foreach ($param as $parami => $parame) {
                $type .= gettype($parame)[0];
                #echo(gettype($parame));
            }

            $stmt->bind_param($type, ...$param);#replaces ? with value of param ... but only treads them as values --> (against sql injections)
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

            #filling with content
            while ($stmt->fetch()) { 
                foreach($row as $key => $val) 
                { 
                    $c[$key] = $val; 
                } 
                $result[] = $c; 
            } 

            $stmt->close();
            #checks if result is set, since when the query dont return anything "result" would'nt be set
            return isset($result) ? $result : [] ;

        }else{#querry without param
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
                $stmt->close();
                return $result;
            }
        }
    }

    public function executeSQLFromFile(string $pathToFile){
        $statment = ""; //temp var for multiline statments
        foreach (file($pathToFile) as $line){
            $statment .= $line;
            if(str_contains($line,";")){
                $this->executeSQL($statment);
                $statment = "";
            }
        }
    }
}










class FoodBD extends Database{
    #constructor from parent
    public function getLocations()
    {
        $locations = array();
        foreach ($this->executeSQL("SELECT location FROM `provider` GROUP BY location") as $id=>$location) {
            $locations[$id]=$location[0];
        }
        #echo var_dump($locations);
        return ["locations"=>$locations];
    }

    public function getProvider(array $locations = null)
    {
        if(isset($locations)){
            $providers = $this->executeSQL("SELECT id, name, location, url FROM provider WHERE location in (".str_repeat("?,",count($locations)-1)."?);", [...$locations]);
        }else{
            $providers = $this->executeSQL("SELECT id, name, location, url FROM provider;");
        }

        $rt = array();
        if(isset($providers[0]["id"])){
            $rt = $providers;
        }else{
            foreach ($providers as $id=>$provider){
                array_push($rt,["id"=>(int)$provider[0],"name"=>$provider[1],"location"=>$provider[2],"url"=>$provider[3]]);
            }
        }
        return $rt;
    }

    public function addProvider(int $id = null, string $name, string $location, string $url) 
    {
        if (isset($id)){
            $this->executeSQL("INSERT INTO provider (id, name, location, url) VALUES (?, ?, ?, ?);", [$id,$name,$location,$url]);
        }else{#leting the db chose the id
            $this->executeSQL("INSERT INTO provider (name, location, url) VALUES (?, ?, ?);", [$name,$location,$url]);
        }
    }

    public function getMaxTagId()
    {
        $id = $this->executeSQL("SELECT MAX(id) FROM tags;")[0][0];
        #echo "<p>".$id."<p>";
        return isset($id) ?  (int) $id : (int) 0;#returning 0 when no tag is set
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
        return (count($r) > 0) ? $r[0]["id"] : null;#returning null if tag issnt in table
    }

    public function addOffer(string $id = null,int $providerId,string $name,string $description,string $date,int $averageRating = null,$price = null)
    {
        #dynamicaly generating the values that are beeing set by the querry
        $values = (isset($id) ? "id," : "")."providerId,name,description,date".(isset($averageRating) ? ",averageRating" : "").(isset($price) ? ",price" : "");
        #echo $values;
        $param = array();
        #checking wich params are going to be set
        foreach ([$id,$providerId,$name,$description,$date,$averageRating,$price] as $p){
            if (isset($p)){
                $param = array_merge($param,array($p));
            }
        }

        #echo var_dump($param);
        #generating the querry
        $this->executeSQL("INSERT INTO offer ($values) VALUES (".str_repeat("?,",count($param) -1)."?)",$param);
    }
    
    public function addOffer2Tags(int $offerId,int $tagId)
    {
        $this->executeSQL("INSERT INTO offer2tags (offerId,tagId) VALUES (?,?);",[$offerId,$tagId]);
    }
    
    public function getOffer(String $date,array $provider = null, array $location = null)
    {
        #selecting statment and args
        if(isset($location)){
            if(isset($provider)){
                $statment = "SELECT offer.id, offer.providerId, offer.name, offer.description, offer.price, offer.averageRating FROM offer JOIN provider ON offer.providerId = provider.id WHERE provider.location in (".str_repeat("?,",count($location)-1)."?) AND offer.date = ? AND offer.providerId in (".str_repeat("?,",count($provider)-1)."?);";
                $args = [...$location,$date,...$provider];
            }else {
                $statment = "SELECT offer.id, offer.providerId, offer.name, offer.description, offer.price, offer.averageRating FROM offer JOIN provider ON offer.providerId = provider.id WHERE provider.location in (".str_repeat("?,",count($location)-1)."?) AND offer.date = ?;";
                $args = [...$location,$date];
            }            
        }else{
            if(isset($provider)){
                $statment = "SELECT offer.id, offer.providerId, offer.name, offer.description, offer.price, offer.averageRating FROM offer WHERE offer.date = ? AND offer.providerId in (".str_repeat("?,",count($provider)-1)."?);";
                $args = [$date,...$provider];
            }else {
                $statment = "SELECT offer.id, offer.providerId, offer.name, offer.description, offer.price, offer.averageRating FROM offer WHERE offer.date = ?;";
                $args = [$date];
            }
        }

        #getting the offers
        $offer = $this->executeSQL($statment,$args);#geting all relervant food
        #echo var_dump($offer)."<br><br>";
        
        foreach ($offer as $id => $food) {#adding tags and comments
            #convert average rating str to decimal
            $offer[$id]["averageRating"] = isset($offer[$id]["averageRating"]) ? floatval($offer[$id]["averageRating"]) : null;

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
            $offer[$id]["comments"] = $this->executeSQL("SELECT ratings.comment,ratings.rating FROM ratings WHERE ratings.offerId = ? AND NOT ratings.comment = '';",[$offer[$id]["id"]]);
        }
        return $offer;
    }
    public function getOfferById(int $id )
    {
        #getting the offer
        $offer = $this->executeSQL("SELECT offer.id, offer.providerId, offer.name, offer.description, offer.price, offer.averageRating FROM offer WHERE offer.id = ?;",[$id])[0];#geting relervant food
        #echo var_dump($offer)."<br><br>";
                
        $offer["averageRating"] = isset($offer["averageRating"]) ? floatval($offer["averageRating"]) : null;

        #adding tags
        $offer["tags"] = array();
        $tags = $this->executeSQL("SELECT tags.tag FROM offer2tags JOIN tags ON offer2tags.tagId = tags.id WHERE offer2tags.offerId = ?;",[$food["id"]]);
        if($tags[0]["tag"] != ""){#tag not empty
            $offer["tags"] = array();
            foreach ($tags as $tag) {#only appends the values
                $offer["tags"] = array_merge($offer["tags"], array($tag["tag"]));
            }
        }
            #echo var_dump($offer[$id]["tags"])."<br><br>";

            #adding comments
        $offer["comments"] = $this->executeSQL("SELECT ratings.comment,ratings.rating FROM ratings WHERE ratings.offerId = ? AND NOT ratings.comment = '';",[$offer["id"]]);
        
        return array("offer"=>$offer);
    }

    public function getUserId()
    {   
        $id = (int) $this->executeSQL("SELECT MAX(id) FROM userId;")[0][0];
        #echo var_dump($id);
        if($id == "NULL"){#no id was set befor
            $id = 0;
        }
        #echo var_dump($id);

        $this->executeSQL("INSERT INTO userId (id) VALUES (?);",[$id + 1]);
        #echo var_dump($id);
        return $id + 1; 
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

    public function setRating(int $rating, int $offerId, int $userId, String $comment = null)
    {
        if(isset($comment)){
            $this->executeSQL("INSERT INTO ratings (userId,offerId,rating,comment) VALUES (?,?,?,?)",[$userId,$offerId,$rating,$comment]);
        } else{
            $this->executeSQL("INSERT INTO ratings (userId,offerId,rating) VALUES (?,?,?)",[$userId,$offerId,$rating]);
        }
        $this->updateAverageRating($offerId);#changing the averageRating of the offer
    }

    public function delRating(int $offerId, int $userId)
    {
        $this->executeSQL("DELETE FROM ratings WHERE offerId = ? AND userId = ?;",[$offerId,$userId]);
        $this->updateAverageRating($offerId);#changing the averageRating of the offer
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

    public function delOldOffer(String $oldestDate){
        $ids = $this->executeSQL("SELECT offer.id FROM offer WHERE offer.date < ?",[$oldestDate]);
        if(count($ids) > 0){
            $this->executeSQL("DELETE FROM offer2tags WHERE offer2tags.offerId in (".str_repeat("?,",count($ids) -1)."?)",ids);
            $this->executeSQL("DELETE FROM ratings WHERE ratings.offerId in (".str_repeat("?,",count($ids) -1)."?)",ids)
            $this->executeSQL("DELETE FROM offer WHERE offer.id in (".str_repeat("?,",count($ids) -1)."?)",ids)
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
        
        if(!in_array("price",array_keys($offer))){
            #echo "<br> offer without price ". var_dump($offer);
            $offer["price"] = null;
        }
        #echo "<p>".var_dump($offer)."<p>";
        $db->addOffer($offer["id"],$offer["provider"],$offer["name"],$offer["description"],$offer["day"],null,$offer["price"]);

        if(count($offer["tags"]) == 0){
            $offer["tags"][0] = "";#default tag
        }
        #echo "<br>".var_dump($offer["tags"]);

        #adding offer to tag
        foreach($offer["tags"] as $tagId => $tag){
            $id = $db->getTagId($tag);
            #echo "<br>".var_dump($id);
            if(!isset($id)){#tag not in db
                $id = $db->getMaxTagId()+1;
                $db->addTag($tag,$id);#adding tag to table
            }
            #echo "<br>adding ",var_dump($offer["id"]),"-->", var_dump($id);
            $db->addOffer2Tags($offer["id"],$id);
        }
        #echo "<br><br>".var_dump($tags);
    }

    
}

/*
class DBHandler implements SessionHandlerInterface{ 

}
*/
?>