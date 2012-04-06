function MenuView(target){
	

	var items = [];
	var sortDrop = false;

	function init(){
		
		target.sortable({ disabled: true, items: 'li.editable', placeholder:'menuitem_sorting_hightlight'  });
		
		target.bind("sortupdate", function(event, ui) {
			if(sortDrop)
				sortDrop(event, ui);
		});

	}

	function addItem(item, name){
		var id = items.push(item);
		sortItems();
		insertItem(item);
	}

	function addAddButton(addButton){
		target.append(addButton);
		
	}

	function sortItems(){
		items.sort(function(a, b){
			return (1 * a.attr('data-sortorder')) -  (1 * b.attr('data-sortorder'));
		});
	}


	/*function show(name){
		target.html("");
		$.each(items[name], function(i, data){
			target.append(data.el);
		});
	}*/

	function onDrop(cb){
		
	}

	function onDrag(){
		
	}

	function getFirst(){
		if(items.length > 0)
			return items[0].attr('data-name');
		else
			return false;	
	}	

	function removeItem(name){

		var id = false;

		$.each(items, function(i, item){
			if(item.attr('data-name') == name)
				id = i;
		});

		if(id || id == 0){
			items.splice(id - 1, 1);
			sortItems();
			console.log("item removed")
		} else {
			console.log("couldnt find item to remove");
		}

	}


	function insertItem(newItem){

		console.log("inside insert");
		var sortOrder = newItem.attr('data-sortorder') || false;
		
				
		if(items.length > 1 && (sortOrder) ){
			
			console.log("inside insert: first");
			var id = $.inArray(newItem, items);
			
			console.log(id);
			if(id > 0){
				console.log(items[id - 1]);
				items[id - 1].after(newItem);
			} else {
				target.prepend(newItem);
			}

		} else {
			if(!sortOrder){
				console.log("inside insert: second");
				var newSortOrder = 1;
				if(items.length > 1)
					newSortOrder = 1 * items[items.length - 2].attr('data-sortorder') + 1;
				
				newItem.attr('data-sortorder', newSortOrder);
				sortItems();
				insertItem(newItem);
			} else {
				console.log("inside insert: third");
				target.prepend(newItem);
			}

			
		}

		newItem.fadeIn();
	}

	function enableSorting(){
		target.sortable("enable");
		//target.children('li.editable').addClass('sortable');
		target.disableSelection();
		sortDrop = function(event, ui){
			var el = $(ui.item);
			var name = el.attr('data-name')
			var prev = el.prev().attr('data-sortorder') || false;
			var next = el.next().attr('data-sortorder') || false;			
			var sortOrder = 0;

			if(prev && next){
				sortOrder = (parseFloat(next) + parseFloat(prev))/2;
			} else if(prev && !next){
				sortOrder = parseFloat(prev) + 0.0001;
			} else if(!prev && next){
				sortOrder = parseFloat(next) - 0.0001;
			} else {
				sortOrder = 1;
			}
						
			el.attr('data-sortOrder', sortOrder);
			saveSortOrder(name, sortOrder);
		};
	}

	function disableSorting(){
		target.sortable("disable");
		//target.children('li.editable').removeClass('sortable');
		target.enableSelection();
		sortDrop = false;
	}

	function saveSortOrder(name, sortOrder){
		$.get(settings.api, {action:"updateSortOrder", name: name, sort_order:sortOrder}, function(data){
			console.log(data);
		}, "json");
	}

	function getId(){
		return target.attr('id');
	}

	init();

	return {
		"addItem":addItem,
		"getId":getId,
		"enableSorting":enableSorting,
		"disableSorting":disableSorting,
		"onDrop":onDrop,
		"addAddButton":addAddButton,
		"getFirst":getFirst,
		"removeItem":removeItem
	};

}