<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');

/**
 * The dispatcher is responsible for mapping a request to a 
 * Controller, and it will invoke the function in the 
 * controller that corresponds to the action parameter.
 */
class Dispatcher {
		
    var $api;
    var $action;
    var $login;
    var $user;


    //load the inifile with controller definitions
    public function __construct($inifile = null) {
        
        if (is_null($inifile)) {
            $inifile = APP . 'api.ini';
        }
    
        $this->api = parse_ini_file($inifile, true);
        $this->user = new User();
    }
    
    
    //Dispatch the requested URL to the configured action controller.
    function dispatch($url) {
    
    	if (!isset($_GET['action'])) {
            $this->failed();
    	}
        
        $this->action = $_GET['action'];
        
        // Search for an action controller to dispatch the request to.
        foreach ($this->api as $action => $config) {
			if ($action == $this->action) {
            	$this->invoke($action, $config);
                exit;
            }
        }
        
        // Finally, give up and fail.
        $this->failed();
    }
    
    // Validate posted parameters against names and types configured in the ini file.
    function _validateParameters(&$parameters, &$config) {
        if (isset($config['parameters'])) {
            $keys = explode(',', $config['parameters']);
            
            for ($i = 0, $expected = count($keys); $i < $expected; $i++) {
                list($type, $name) = explode(' ', trim($keys[$i]));
            	if (isset($parameters[trim($name)])) {
                    if (!$this->_validateValue(trim($type), $parameters[trim($name)])) {
                        $this->failed();
                    }
                }
            }
        }
    }
    
    /**
     * Verify that a value is of the correct type. If the type is 
     * mixed, true will be returned instantly.
     */
    function _validateValue($type, $value) {
        
        if ($type == 'mixed') {
            return true;
        }
                
        return (($type == 'int')	&& is_numeric($value)) 
        	|| (($type == 'string')	&& is_string($value));
    }
    

    //Dispatch the request to the responsible Controller.
    function invoke(&$action, &$config) {
        
        // --- Special cases built in to the core
        if($action == "login"){
            
            if($this->user->login($_GET['username'], $_GET['password'])) {
                //result("logged in");
            } else {
                //result("unable to log in");
            }
            exit;
        }

        if($action == "logout"){
            $this->user->logout();
            exit;
        }
        // --- special cases end

        if (!isset($config['controller'])) {
            trigger_error("No controller configured for the action " 
                . $action, E_USER_ERROR);
            exit;
        }

        if (!isset($config['accesslevel'])) {
            trigger_error("No access level set for the action " 
                . $action, E_USER_ERROR);
            exit;
        }
    
        if($this->user->getAccessLevel() < $config['accesslevel']){
            trigger_error("Your accesslevel is to low" 
                . $action, E_USER_ERROR);
            exit;
        }

        $this->_validateParameters($_GET, $config);
        require_once(CONTROLLERS . $config['controller'] . CLASS_FILE);
        $class = basename($config['controller']);
        $controller = new $class();

      	$controller->{$action}($_GET);  
    }

    function fileNotFound() {
        @header("HTTP/1.0 404 Not Found");
        include(FILE_NOT_FOUND);
        exit;
    }
}
?>