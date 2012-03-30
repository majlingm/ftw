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
                $_SESSION['user'] = "";
                $_SESSION['logged_in'] = false;
            }   
        }
    }

    function login($username, $password){
        
        $sql = "
            SELECT
                password,
                user_level
            FROM
                Users
            WHERE
                username = '" . $username . "'";
        $result_array = Database::query($sql);
        $result = $result_array->next();
        
        if(isset($password) && isset($result['password']) && crypt($password, SALT) == $result['password']){
                $_SESSION['access_level'] = $result['user_level'];
                $_SESSION['user'] = $username;
                $_SESSION['logged_in'] = true;
                echo json_encode(array('result' => 'logged in', 'username' => $username, 'user_level' => $result['user_level']));
                return true;
            }

        failed("unable to login");
        
        return false;
    }

    function getAccessLevel(){
        return  $_SESSION['access_level'];
    }

    function isLoggedIn(){
        return $_SESSION['logged_in'];
    }

    function logout(){
        $_SESSION['access_level'] = 0;
        $_SESSION['user'] = "";
        $_SESSION['logged_in'] = false;
        //session_destroy();   
    }
}
?>