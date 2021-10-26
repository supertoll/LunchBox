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
    #constructor from parent

    public function addProvider(int $id, string $name, string $location, string $url)# id null for auto 
    {
        $this->executeSQL("INSERT INTO provider (id, name, location, url) VALUES (?, ?, ?, ?);", [$id,$name,$location,$url],"isss");
    }

    public function getMaxTagId()
    {
        $id = $this->executeSQL("SELECT MAX(id) FROM tags;")[0][0];
        #echo "<p>".$id."<p>";
        if ($id == null){
            $id = -1;
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
            return (int) $this->executeSQL("SELECT id FROM tags WHERE tag = \"\";")[0][0];#is always there
        }else if(count($tags) == 1 ){
            $r = $this->executeSQL("SELECT id FROM tags WHERE tag = ? ;",[$tags[0]],"s");# finding all id with tag
            #making a list with all ids
            $tagIds = array();
            foreach($r as $qi => $q){
                $tagIds[$qi] =  $q["id"];
            }

            $idsq = $this->executeSQL("SELECT id,COUNT(id) FROM tags GROUP BY id;");#getting list of ids and how often tehy apear--> how many tags they support

            $ids = array();# creating a list of all ids with only one tag
            foreach($idsq as $idai => $ida){
                if($ida[1] == "1"){
                    $ids[$idai] = (int) $ida[0];
                }
            }

            #checking wich id includes the tag and has only one tag
            foreach($ids as $iq => $q){
                if(in_array($q,$tagIds) ){
                    return $q;
                }
            }

            #no maching id in db --> creating
            $id = $this->getMaxTagId() + 1;
            $this->addTag($tags[0],$id);
            return $id;

        }else{
            $ids = array();
            foreach($tags as $tagId => $tag){
                $r = $this->executeSQL("SELECT id FROM tags WHERE tag = ? ;",[$tag],"s");# finding all id with tag
                #making a list with all ids
                $tagIds = array();
                foreach($r as $qi => $q){
                    $tagIds[$qi] =  $q["id"];
                }
                #makeing a list for all tags with possible ids
                $ids[$tagId] = $tagIds;
            }
            foreach($ids[0] as $idid => $id){#crosschecking if one id is in all tag id lists
                foreach(array_slice($ids,1) as $aidid => $aid){
                    if(in_array($id,$aid)){
                        continue;
                    }else{
                        break;
                    }
                }
                return $id;
            }
            #no natching id for tags in db --> creating
            $id = $this->getMaxTagId() + 1;
            foreach($tags as $tagId => $tag){
                $this->addTag($tag,$id);
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
        $tags = array();
        foreach($offer["tags"] as $tagId => $tag){
            $tags[$tagId] = $tag;
        }
        #echo "<br><br>".var_dump($tags);
        $tagId = $db->getTagId($tags);#
        $db->addOffer($offer["id"],$offer["provider"],$tagId,$offer["name"],$offer["description"],$offer["day"],$offer["price"]);

    }
}
$db = new FoodBD("localhost","root","");
$db->connect();
#$db->dropDB();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB2.sql");
fillfoodDB($db);
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