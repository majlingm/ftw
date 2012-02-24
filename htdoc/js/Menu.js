//Gets all the page data form the GetDatahandler and creates all the Tabs. Creats a menu in the menu container and linking them to the Tabs.
function Menu(menuContainer){

	var contentContainer = "";
	var tabs = false;
	var currentTab = false;
	var prefetch = false;

	//stuff for edit mode
	var editMode = false;
	var addButton = $("<li>").css({"font-size":"24px"}).text("+");
	var newTabs = new Array();

	function init() {
		gdh.getData('getMenuItems', {'id':menuContainer.attr('id')}, function(data){
			gdh.getData('getMenuContainer', {'id':menuContainer.attr('id')}, function(containerData){
				contentContainer = $("#" + containerData.data.container_id);
				tabs = data.data || [];
				createMenu();
				createTabs();
					//visa currentPage med showPage()
				showPage(0);
			});
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
			    return item.hidden != 'true'?$('<li/>').text(item.name).attr('data-pageId', i).get(0):null;
			});

			items.appendTo(menuContainer);
			
			items.click(function(){
				showPage($(this).attr('data-pageId'));
			});

		}
	}

	function showPage(tabId) {
		
		if((currentTab || currentTab == 0) && tabs[currentTab] && tabs[currentTab].item)
			tabs[currentTab].item.hide();
		//@TODO may need to add some checks here to control how ofter a user can change the pages, for example if one is already loading while trying to load a second one
		console.log(tabId);
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
		editMode = true;
		$('.new_menu_item').show(); //if we exit and enter edit mode we hide and show the items
		addButton.appendTo(menuContainer);

		$.each(tabs, function(i, item){
			if(typeof tabs[i].item != 'undefined' && tabs[i].item && tabs[i].item.enterEditMode){
				tabs[i].item.enterEditMode();
			}
		});

		addButton.click(function(){
			var closeButton = $("<div class='close'>");
			var input = $("<input type='text'>");
			var newTab = $("<li>").attr('class', 'new_menu_item').append(closeButton).append(input);
			var index = newTabs.push(newTab);
			newTab.hide();
			addButton.before(newTab);
			newTab.slideDown(400);

			closeButton.click(function(){
				newTabs[index] = false;
				newTab.slideUp(400, function(){
					newTab.remove();
				});
				
			});

		});
	}

	function exitEditMode(){
		editMode = false;
		addButton.remove();
		$('.new_menu_item').hide();

		$.each(tabs, function(i, item){
			if(typeof tabs[i].item != 'undefined' && tabs[i].item && tabs[i].item.enterEditMode){
				tabs[i].item.exitEditMode();
			}
		});
	}

	function save(){
		var itemsToSave = $('.new_menu_item');
		$.each(itemsToSave, function(key, item){
			item = $(item);
			var name = item.find("input").val();
			console.log("name: " + name);
			if(name){
				$.get(settings.api, {action:"addMenuItem", name:name, html_id:menuContainer.attr('id')}, function(data){
					
					item.removeClass("new_menu_item");
					item.html(name);
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