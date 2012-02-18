<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');
require_once CORE . 'classes/Controller.class.php';

class UserController extends User {
	    

    //The constructor.
    function __construct() {
    }
    
 
    function createUser(&$parameters) {
        
        $password = crypt($parameters['password'], SALT);

        $sql = "
            INSERT INTO
                Users (username, email, password, user_level)
            VALUES 
                ('" . $parameters['username'] . "', '" . $parameters['email'] . "', '" . $password . "', 1)";
            
            $result = Database::query($sql);
            
            if($result) {
                result("user created");
            } else {
                failed("unable to create user");
            }
    }

    function updateUser() {

    }

    function getUserInfo(&$parameters) {
    $sql = "
            SELECT
                *
            FROM
                Users
            WHERE
                username = '" . $parameters['username'] . "'";

        $result_array = Database::query($sql);
        $result = $result_array->next();
        
        if($result){
            result("user found", array('data' => $result));
            return true;
        }

        failed('user not found');
        return false;
    }

    function getAccessLevel(&$parameters) {

    }

    function changeAccessLevel(&$parameters) {

    }

    function getUserList() {
        $sql = "
            SELECT
                *
            FROM
                Users
            ";
        
        $result_array = Database::query($sql);
        $users = array();
        while($result = $result_array->next()){
            array_push($users, $result);
        }
        
        if(count($users) > 0){
            result("users found", array('data' => $users));
            return true;
        }

        failed('No users not found');
        return false;
    }

    function isLoggedIn(){

        if($_SESSION['logged_in']){
            result("logged in with " . $_SESSION['user'], array('data' => array('username' => $_SESSION['user'], 'access_level' => $_SESSION['access_level']) ));
        } else {
            failed("not logged in");
        }
    }
   
}