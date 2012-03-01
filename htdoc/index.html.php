<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" /> 
		<title>FTW</title>	
		<script src="htdoc/js/lib/jquery.js"></script>
		<script src="htdoc/js/GetDataHandler.js"></script>
		<script src="htdoc/js/settings.js"></script>
		<script src="htdoc/js/Menu.js"></script>
		<script src="htdoc/js/Tab.js"></script>
		<script src="htdoc/js/Content.js"></script>
		<script src="htdoc/js/main.js"></script>
		<script src="htdoc/js/User.js"></script>

		<link rel="stylesheet" type="text/css" href="htdoc/css/style.css" />

	</head>
	<body>

	<div id="topbar">
		<div id="login_name">
			<span id="user">Guest</span> 
			<span id="logout_button">(Logout)</span>
		</div>
		<ul id="admin_menu">
			<li class="current home">Home</li>
			<li class="edit">Edit page</li>
			<li class="list">List users</li>
			<li class="create">Create user</li>
		</ul>
		<ul id="toolbox">
			
			<li id="save"><img src="http://taleist.com/wp-content/uploads/2011/04/ok-256x2561.png" alt="save changes"></img></li>
			<li id="trash"><img src="http://b.dryicons.com/images/icon_sets/symbolize_icons_set/png/128x128/trash.png" alt="trash"></img></li>
		</ul>
	</div>
	<!-- <div id="toolbar">
		<ul>
			<li id="save">Save</li>
			<li id="trash"></li>
		</ul>
	</div> -->
	<div id="lightbox"></div>
	<div id="login">
		<input type="text" class="username" />
		<input type="password" class="password" />
		<button id="login_button">Login</button>
	</div>

	<div id="wrapper">
		<div id="bg_holder"><img src="htdoc/img/naruto.jpg"></img></div>
		<div id="inner_wrapper">
			<ul id="main_menu" data-container="content" class="menu">
			</ul>

			<div id="content"></div>
		</div>
	</div>
	</body>
</html>