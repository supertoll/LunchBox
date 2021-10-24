<?php
include "database.php";
$db = new Database("localhost","root","");
$db->connect();
$db->dropDB();
$db->disconnect();
?>