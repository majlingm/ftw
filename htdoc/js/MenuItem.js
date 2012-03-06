//Gets all the page data form the GetDatahandler and creates all the MenuItems.
function MenuItem(menu){
	
	var content = {};
	var name = false;
	var menuItem = $("<li>");
	function init(){
		
		name = menu.itemData.name;
		menuItem.html(name);
		
		menuItem.click(function(){
			showContent();
		});

		menu.menuView.addItem(menuItem);

		gdh.getData('getContentItems', {'name':menu.itemData.name}, function(data){
			if(data.error != 'true'){
				createContent(data.data);
			} else {
				console.log("no content found");
			}
		});
	}

	function createContent(c){
		$.each(c, function(i, c){
			content[i] = new Content($.extend(menu, {
				"contentData":c
			}));
		});
	}

	function showContent(){
		$.each(content, function(i, item){
			var list = new Array();
			list.push({"el":item.getEl(),
					   "sortOrder": item.getSortOrder()
					 });
			
			//sort list

			console.log(list);
			menu.contentView.addItem(name, list);
			menu.contentView.show(name);
		});
	}


	function enterEditMode(){
		$.each(content, function(i, item){
			item.enterEditMode();
		});
	}

	function exitEditMode(){
		$.each(content, function(i, item){
			item.exitEditMode();
		});
	}


	function save(){
		$.each(content, function(i, item){
			item.save();
		});
	}


	init();

	return {
		"exitEditMode":exitEditMode,
		"enterEditMode":enterEditMode,
		"save":save
	};


}