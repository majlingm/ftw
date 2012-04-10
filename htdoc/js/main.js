

var ph = new PageHandler();
var gdh = new GetDataHandler(dataSettings);
var user = {};

$(function(){
	user = new User(function(){
		enableKeyShotcut();
		enableLoginScreen();
		enableTopBar();
		
		if(user.isLoggedIn()){
			showTopBar();
			gdh.onDataLoaded('getContentItems', function(){
				ph.showFirst(function(){
					console.log("callback");
					setTimeout(function(){ ph.enterEditMode() }, 1);
				});
			});

			ph.populateMenus($('body'));
		} else {
			gdh.onDataLoaded('getContentItems', function(){
				ph.showFirst(function(){
				});	
			});

			ph.populateMenus($('body'));
		}
	});

/*just for fun*/
var img = $("#bg_holder img");
var imgHeight = img.height();
var docHeight = $(document).height() - 350;
var ratio = 1;
var scrolled = 0;
console.log("img: " + imgHeight);
console.log("doc: " + docHeight);
$(document).scroll(function(){
	imgHeight = $("#bg_holder img").height();
	docHeight = $(document).height() - 350;
	ratio = imgHeight/docHeight;
	scrolled = $(document).scrollTop();

	img.css('margin-top', - (ratio * scrolled)/60);
	console.log(ratio * scrolled);
	//$(document).scrollTop();
});


/*fun ends*/

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
		login.find("form").click(function() {
			return false;
		});
		
		login.find("#close").click(function(){
			hideLoginScreen();
		});

		lightbox.click(function(){
			hideLoginScreen();
		});
		
		login.find("#login_button").click(function(){
			var username = login.find('[name="username"]').val();
			var password = login.find('[name="password"]').val();
			user.login(username, password, function(success){
				if(success){
					hideLoginScreen(function(){
						showTopBar();
						ph.enterEditMode();
					});
				} else {
					
				}
			
			});
			
		});
	}

	function enableTopBar(){
		topBar = $("#topbar");
		var menuItems = topBar.find("#admin_menu li");
		var toolboxButtons = topBar.find("#toolbox li");

		topBar.find("#logout_button").click(function(){
			user.logout(function(){
				hideTopBar();
				ph.exitEditMode();
			});
		});

/*		toolboxButtons.click(function(){
			
			var clicked = $(this);
			if(clicked.attr('id') == 'save'){
				ph.save();
			}

		});

		menuItems.click(function(){
			
			var clicked = $(this);
			menuItems.removeClass('current');
			clicked.addClass('current');

			if(clicked.hasClass('edit')){
				ph.enterEditMode();
			} else if(clicked.hasClass('home')){
				ph.exitEditMode();
			}
						
		}); */
	
	}	

	function showTopBar(){
		if(topBar){
			topBar.show();
			topBar.find("#user").text(user.getUsername());
			topBar.find('> div').animate({top:0}, 1000);
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
	
	var menus = [];
	var menuContainer = "";
	var editMode = false;
	var contentViews = {};
	var menuViews = {};

	function init(){
		
	}

	function populateMenus(parent, cb) {
		m = parent.find(".menu");
		$.each(m, function(i, menu){
			
			var m = $(menu);
			var content = m.attr('data-container');
			
			if(!contentViews.hasOwnProperty(content)){
				contentViews[content] = new ContentView($("#"+content));
			}

			if(!menuViews.hasOwnProperty(m.attr('id'))){
				menuViews[m.attr('id')] = new MenuView(m);
			} 


			menus.push(new Menu(menuViews[m.attr('id')], contentViews[content]));
		});	

		/*if(editMode)
			enterEditMode();*/
	}


	function save(){
		$.each(menus, function(i, menu){
			menu.save();
		});
	}

	function enterEditMode(){
		$.each(menus, function(i, menu){
			menu.enterEditMode();
		});
	}

	function exitEditMode(){
		$.each(menus, function(i, menu){
			menu.exitEditMode();
		});
	}

	function showFirst(cb){
		$.each(menus, function(i, menu){
			menu.showFirst(cb);
		});
	}

	return {
		"populateMenus":populateMenus,
		"showFirst":showFirst,
		"enterEditMode":enterEditMode,
		"exitEditMode":exitEditMode,
		"save":save
	};

}





