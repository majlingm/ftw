function ContentView(target){
	

	var items = {};
	var addButton = new Array();
	var editMode = false;
	var sortDrop = false;
	var currentPage = false;

	function init(){
		
		target.sortable({ disabled: true, items: 'div.content_item', placeholder: "content_sorting_hightlight", forcePlaceholderSize: true, cursor: 'move' });
		
		target.bind("sortstart", function(event, ui) {
 			console.log(ui);
 		});
		
		target.bind("sortupdate", function(event, ui) {
			if(sortDrop)
				sortDrop(event, ui);
		});
	}

	function addItem(name, item){
		if(!items.hasOwnProperty(name)){
			console.log("hej");
			items[name] = new Array();
		} 
		console.log(items);

		var id = items[name].push(item) - 1;
		
		if(item.getEl().attr('data-sortorder'))
			sortItems(items[name]);
		
		return id;
	}

	function addMenuItem(name){
		if(!items.hasOwnProperty(name)){
			items[name] = new Array();
		} 
	}

	function removeItem(name, sortOrder){
		
		var id = false;

		$.each(items[name], function(i, item){
			if(item.getSortOrder() == sortOrder)
				id = i;
		});

		if(id || id == 0){
			items[name].splice(id, 1);
			console.log("removed element");
			return true;
		} else {
			console.log("couldn't find element to remove");
			return false;
		}
	}

	function addAddButton(ab){
		return addButton.push($(ab));
	}                                             //Addbutton måste göras om :/

	function showAddButton(id){
		console.log("addbutton: " + id)
		editMode = true;
		addButton[id - 1].prependTo(target);
	}

	function hideAddButton(id){
		editMode = false;
		addButton[id - 1].detach();
	}

	function showItem(name, id){
		insertItem(items[name][id].getEl(), items[name]);
	}

	function insertItem(newItem, siblings){
		
		//console.log("showing" + id);
		//target.append(items[name][id].getEl());
		var sortOrder = newItem.attr('data-sortorder') || false;
		
		
				
		if(siblings.length > 1 && sortOrder){
			var id = $.inArray(newItem, siblings);
			
			if(id > 0){
				siblings[id - 1].after(newItem);
			} else {
				target.append(newItem);
			}

		} else {
			if(!sortOrder && siblings.length > 1){
				var newSortOrder = 1 * siblings[siblings.length - 2].getEl().attr('data-sortorder') + 1;
				newItem.attr('data-sortorder', newSortOrder);
				//sortItems(siblings);
				insertItem(newItem, siblings);
			} else if(!sortOrder && siblings.length <= 1) {
				newItem.attr('data-sortorder', 1);
				target.append(newItem);
			} else {
				target.append(newItem);
			}
		}

	}



	function show(name, id){
		 //using detach instead of remove to prevent unintended removal of events and data assigned to the dom element
		target.children("*").detach();
		console.log(items);
		if(items.hasOwnProperty(name)){
			console.log("------");

			sortItems(items[name]);
			$.each(items[name], function(i, data){
				if(typeof data != 'undefined')
					insertItem(data.getEl(), items[name]);
			});
			
			if(editMode)
				showAddButton(id);
			
			return true;
		} else {
			
			if(editMode)
				showAddButton(id);

			return false;
		}
		
		

	}

	function sortItems(i){
		i.sort(function(a, b){
			return (1 * a.getEl().attr('data-sortorder')) -  (1 * b.getEl().attr('data-sortorder'));
		});

		return i;
	}

	function enableSorting(){
		target.sortable("enable");
		target.children('div.content_item').addClass('sortable');
		//target.sortable({ items: 'div.content_item' });
		target.disableSelection();
		
		sortDrop = function(event, ui){
			var el = $(ui.item);
			var id = el.attr('data-id')
			var prev = el.prev().attr('data-sortOrder') || false;
			var next = el.next().attr('data-sortOrder') || false;			
			var sortOrder = 0;
			
			console.log(next);
			console.log(prev);

			if(prev && next){
				sortOrder = (parseFloat(next) + parseFloat(prev))/2;
			} else if(prev && !next){
				sortOrder = parseFloat(prev) + 1;
			} else if(!prev && next){
				sortOrder = parseFloat(next) / 2;
			} else {
				sortOrder = 1;
			}
						
			el.attr('data-sortOrder', sortOrder);
			saveSortOrder(id, sortOrder);

		};
	}

	function saveSortOrder(id, sortOrder){
		$.get(settings.api, {action:"setSortOrder", id: id, sort_order:sortOrder}, function(data){
			console.log(data);
		}, "json");
	}

	function disableSorting(){
		target.sortable("disable");
		target.children('div.content_item').removeClass('sortable');
		target.enableSelection();
		sortDrop = false;
	}

	init();

	return {
		"addItem":addItem,
		"show":show,
		"removeItem": removeItem,
		"showAddButton":showAddButton,
		"addAddButton":addAddButton,
		"hideAddButton":hideAddButton,
		"showItem":showItem,
		"enableSorting":enableSorting,
		"disableSorting":disableSorting,
		"addMenuItem":addMenuItem,
	};

}