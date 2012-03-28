//Gets all the page data form the GetDatahandler and creates all the MenuItems.
function MenuItem(menu){
	
	var content = {};
	var name = false;
	var menuItem = $("<li>");
	var menuItemContent = false;
	var menuItemContentEdit = false;
	var menuItemContentChange = $("<div class='close'></div><input class='menu_item_input' />");
	var addButton = $("<div class='add_content_item'>+</div>");
	var contentAdded = false;
	var addButtonId = false;
	var newItem = false;
	var editMode = false;
	var showMeWhenReady = false;
	
	function init(){
		
		newItem = !menu.itemData ? true : false;
		editMode = editMode || newItem || false;

		addButtonId = menu.contentView.addAddButton(addButton);
		enableClosing();
		enableSaving();
		
		if(newItem){
			var tempName = "newItem" + (new Date()).getTime();
			menuItem.html(menuItemContentChange);
			menuItem.addClass("new_menu_item editable");
			menuItem.attr('data-name', tempName);
			menu.menuView.addItem(menuItem, tempName);
			return false;
		}

		setSortOrder(menu.itemData.sort_order)
		name = menu.itemData.name;
		
		menuItem.attr('data-name', name);
		menuItemContent = $("<span>" + name + "</span>");
		menuItemContentEdit = $("<span>" + name + "</span><div class='close'></div>");
		
		if(editMode){
			menuItem.html(menuItemContentEdit);
		} else {
			menuItem.html(menuItemContent);
		}
		
		menu.menuView.addItem(menuItem, name);

		enableAddButton();
		enableClick();


		gdh.getData('getContentItems', {'name':name}, function(data){
			if(data.error != 'true'){
				createContent(data.data);
			} else {
				createContent({});
				console.log("no content found");
			}
		});
	}


	function enableSaving(){
		menuItem.on('focus', '.menu_item_input', function(event){
			
			var el = $(event.currentTarget);
			
			el.keydown(function(e){
				console.log(e.which);
				if(e.which == 13){
					saveMe();
				}
			});

			el.blur(function(e){
				el.unbind("keydown");
				el.unbind("blur");
			});
		});
	}

	function enableAddButton(){
		addButton.click(function(){
			var i = 0;
			var id = false;
			$.each(content, function(){
				i++;
			});
			
			content[i] = new Content($.extend({
				removeMe:function(id){
				    return function(){ console.log(id); removeContent(id) };
				}(i),
				"contentData":{
					"body":"",
					"name":name,
					"type":"html",
					"sort_order":false,
					"id":false
				}
			}, menu));
			
			content[i].enterEditMode();

			id = menu.contentView.addItem(name, content[i]);
			content[i].setViewId(id);
			menu.contentView.showItem(name, id);
			
		});
	}

	function enableClick(){
		menuItem.click(function(){
			
			showContent();
		});
	}

	function enableClosing(){
		//delegate event
		menuItem.on("click", ".close", function(e){

			if(!$(e.currentTarget).hasClass('.close')){
				close();
			}

			return false;
		});
	}

	function createContent(c){
		
		menu.contentView.addMenuItem(name);
		
		$.each(c, function(i, c){
			content[i] = new Content($.extend({
				removeMe:function(id){
				    return function(){ console.log(id); removeContent(id) };
				}(i),
				"contentData":c
			}, menu));
		});

	    $.each(content, function(i, item){
			
			if(editMode)
				item.addEditButton();

			menu.contentView.addItem(name, item);
		});

		/*if($.isEmptyObject(content)){
			menu.contentView.addItem(name, item);
		}*/

		if(showMeWhenReady){
			console.log("showingg....")
			showContent(showMeWhenReady);
			//showMeWhenReady = false;
		}
			
	}

	function showContent(cb){
		
		
		window.currentPage = name;

		window.location.hash =  "!/" + name;

		//menu.contentView.show(name, addButtonId)

		if(!menu.contentView.show(name, addButtonId)){
			if(cb)
				showMeWhenReady = cb;
			else
				showMeWhenReady = function(){};
		} else {
			if(cb)
				cb();
		}
	}

	function removeContent(id){
		menu.contentView.removeItem(name, content[id].getSortOrder());
		delete content[id];
	}

	function enterEditMode(){
		
		editMode = true;

		if(newItem){
			menu.menuView.addItem(menuItem, name);
		} else {
			menuItem.html(menuItemContentEdit);
			menuItem.addClass('editable');
		}

		if(window.currentPage == name)
			menu.contentView.showAddButton(addButtonId);

		$.each(content, function(i, item){
			item.addEditButton();
		});
	}

	function exitEditMode(){
		
		editMode = false;

		if(newItem){
			menuItem.detach();
		} else {
			menuItem.html(menuItemContent);
			menuItem.removeClass('editable');
		}

		menu.contentView.hideAddButton(addButtonId);
		
		$.each(content, function(i, item){
			item.exitEditMode();
		});
	}

	function close(){
		if(!newItem){

			var del = confirm("Are you sure you wan't to delete " + name);
				
			if(del){
				$.get(settings.api, {action:"hideMenuItem", 'name':name}, function(data){
					console.log('item removed');
					menu.removeMenuItem(name);
					menuItem.slideUp(200, function(){
						menuItem.remove();
					});
						
				});
			}
		} else {
			menu.removeMenuItem(name);
			menuItem.remove();
		}
		
		
	}

	function reconstruct(itemData){
		//menuItem.show();
		menuItem.removeClass('new_menu_item');
		menu.itemData = itemData;
		init();
	}

	function getSortOrder(){
		return menuItem.attr('data-sortorder') || 0;
	}

	function setSortOrder(sortOrder){
		menuItem.attr('data-sortorder', sortOrder);
	}

	function saveMe(){
		
		if(newItem){
			
			$.get(settings.api, {action:"addMenuItem", name: menuItemContentChange.closest("input").val(), html_id:menu.menuView.getId(), sort_order:getSortOrder()}, function(data){
				reconstruct(
					{"name":menuItemContentChange.closest("input").val()}
				);
			}, "json");
		}
	}


	function save(){
		
		saveMe();

		$.each(content, function(i, item){
			item.save();
		});
	}

	function getName(){
		return name;
	}


	init();

	return {
		"showContent":showContent,
		"exitEditMode":exitEditMode,
		"enterEditMode":enterEditMode,
		"save":save,
		"getName":getName
	};


}