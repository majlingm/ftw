function Content(menuItem){
	
	var type = false;
	var sortOrder = false;
	var el = false;
	var html = false;
	var eHtml = false;
	var that = this;

	function init(){
		
		type = menuItem.contentData.type;
		sortOrder = menuItem.contentData.sort_order;

		/*if(!contentTypes.hasOwnProperty(type)){
			console.log("content type not supported");
			return false;
		}

		that.prototype = contentTypes[type];
		*/
		var data = {
			"contentData":menuItem.contentData
		};


		el = cContentWrapper(data);
		html = cHtml(data);
		eHtml = cEHtml(data);

		el.append(html);
	}

	function cContentWrapper() {
		return  $("<div class='content_item'>");
	};

	function cHtml(data){
		return data.contentData.body;
	}

	function cEHtml(){
		return $("<textarea>");
	}

	function enterEditMode(){
		html.detach();
		eHtml.appendTo(el);

	}

	function exitEditMode(){
		eHtml.detach();
		html.appendTo(el);
	}

	function getEl(){
		return el;
	}

	function getSortOrder(){
		return sortOrder;
	}

	function getType(){ 
		return type;
	}

	function remove(){
		el.detach();
	}


	init();

	return {
		"remove":remove,
		"getType":getType,
		"getEl":getEl,
		"getSortOrder":getSortOrder
	};

}