<?php

include "./database.php";

function foo(Sting $var)
{
    return $var . "AND!"
}

$db = new FoodBD("localhost","root","");
$db->connect("lunchboxfooddb");
echo true ? "foo" : "bar";
echo "<br>";
echo false ? "foo" : "bar";


$db->disconnect();
?>