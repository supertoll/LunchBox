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

    private function executeSQL(string $statment){// check for injection
        //querys SQL --> when executed correctly returns true else dies
        if($this->_conn->query($statment) === true){
            return true;
        }else{
            die("ups somthing went wrong: " . $this->_conn->error);
        }
    }

    public function executeSQLFromFile(string $pathToFile){ // check for injection
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
}
/*
$db = new Database("localhost","root","");
$db->connect();
$db->dropDB();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
$db->disconnect();
*/

/*
class DBHandler implements SessionHandlerInterface{ 

}
*/
?>