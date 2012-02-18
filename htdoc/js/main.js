
var gdh = new GetDataHandler(dataSettings);
var user = {};

$(function(){

	user = new User(function(){
		enableKeyShotcut();
		enableLoginScreen();
		enableTopBar();
		
		if(user.isLoggedIn()){
			showTopBar();
		}
	});


});

/* login start */


	var login = false;
	var topBar = false;
	var lightbox = false;

	function enableKeyShotcut(){
		var key = [];
		var combination = [16, 76];

		$(document).keydown(function(e){
			var satisfied = true;
			key[e.which] = true;
			
			$.each(combination, function(i, value){
				satisfied = satisfied && key[value];
			})

			if(satisfied){
				showLoginScreen();
			}
				
		});

		$(document).keyup(function(e){
			key[e.which] = false;
		});
	}
	
	function enableLoginScreen(){
		lightbox = $("#lightbox");
		login = $("#login");
		
		login.find("#close").click(function(){
			hideLoginScreen();
		});

		lightbox.click(function(){
			hideLoginScreen();
		});
		
		login.find("#login_button").click(function(){
			var username = login.find('.username').val();
			var password = login.find('.password').val();
			user.login(username, password, function(success){
				if(success){

					hideLoginScreen(function(){
						showTopBar();
					});
				} else {

				}
			
			});
			
		});
	}

	function enableTopBar(){
		topBar = $("#topbar");

		topBar.find("#logout_button").click(function(){
			user.logout(function(){
				hideTopBar();
			});
		});
		
	}	

	function showTopBar(){
		if(topBar){
			topBar.show();
			topBar.find("#user").text(user.getUsername());
			topBar.animate({top:0}, 1000);
		}
	}

	function hideTopBar(){
		if(topBar){
			topBar.animate({top:-60}, 1000, function(){
				topBar.hide();
			});
		}
	}


	function showLoginScreen(){
		if(login && !user.isLoggedIn()){
			lightbox.fadeTo( "slow", 0.7);
			login.fadeIn("slow");
		}
	}

	function hideLoginScreen(cb){
		if(login){
			lightbox.fadeTo("fast", 0, function(){
				lightbox.hide();
			});
			login.fadeOut("fast", function(){
				login.hide();
				
				if(cb)
					cb();
			});
		}
		
	}

/* login end */



function PageHandler(){
	


}





