<?php
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

    public function connect(){
        //connects to the DB and ends the programm in case of error
        $this->_conn = new mysqli($this->servername, $this->username, $this->password);
        if($this->_conn->connect_error){
            die("Failed to connect ". $this->_conn->connect_error);
        }
    }

    public function disconnect(){
        //disconnects from DB
        $this->_conn->close();
    }

    protected function executeSQL(string $statment, Array $param = [],string $type = ""){
        //querys SQL --> when executed correctly returns true else dies
        
        if(!empty($param)){
            $stmt = $this->_conn->prepare($statment); //parameter = ? for value; name of var needs to metch
            if($stmt === false){
                die("some thing went wrong"."<br>".$stmt ."<br>".$statment);
            }
            $stmt->bind_param($type, ...$param);
            $stmt->execute();
            
            
            #https://stackoverflow.com/questions/24363755/mysqli-bind-results-to-an-array
            #converts output to array
            
            #creating "header" of table
            $meta = $stmt->result_metadata();
            if (gettype($meta) == "boolean") {
                $stmt->close();
                return true;
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
            if(!isset($result)){
                $result = [];
            }
            return $result;

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
#constructor from perant
    public function addProvider(int $id, string $name, string $location, string $url)# id null for auto 
    {
        $this->executeSQL("INSERT INTO provider (id, name, location, url) VALUES (?, ?, ?, ?);", [$id,$name,$location,$url],"isss");
    }

    public function getMaxTagId()
    {
        $id = $this->executeSQL("SELECT MAX(id) FROM tags;")[0][0];
        #echo "<p>".$id."<p>";
        if ($id == null){
            $id = 0;
        }
        return (int) $id;
    }

    public function addTag(string $tag,int $id = null)
    {
        #echo "<p>".$tag."->id:".$id."<p>";
        $this->executeSQL("INSERT INTO tags (tag,id) VALUES (?,?);",[$tag,$id],"si");
    }

    public function getTagId(array $tags)
    {#####Testing!!!!!!!!!!
        if(count($tags) == 0){
            return (int) $this->executeSQL("USE lunchboxfooddb; SELECT id FROM tags WHERE tag = \"\";")[0]["id"];
        }else if(count($tags) == 1 && in_array($tags[0],array_values(array_values($this->executeSQL("USE lunchboxfooddb;SELECT * FROM tags;"))))){
            $r = $this->executeSQL("SELECT * FROM tags WHERE tag = ? ;",[$tags[0]],"s");
            echo var_dump($r);
        }else if(count($tags) >1){
            

            $ids = array();
            foreach ($tags as $aid => $tag) {
                $ids[$aid] = $this->executeSQL("SELECT * FROM tags WHERE tag = ?",[$tag],"s");
            }
            ### add -> if..... ids can be 0 --> new tag
            foreach ($ids[0] as $aid => $id) {
                foreach (array_slice($ids,1) as $abid => $idList) {
                    if(in_array($id["id"],array_values($idList))){
                        return (int) $id;
                    }
                }
            }

        }else{ # erlier ..... if multibil and not in bd dosent work
            #not in db
            $id = $this->getMaxTagId();
            foreach ($tags as $aid => $tag) {
                $ids[$aid] = $this->addTag($tag,$id);
            }
            return $id;
        }
    }

    public function addOffer(int $id = null,int $providerId,int $tagsId,string $name,string $description,string $day,string $price,int $averageRating = null)
    {
        if($averageRating == null){
            $this->executeSQL("INSERT INTO offer (id,providerId,tagsId,name,description,day,price) VALUES (?,?,?,?,?,?,?)", [$id,$providerId,$tagsId,$name,$description,$day,$price],"iiisssi"); 
        }else{
            $this->executeSQL("INSERT INTO offer (id,providerId,tagsId,name,description,day,price,averageRating) VALUES (?,?,?,?,?,?,?,?)", [$id,$providerId,$tagsId,$name,$description,$day,$price,$averageRating],"iiisssii");
        }
    }

    //for testing only --> remove

    public function dropDB()
    {
       $this->executeSQL("DROP DATABASE lunchboxfooddb;");
    }
    public function execute(string $statment, Array $param=[],string $type="")
    {
        $result = $this->executeSQL($statment,$param,$type);
        return $result;
    }
}


function fillFoodDB(Database $db){
    include "getApi.php";

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
        #echo "<p>".var_dump($offer)."<p>";
        if (count($offer["tags"]) == 0){
            $tagId = 0;# tag for all offers without tags --> saving space, having id = 0
        }else{
            $tagId = $db->getMaxTagId() + 1;
            foreach($offer["tags"] as $tag){
                $db->addTag($tag,$tagId);
            }
        }
        $db->addOffer($offer["id"],$offer["provider"],$tagId,$offer["name"],$offer["description"],$offer["day"],$offer["price"]);

    }
}
$db = new FoodBD("localhost","root","");
$db->connect();
#$db->dropDB();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB2.sql");
fillfoodDB($db);
#echo var_dump($db->getTagId([]));
$db->disconnect();
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