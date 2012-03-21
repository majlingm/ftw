function ContentView(target){
	

	var items = {};
	var addButton = new Array();
	var editMode = false;
	var sortDrop = false;

	function init(){
		
		target.sortable({ disabled: true, items: 'div.content_item' });
		
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
		return items[name].push(item) - 1;
	}


	function removeItem(name){
		delete items[name];
	}

	function addAddButton(ab){
		return addButton.push($(ab));
	}                                             //Addbutton måste göras om :/

	function showAddButton(id){
		editMode = true;
		addButton[id - 1].prependTo(target);
	}

	function hideAddButton(id){
		editMode = false;
		addButton[id - 1].detach();
	}

	function showItem(name, id){
		console.log("showing" + id);
		target.append(items[name][id].el);
	}

	function show(name, id){
		target.children("*").detach(); //using detach instead of remove to prevent unintended removal of events
		console.log("------");
		if(items.hasOwnProperty(name)){
			$.each(items[name], function(i, data){
				showItem(name, i);
			});
		}
		
		if(editMode)
			showAddButton(id);

	}

	function enableSorting(){
		target.sortable("enable");
		//target.sortable({ items: 'div.content_item' });
		target.disableSelection();
		
		sortDrop = function(event, ui){
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
			//saveSortOrder(name, sortOrder);
		};
	}

	function disableSorting(){
		target.sortable("disable");
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
		"disableSorting":disableSorting
	};

}