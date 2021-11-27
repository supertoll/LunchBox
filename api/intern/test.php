<?php

include "./database.php";

$db = new FoodBD("localhost","root","");
$db->connect("lunchboxfooddb");
$db->foo(130);
$db->disconnect();
?>