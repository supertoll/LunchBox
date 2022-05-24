<?php

include "./database.php";

function fillFoodDB(Database $db){
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
        
        if(!in_array("price",array_keys($offer))){
            #echo "<br> offer without price ". var_dump($offer);
            $offer["price"] = null;
        }
        #echo "<p>".var_dump($offer)."<p>";
        $db->addOffer($offer["id"],$offer["provider"],$offer["name"],$offer["description"],$offer["day"],null,$offer["price"]);

        if(count($offer["tags"]) == 0){
            $offer["tags"][0] = "";#default tag
        }
        #echo "<br>".var_dump($offer["tags"]);

        #adding offer to tag
        foreach($offer["tags"] as $tagId => $tag){
            $id = $db->getTagId($tag);
            #echo "<br>".var_dump($id);
            if(!isset($id)){#tag not in db
                $id = $db->getMaxTagId()+1;
                $db->addTag($tag,$id);#adding tag to table
            }
            #echo "<br>adding ",var_dump($offer["id"]),"-->", var_dump($id);
            $db->addOffer2Tags($offer["id"],$id);
        }
        #echo "<br><br>".var_dump($tags);
    }

    
}

$db = new FoodBD("localhost","lunchboxuser","");
#$db->connect();
#$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
#$db->disconnect();
$db->connect("lunchboxfooddb");
fillfoodDB($db);
$db->disconnect();
?>