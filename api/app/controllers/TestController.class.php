<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');
require_once CORE . 'classes/Controller.class.php';

class TestController extends Controller {
	    
	private $hi = "Hello World";
    private $bye = "Bye cruel World!";
	
    //The constructor.
    function __construct() {
    }
    
 
    function sayHi() {
    	echo($this->hi); 
    	return;
    }

    function sayBye() {
        echo($this->bye); 
        return;
    }
   
}