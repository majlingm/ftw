<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');

class FileUploadController {
	    
    //The constructor.
    function __construct() {
    }


    function test(&$parameters) {
        
        result("test", array('data' => $parameters['indata']));
    }
}