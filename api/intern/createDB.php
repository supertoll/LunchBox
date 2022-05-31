<?php

include "./database.php";

$db = new FoodBD("localhost","lunchboxuser","");
$db->connect();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
fillfoodDB($db);
$db->disconnect();
//https://dev.mysql.com/doc/refman/8.0/en/insert-on-duplicate.html
//https://stackoverflow.com/questions/1361340/how-can-i-do-insert-if-not-exists-in-mysql

?>