<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');

/**
 * The dispatcher is responsible for mapping a request to a 
 * Controller, and it will invoke the function in the 
 * controller that corresponds to the action parameter.
 */
require_once CORE . 'classes/Database.class.php';

class User {

    //load the inifile with controller definitions
    public function __construct() {
        
        if(!isset($_SESSION)){
            session_start();
            
            if(!isset($_SESSION['access_level'])) {
                $_SESSION['access_level'] = 0;
            }   
        }
    }

    function login($username, $password){
        
        /*if($username == "micke" && $password == "hej"){
            $_SESSION['access_level'] = 9;
            return true;
        }*/

        $sql = "
            SELECT
                password,
                access_level
            FROM
                user
            WHERE
                name = '" . $username . "'";

        $result_array = Database::query($sql);
        $result = $result_array->next();
        
        if($password == $result['password']){
                $_SESSION['access_level'] = $result['access_level'];
                echo json_encode(array('result' => 'logged in', 'access_level' => $result['access_level']));
                return true;
            }

        result("unable to login");
        
        return false;
    }

    function getAccessLevel(){
        return  $_SESSION['access_level'];
    }

    function logout(){
        $this->user = "";
        $this->loggedIn = false;
        $this->accessLevel = 0;
        session_destroy();   
    }
}
?>