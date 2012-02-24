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
               Content.sort_order,
               content_type.type,
               Content.body
            FROM
                Menu_items, Content, content_type
            WHERE
                Menu_items.name = '" . $parameters['name'] . "' 
                AND Menu_items.id = Content.Menu_items_id
                AND content_type.id = Content.content_type_id" ;

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

        $sql = "INSERT INTO
                    Content (sort_order, body, Menu_items_id, content_type_id)
                VALUES 
                    (1, 
                    '" . $parameters['body'] . "' ,
                    (SELECT Menu_items.id FROM Menu_items WHERE Menu_items.name = '" . $parameters['name'] . "'), 
                    (SELECT content_type.id FROM content_type WHERE content_type.type = '" . $parameters['type'] . "'))";

        $result = Database::query($sql);
        
        if($result) {
            result("Content added");
        } else {
            failed("unable to add content");
        }
    }

     function addType(&$parameters){

      
    }
}