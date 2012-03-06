function MenuView(target){
	

	var items = {};

	function addItem(name){
		//items[name] = name;
		target.append(name);
	}

	/*function show(name){
		target.html("");
		$.each(items[name], function(i, data){
			target.append(data.el);
		});
	}*/

	function getId(){
		return target.attr('id');
	}

	return {
		"addItem":addItem,
		"getId":getId
	};

}