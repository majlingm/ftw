//Gets all the page data form the GetDatahandler and creates all the Tabs. Creats a menu in the menu container and linking them to the Tabs.
function Menu(menuContainer){

	var contentContainer = "";
	var tabs = false;
	var currentTab = false;
	var prefetch = false;

	//stuff for edit mode
	var editMode = false;
	var addButton = $("<li>").addClass("add").text("+");
	var newTabs = new Array();

	function init() {
		gdh.getData('getMenuItems', {'id':menuContainer.attr('id')}, function(data){
			//gdh.getData('getMenuContainer', {'id':menuContainer.attr('id')}, function(containerData){ //should the menucontainer really be fetched from database? 
				contentContainer = $("#" + menuContainer.attr('data-container')); 
				tabs = data.data || [];
				createMenu();
				createTabs();
				//visa currentPage med showPage()
				showPage(0);
			//});
		});

	}

	function createTabs(){
		//skapa alla pages
		$.each(tabs, function(i, item){
			if(typeof tabs[i].item == 'undefined'){
				if(prefetch)	
					tabs[i].item = new Tab(item.name, contentContainer);
				else
					tabs[i].item = false;
			}
		});	
	}

	function createMenu(){
		if(tabs && menuContainer){
			
			if(menuContainer.html())
				menuContainer.html("");
			
			var items = $(tabs).map(function(i, item){
			    return item.hidden != 'true'?$('<li/>').append($('<span>').text(item.name)).attr('data-pageId', i).get(0):null;
			});

			items.appendTo(menuContainer);
			

			menuContainer.delegate(".close", "click", function() {
  				var item = $(this).parent();

  				if(item.hasClass('new_menu_item')){
	  				var index = item.attr('index');
	  				newTabs[index] = false;
					item.slideUp(400, function(){
						item.remove();
					});

  				} else {
					var name = item.find('span').html();
					var del = confirm("Are you sure you wan't to delete " + name);
					
					if(del){
						$.get(settings.api, {action:"hideMenuItem", 'name':name}, function(data){
							console.log('item removed');
							item.slideUp(400, function(){
								item.remove();
							});
										
						});
					}
  				}

  
			});

			items.click(function(e){
 				$(this).siblings().removeClass("selected");
 				$(this).addClass("selected");
 				
				//prevent bubbling
				if($(e.target).hasClass('close'))
					return true;

				showPage($(this).attr('data-pageId'));
			});
		}
	}

	function showPage(tabId) {
		
		if(!tabs[tabId])
			return false;
		
		if((currentTab || currentTab == 0) && tabs[currentTab] && tabs[currentTab].item )
			tabs[currentTab].item.hide();
		//@TODO may need to add some checks here to control how ofter a user can change the pages, for example if one is already loading while trying to load a second one
		
		if(tabs[tabId].item){
			tabs[tabId].item.show();  
		} else{
			tabs[tabId].item = new Tab(tabs[tabId].name, contentContainer, editMode, function(){
				tabs[tabId].item.show();
			});
		}
		
		currentTab = tabId;
	}

	function setMenuContainer(id){
		menuContainer = $("#" + id);
		createMenu();
	}

	function enterEditMode(){
		
		if(editMode)
			return false;

		editMode = true;
		menuContainer.find('.new_menu_item').show(); //if we exit and enter edit mode we hide and show the items
		menuContainer.find('li').append($("<div class='close'>")).addClass('editable');
		addButton.appendTo(menuContainer);

		$.each(tabs, function(i, item){
			if(typeof tabs[i].item != 'undefined' && tabs[i].item && tabs[i].item.enterEditMode){
				tabs[i].item.enterEditMode();
			}
		});

		addButton.click(function(){
			var closeButton = $("<div class='close'>");
			var input = $("<input type='text'>");
			var newTab = $("<li>").addClass('new_menu_item').addClass('editable').append(closeButton).append(input);
			var index = newTabs.push(newTab) - 1;
			newTab.attr('data-index', index);
			
			//animate the tab
//			newTab.hide();
			addButton.before(newTab);
			newTab.animate({ opacity:1 },400);
//			newTab.slideDown(400);

			/*closeButton.click(function(){
				newTabs[index] = false;
				console.log(newTabs);
				newTab.slideUp(400, function(){
					newTab.remove();
				});
			});*/

		});
	}

	function exitEditMode(){
		editMode = false;
		addButton.remove();
		menuContainer.find('li').removeClass('editable');
		menuContainer.find('.close').remove();
		menuContainer.find('.new_menu_item').hide();

		$.each(tabs, function(i, item){
			if(typeof tabs[i].item != 'undefined' && tabs[i].item && tabs[i].item.enterEditMode){
				tabs[i].item.exitEditMode();
			}
		});
	}

	function save(){
		
		//save all the tabs
		$.each(tabs, function(i, item){
			if(typeof tabs[i].item != 'undefined' && tabs[i].item && tabs[i].item.save){
				console.log("saving");
				tabs[i].item.save();
			}
		});

		//save all the menu_items
		$.each(newTabs, function(key, item){
			
			if(!item)
				return true;

			item = $(item);
			var name = item.find("input").val();

			if(name){
				$.get(settings.api, {action:"addMenuItem", name:name, html_id:menuContainer.attr('id')}, function(data){
					item.removeClass("new_menu_item");
					item.find('span').html(name);
					var id = tabs.push({"name":name});
					item.attr('data-pageId', id - 1);
					item.click(function(){
						showPage(item.attr('data-pageId'));
					});


				}, "json");
			}
		});
	}


	init();

	return {
		"enterEditMode":enterEditMode,
		"exitEditMode":exitEditMode,
		"save":save
	};

}