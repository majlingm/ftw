function Content(content, target){
	
	var type = false;

	function init(){
		type = content.type;
		appendContent();
	}

	function appendContent(){
		if(type == 'html'){
			target.append($('<div>').html(content.body));
		} else if(type == 'slideshow') {
			//do slideshow stuff here
		} else {
			console.log("The content type '" + type + "' is not supported");
		}
	}

	function getType(){ 
		return type;
	}

	return {
		"getType":getType
	};

}


