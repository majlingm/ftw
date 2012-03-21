//Gets all the page data form the GetDatahandler and creates all the MenuItems.
function Menu(menuView, contentView){


	var contentContainer = "";
	var menuItems = {};
	window.currentPage = false;
	var addButton = $("<li>").css({"font-size":"24px"}).text("+");
	var addCount = 0;

	function init() {
		
		gdh.getData('getMenuItems', {'id':menuView.getId()}, function(data){
			createMenuItems(data.data || []);
		});

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

	function createMenuItems(data){
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

	function enterEditMode(){
		menuView.addItem(addButton);
		contentView.enableSorting();
		menuView.enableSorting(function(event, ui){
			console.log(event);
			var el = $(ui.item);
			var name = el.attr('data-name')
			var prev = el.prev().attr('data-sortOrder') || false;
			var next = el.next().attr('data-sortOrder') || false;			
			var sortOrder = 0;
			
			console.log(next);
			console.log(prev);

			if(prev && next){
				sortOrder = (parseFloat(next) + parseFloat(prev))/2;
				console.log("hej");
			} else if(prev && !next){
				sortOrder = parseFloat(prev) + 0.0001;
			} else if(!prev && next){
				sortOrder = parseFloat(next) - 0.0001;
			} else {
				sortOrder = 1;
			}
						
			el.attr('data-sortOrder', sortOrder);
			saveSortOrder(name, sortOrder);


		});

		$.each(menuItems, function(name, item){
			item.enterEditMode();
		});
	}

	function saveSortOrder(name, sortOrder){
		console.log("saving sort order " + name + " " + sortOrder);
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
		"enterEditMode":enterEditMode,
		"exitEditMode":exitEditMode,
		"save":save
	};

}