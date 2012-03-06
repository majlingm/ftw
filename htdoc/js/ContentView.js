function ContentView(target){
	

	var items = {};

	function addItem(name, item){
		items[name] = item;
	}

	function show(name){
		target.html("");
		$.each(items[name], function(i, data){
			console.log(target);
			target.append(data.el);
		});
	}

	return {
		"addItem":addItem,
		"show":show
	};

}