//Gets all the page data form the GetDatahandler and creates all the MenuItems.
function Menu(menuView, contentView){


	var contentContainer = "";
	var menuItems = {};
	var currentPage = false;
	var addButton = $("<li>").css({"font-size":"24px"}).text("+");

	function init() {
		gdh.getData('getMenuItems', {'id':menuView.getId()}, function(data){
			createMenuItems(data.data || []);
			showPage(0);

		});

	}

	function createMenuItems(data){
		$.each(data, function(i, item){
				menuItems[item.name] = new MenuItem({
					"itemData":item,
					"menuView":menuView,
					"contentView":contentView,
					"showPage":showPage
				});
		});	
	}

	function showPage(name) {
		if(typeof menuItems[name] !== 'undefined' &&  menuItems[name]) {
			if(typeof menuItems[name] == 'string') {
				if(currentPage)
					menuItems[currentPage].hide();
				
				menuItems[name].show();
				currentPage = name;
			} else if(typeof menuItems[name] == 'number') {
				var id = name;
				var i = 0;
				
				$.each(menuItems, function(name, item){
					
					if(id == i){
						if(currentPage)
							menuItems[currentPage].hide();
				
							item.show();
							currentPage = name;
					}

					i++;
				});
			}
		}
	}

	function enterEditMode(){
		addButton.appendTo(menuContainer);
		$.each(menuItems, function(name, item){
			item.enterEditMode();
		});
	}

	function exitEditMode(){
		addButton.detach();
		$.each(menuItems, function(name, item){
			item.exitEditMode();
		});
	}

	function save(){
		$.each(menuItems, function(name, item){
			item.save();
		});
	}


	init();

	return {
		"enterEditMode":enterEditMode,
		"exitEditMode":exitEditMode,
		"save":save
	};

}