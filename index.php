<?php


//If the request comming from a crawler and there exists a static file for the api call; serve the static file

// Är detta nödvändigt eller ska vi definera fileNotFound() två gånger? Sparar den utifall vi behöver detta i start.php
define('API_GUARD', 1);
require_once('api/core/core.php');
// --- 

if (isset($_GET['_escaped_fragment_'])) {
	$staticFile = ROOT . '/htdoc/static_files/' . $_GET['_escaped_fragment_'] . '.html';

	if(file_exists($staticFile)){
		include($staticFile);
		exit;
	} else {
		Dispatcher::fileNotFound(); //Ska denna visas eller är det bättre att köra main.html ur SEO perspektiv? måste undersökas
	}
} else if(isset($_GET['page'])){
	$user = new User();
	$page = ROOT . '/htdoc/' . $_GET['page'] . '.html.php';
	if(file_exists($page) && $user->isLoggedIn() && $user->getAccessLevel() > 0){
		include($page);
		exit;
	} else {
		Dispatcher::fileNotFound();
	}
} else {
	include(ROOT . '/htdoc/index.html.php');
}


?>