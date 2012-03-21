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
               Menu_items.sort_order,
               Menu_items.access_level,
               Menu_items.hidden
            FROM
                Menus, Menu_items
            WHERE
                Menus.html_id = '" . $parameters['id'] . "' 
                AND Menus.id = Menu_items.Menus_id
                AND Menu_items.hidden IS NULL
                OR Menu_items.hidden != 'true'" ;

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


    function addMenuItem(&$parameters){

        $sql = "SELECT 
                    Menus.id 
                FROM 
                    Menus 
                WHERE 
                    Menus.html_id = '" . $parameters['html_id'] . "'";
        
        $menu_id_array = Database::query($sql);
        $menu_id_array = $menu_id_array->next();
        
        if($menu_id_array){       
            $menu_id = $menu_id_array['id'];
            
        } else {
            $sql = "INSERT INTO
                        Menus (html_id)
                    VALUES 
                        ('" . $parameters['html_id'] . "')";
            
            Database::query($sql);
            $menu_id = mysql_insert_id();
        }

       

        $sql = "INSERT INTO
                    Menu_items (name, Menus_id, sort_order)
                VALUES 
                    ('" . $parameters['name'] . "'," . $menu_id . "," . $parameters['sort_order'] . ")";
            
        $result = Database::query($sql);

        if($result) {
            result("Item added", array('id' => mysql_insert_id()));
        } else {
            failed("unable to add item");
        }
    }


    function hideMenuItem(&$parameters){

        $sql = "UPDATE
                    Menu_items
                SET 
                    hidden='true'
                WHERE
                    name = '" . $parameters['name'] . "'";
            
        $result = Database::query($sql);
        
        if($result) {
            result("Item hidden");
        } else {
            failed("unable to hide item");
        }
    }


     function showMenuItem(&$parameters){

        $sql = "UPDATE
                    Menu_items
                SET 
                    hidden='false'
                WHERE
                    name = '" . $parameters['name'] . "'";
            
        $result = Database::query($sql);
        
        if($result) {
            result("Item visible");
        } else {
            failed("unable to show item");
        }
    }

}