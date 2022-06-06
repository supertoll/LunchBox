<?php
include "./database.php";
#connecting db
$db = new FoodBD("localhost","lunchboxuser","");
$db->connect("lunchboxfooddb");
#date from 2 weeks ago
$date2WeeksAgo = date("Y-m-d",strtotime("-14 day"));
#del old data and load new
$db->delOldOffer($date2WeeksAgo );
fillFoodDB($db,$date2WeeksAgo );

$db->disconnect();
?> 