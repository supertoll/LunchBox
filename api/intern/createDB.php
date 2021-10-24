<?php
include "database.php";
$db = new Database("localhost","root","");
$db->connect();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
$db->disconnect();
?>