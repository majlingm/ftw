


function User(initCallback) {
	
	var accessLevel = 0;
	var loggedIn = false;
	var username = false;

	function init(){
		
		$.get(settings.api, {action:"isLoggedIn"}, function(data){
			if(data.error == "false"){
				loggedIn = true;
				accessLevel = data.data.access_level;
				username = data.data.username;
			}
			initCallback();
		}, "json");
	}

	function login(user, password, cb){
		$.get(settings.api, {action:"login", username:user, password:password}, function(data){
			if(typeof data.error == 'undefined'){
				loggedIn = true;
				accessLevel = data.user_level;
				username = data.username;
				cb(true);
			} else {
				cb(false);
			}
		}, "json");
	}

	function logout(cb){
		$.get(settings.api, {action:"logout"}, function(data){
			loggedIn = false;
			cb();
		}, "json");
	}

	function getAccessLevel(){
		return accessLevel;
	}

	function getUsername(){
		return username;
	}

	function isLoggedIn(){
		return loggedIn;
	}

	init();

	return {
		"login":login,
		"logout":logout,
		"getAccessLevel":getAccessLevel,
		"isLoggedIn":isLoggedIn,
		"getUsername":getUsername
	};

}


function Users() {
	
	function getUserInfo(name){
		
	}

	function createUser(){
		
	}

	function updateUser(){
		
	}

	function getUserList(){
		
	}
}