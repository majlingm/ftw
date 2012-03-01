<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');

require_once('config.php');
require_once('classes/Dispatcher.class.php');
require_once('classes/Controller.class.php');
require_once('classes/User.class.php');


// Set level of error reporting
if (DEBUG == 2) {
    error_reporting(E_ALL);
} elseif (DEBUG == 1) {
    error_reporting(E_ALL & ~E_NOTICE);
} else {
    error_reporting(E_ERROR | E_PARSE | E_USER_ERROR);
}

// Strip slashes from input
unescape($_GET);
unescape($_POST);
unescape($_SERVER);

function unescape(&$value) {
    if (get_magic_quotes_gpc()) {
        if (is_array($value)) {
            while (list($k, $v) = each($value)) {
                if (is_array($value[$k])) {
                    unescape($value[$k]);
                    @reset($value[$k]);
                } else {
                    $value[$k] = stripslashes($v);
                    //$value[$k] = utf8_encode(strip_tags(htmlentities(stripslashes(utf8_decode($v)))));
                }
            }
        } else {
            $value = stripslashes($value);
//            $value = utf8_encode(strip_tags(htmlentities(stripslashes(utf8_decode($value)))));
        }
    }
}

function result($message, $arr = array()){
    //add logging here
    $result = array_merge(array("result" => $message, "error" => "false"), $arr);
    echo json_encode($result);
    exit;
}

function failed($message){
    //add error logging here
    $result = array_merge(array("result" => $message, "error" => "true"));
    echo json_encode($result);
    exit;
}

function  escape_array_callback(&$item, $key) { 
    $item = mysql_real_escape_string($item);
}

function escape_array($s) {
    array_walk_recursive($s, 'escape_array_callback');
    return $s;
}

?>