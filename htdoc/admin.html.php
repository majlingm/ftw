<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" /> 
		<title>FTW admin</title>
		<link rel="stylesheet" type="text/css" href="htdoc/css/normalize.css" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/functions.less" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/standard.less" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/admin_default.less" />
		<link rel="stylesheet/less" type="text/css" href="htdoc/css/admin_manageSite.less" />
		<script src="htdoc/js/lib/less.js"></script>
		<script src="htdoc/js/lib/jquery.js"></script>
		<script src="htdoc/js/lib/jquery-ui.js"></script>
		<script src="htdoc/js/settings.js"></script>
		<script src="htdoc/js/adminScript.js"></script>
	</head>
	<body>
		<div id="topbar">
			<div>
				<ul id="admin_menu">
					<li><span><strong>Manage</strong></span></li>
					<li><a href="/ftw/?page=index">Page</a></li>
					<li><span class="currentPage">Images</span></li>
					<li><a href="/ftw/?page=admin">Users</a></li>
				</ul>
				<ul id="user_menu">
					<li>Logedin as <span id="user">Guest</span> </li>
					<li><span id="logout_button">(Logout)</span></li>
				</ul>
			</div>
		</div> 
		<div id="wrapper">
			<div id="adminMenu"><ul></ul></div>
			<div id="innerWrapper" class="clearfix">
				<div id="leftColumn">
					<div id="mediaInformation">
						<h2 id="mediaInformationHeader">
							Media Information
						</h2>
						<dl>
							<dt>
								Title
							</dt>
							<dd id="mediaInformationTitle">
								
							</dd>
							<dt>
								Description
							</dt>
							<dd id="mediaInformationDescription">
							</dd>
							<dt>
								Labels
							</dt>
							<dd id="mediaInformationLabels">
								
							</dd>
						</dl>
						<input type="hidden" name="hiddenId"/>
					</div>
					<div id="lableContainer"> 
<!-- 						<input type="text" name="searchContent" placeholder="View lable(s)" /> -->
						<h2 id="labelHeadline">
							Labels
						</h2>
						<div id="addLabel">
							<h3>Add label</h3>
							<input type="text" name="searchContent" placeholder="name" />
							<span class="information"></span>		
							<button class="buttonApprove">Add label</button>					
						</div>
						<ul id="labelList">
						</ul>
					</div>
					<div id="uploadContainer">
						<h2>
							Upload media
						</h2>
						<div id="uploadZone" class="dropZone"><p>Select a file</p></div>
						<h3>Uploaded files</h3>
    					<ul id="uploadedFiles" class="uploadedFiles"></ul>          
					</div>
				</div>
				<div id="content">
					<div id="contentHeader"><h2>Viewing all labels</h2></div>
					<ul id="contentList">

					</ul>
				</div>
			</div>
		</div>
		<div id="footer">Copyright FTW - 2012</div>
	</body>
</html>