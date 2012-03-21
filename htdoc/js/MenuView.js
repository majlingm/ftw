function MenuView(target){
	

	var items = {};
	var sortDrop = false;

	function init(){
		
		target.sortable({ disabled: true, items: 'li.editable'  });
		
		target.bind("sortupdate", function(event, ui) {
			if(sortDrop)
				sortDrop(event, ui);
		});

	}

	function addItem(name){
		items[name] = name;
		target.append(name);
	}

	function removeItem(name){

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

	function enableSorting(cb){
		target.sortable("enable");
		target.disableSelection();
		sortDrop = cb;
	}

	function disableSorting(){
		target.sortable("disable");
		target.enableSelection();
		sortDrop = false;
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
		"onDrop":onDrop
	};

}