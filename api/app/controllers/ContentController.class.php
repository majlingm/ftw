<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');
require_once CORE . 'classes/Controller.class.php';

class ContentController {
	    

    //The constructor.
    function __construct() {
    }
    
 
    function getContentItems(&$parameters) {
        
        $sql = "
            SELECT
               Content.id,
               Content.sort_order,
               content_type.type,
               Content.body,
               Menu_items.name
            FROM
                Menu_items, Content, content_type
            WHERE
                Menu_items.name = '" . $parameters['name'] . "' 
                AND Menu_items.id = Content.Menu_items_id
                AND content_type.id = Content.content_type_id
                AND Content.hidden IS NULL
                OR Content.hidden != 'true'" ;
        
        
        $result_array = Database::query($sql);
        $menu_items = array();
        while($result = $result_array->next()){
            array_push($menu_items, $result);
        }
        
        if(count($menu_items) > 0){
            result("Content items found", array('data' => $menu_items));
            return true;
        }

        failed('No content items found');
        return false;
    }


    function addContent(&$parameters){

        
        //$parameters = escape_array($parameters);

        $sql = "INSERT INTO
                    Content (sort_order, body, Menu_items_id, content_type_id)
                VALUES 
                    (" . $parameters['sort_order'] . ", 
                    '" . $parameters['body'] . "' ,
                    (SELECT Menu_items.id FROM Menu_items WHERE Menu_items.name = '" . $parameters['name'] . "' AND Menu_items.hidden IS NULL OR Menu_items.hidden != 'true'),  (SELECT content_type.id FROM content_type WHERE content_type.type = '" . $parameters['type'] . "'))";

        echo $sql;
        $result = Database::query($sql);
     
        if($result) {
            result("Content added");
        } else {
            failed("unable to add content");
        }
    }

    function hideContent(&$parameters){

        $sql = "UPDATE
                    Content
                SET 
                    hidden='true'
                WHERE
                    id = " . $parameters['id'];
            
        $result = Database::query($sql);
        
        if($result) {
            result("Content hidden");
        } else {
            failed("unable to hide content");
        }
    }


     function showContent(&$parameters){

        $sql = "UPDATE
                    Content
                SET 
                    hidden='false'
                WHERE
                    id = " . $parameters['id'];
            
        $result = Database::query($sql);
        
        if($result) {
            result("Content visible");
        } else {
            failed("unable to show content");
        }
    }

    function setSortOrder(&$parameters){

        $sql = "UPDATE
                    Content
                SET 
                    sort_order = " . $parameters['sort_order'] . "
                WHERE
                    id = '" . $parameters['id'] . "'";
        
        echo $sql;

        $result = Database::query($sql);
        
        if($result) {
            result("sort_order updated");
        } else {
            failed("unable to update sort_order");
        }
    }

     function addType(&$parameters){

      
    }
}