<?php
// Protect from direct access.
defined('API_GUARD') or die('Skyddad åtkomst');

/**
 * Interface, or abstract marker class, for application controllers.
 */
class Controller {
    
	/**
	 * Start a session and handle the session variables
	 * Session has been started by the dispatcher,
	 * before the call to this handle function.
	 * 
	 * @param	$session	array	- The $_SESSION array
	 */
    public function handleSession(&$session) {
        // This should be implemented by subclasses.
        // To handle session variables in an application specific way.
        // The implementation should return true if successful or false if not.
        return true;
    }
}
?>