<?php
/**
 * The url dispatcher invokes the corresponding controller configured in app/api.ini
 */

// Set the access guard to prevent public acces.
define('API_GUARD', 1);


require_once('core/core.php');

$dispatcher = new Dispatcher();
$dispatcher->dispatch($_SERVER['REQUEST_URI']);
?>