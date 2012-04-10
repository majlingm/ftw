<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" /> 
		<title>FTW</title>	
		<link rel="stylesheet" type="text/css" href="htdoc/css/normalize.css" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/functions.less" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/standard.less" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/style.less" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/admin_default.less" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/admin_page.less" />
		<!--[if lt IE 9]>
		<link rel="stylesheet" type="text/css" href="htdoc/css/ie8_fix.less" />
		<![endif]-->
		<script src="htdoc/js/lib/less.js"></script>
		<script src="htdoc/js/lib/jquery.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
		
		<script src="htdoc/js/GetDataHandler.js"></script>
		<script src="htdoc/js/settings.js"></script>
		<script src="htdoc/js/MenuView.js"></script>
		<script src="htdoc/js/ContentView.js"></script>
		<script src="htdoc/js/Menu.js"></script>
		<script src="htdoc/js/MenuItem.js"></script>
		<script src="htdoc/js/Content.js"></script>
		<script src="htdoc/js/main.js"></script>
		<script src="htdoc/js/User.js"></script>
	</head>
	<body>

	<div id="topbar">
		<div>
			<ul id="admin_menu">
				<li><span><strong>Manage</strong></span></li>
				<li class="current home"><span>Page</span></li>
				<li><a href="/ftw/?page=admin">Images</a></li>
				<li><a href="/ftw/?page=admin">Users</a></li>
			</ul>
			<ul id="user_menu">
				<li>Logedin as <span id="user">Guest</span> </li>
				<li><span id="logout_button">(Logout)</span></li>
			</ul>
		</div>
	</div> 

	<div id="lightbox"></div>
	<div id="login">
		<form method="post">
			<input type="text" class="input" name="username" placeholder="Username" />
			<input type="password" class="input" name="password" placeholder="Password" />
			<input type="submit" id="login_button" class="buttonApprove" value="Login"/>
		</form>
	</div>

	<div id="wrapper">
		<div id="bg_holder"><img src="htdoc/img/naruto.jpg" alt="background"/></div>
		<div id="inner_wrapper" class="clearfix">
			<ul id="main_menu" data-container="content" class="menu">
			</ul>

			<div id="content"></div>
		</div>
	</div>
	<div id="footer">Copyright FTW - 2012</div>
	</body>
</html>