<?php
//https://www.w3schools.com/php/php_mysql_connect.asp
class Database{
    private $servername;
    private $username;
    private $password;
    private $_conn;

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

    private function executeSQL(string $statment, Array $param = [],string $type = ""){
        //querys SQL --> when executed correctly returns true else dies
        
        if(!empty($param)){
            $stmt = $this->_conn->prepare($statment); //parameter = ? for value; name of var needs to metch
            if($stmt === false){
                die("some thing went wrong".$stmt .$statment);
            }
            $stmt->bind_param($type, ...$param);
            $stmt->execute();

            #https://stackoverflow.com/questions/24363755/mysqli-bind-results-to-an-array
            #converts output to array
            
            #creating "header" of table
            $meta = $stmt->result_metadata();
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


            $stmt->close();
            #checks if result is set, since when the query dont return anything result would'nt be set
            if(!isset($result)){
                $result = [];
            }
            return $result;

        }else{
            
            $stmt = $this->_conn->query($statment);
            if($stmt === false){
                die("some thing went wrong".$stmt .$statment);
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





    //for testing only --> remove


    public function dropDB()
    {
       $this->executeSQL("DROP DATABASE lunchboxfooddb;");
    }
    public function execute(string $statment, Array $param=[],string $type="")
    {
        $result = $this->executeSQL($statment,$param,$type);
        echo var_dump($result) . "<br>";
        return $result;
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