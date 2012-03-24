//Gets all the page data form the GetDatahandler and creates all the MenuItems.
function Menu(menuView, contentView){


	var contentContainer = "";
	var menuItems = {};
	window.currentPage = false;
	var addButton = $("<li>").css({"font-size":"24px"}).text("+").attr('data-sortorder', 9999999999);
	var addCount = 0;

	function init() {
		
		gdh.getData('getMenuItems', {'id':menuView.getId()}, function(data){
			createMenuItems(data.data || []);
		});

		enableAddButton();
	}

	function enableAddButton(){
		addButton.click(function(){
			menuItems["noname" + addCount] = new MenuItem({
					"itemData":false,
					"menuView":menuView,
					"contentView":contentView,
					removeMenuItem:function(name){
						return function(){ removeMenuItem(name) };
					}("noname" + addCount)
			});
			
			addCount++;
		});
	}

	function createMenuItems(data, cb){
		$.each(data, function(i, item){
				menuItems[item.name] = new MenuItem({
					"itemData":item,
					"menuView":menuView,
					"contentView":contentView,
					removeMenuItem:function(name){
						return function(){ removeMenuItem(name) };
					}(item.name)
				});
		});	
	}

	function showFirst(cb){
		//alert(menuView.getFirst());
		menuItems[menuView.getFirst()].showContent(cb);
	}

	function enterEditMode(){
		menuView.addAddButton(addButton);
		contentView.enableSorting();
		menuView.enableSorting();

		$.each(menuItems, function(name, item){
			item.enterEditMode();
		});
	}

	function exitEditMode(){
		addButton.detach();
		menuView.disableSorting();
		contentView.disableSorting();
		$.each(menuItems, function(name, item){
			item.exitEditMode();
		});
	}

	function removeMenuItem(name){
		console.log("removing " + name);
		delete menuItems[name];
	}

	function save(){
		$.each(menuItems, function(name, item){
			item.save();
		});
	}

	init();

	return {
		"showFirst":showFirst,
		"enterEditMode":enterEditMode,
		"exitEditMode":exitEditMode,
		"save":save
	};

}