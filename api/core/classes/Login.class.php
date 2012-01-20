<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');

/**
 * The dispatcher is responsible for mapping a request to a 
 * Controller, and it will invoke the function in the 
 * controller that corresponds to the action parameter.
 */

class User {
	
    var $user = "";
    var $loggedIn = false;
    var $accessLevel = 0;


    //load the inifile with controller definitions
    public function __construct() {
        
        if(!isset($_SESSION)){
            session_start();
        }
        

        if(isset($_SESSION['user'])) {
            $this->user = $_SESSION['user'];
            $this->loggedIn = true;
            
            if(isset($_SESSION['access_level'])){
                $this->accessLevel = $_SESSION['user_level'];
            }
        }



    }

    function login($username, $password){
        //do database stuff

        
    }

    function getAccessLevel(){
        return  $_SESSION['access_level']
    }

    function isUserLoggedIn(){
        return $this->loggedIn;
    }




    function logout(){
        $this->user = "";
        $this->loggedIn = false;
        $this->accessLevel = 0;
        session_destroy();   
    }
}
?>