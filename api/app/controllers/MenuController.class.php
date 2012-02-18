<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');
require_once CORE . 'classes/Controller.class.php';

class MenuController {
	    

    //The constructor.
    function __construct() {
    }
    
 
    function getMenuItems(&$parameters) {
        
        $sql = "
            SELECT
               Menu_items.name, 
               Menu_items.link, 
               Menu_items.order,
               Menu_items.access_level 
            FROM
                Menus, Menu_items
            WHERE
                Menus.html_id = '" . $parameters['id'] . "' 
                AND Menus.id = Menu_items.Menus_id" ;

        $result_array = Database::query($sql);
        $menu_items = array();
        while($result = $result_array->next()){
            array_push($menu_items, $result);
        }
        
        if(count($menu_items) > 0){
            result("menu items found", array('data' => $menu_items));
            return true;
        }

        failed('No menu items found');
        return false;
    }
        

    function getMenuContainer(&$parameters) {
        $sql = "
            SELECT
                container_id
            FROM
                Menus
            WHERE
                html_id = '" . $parameters['id'] . "'";

        $result_array = Database::query($sql);
        $result = $result_array->next();
        
        if($result){
            result("container found", array('data' => $result));
            return true;
        }

        failed('container not found');
        return false;
    }

   
}