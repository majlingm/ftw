function Content(content, target){
	
	var type = false;

	function init(){
		type = content.type;
		appendContent();
	}

	function appendContent(){
		
		if(content.type == 'html'){
			console.log("appending2");
			console.log(content.body);
			target.append($('<div>').html(content.body));
		} else if(content.type == 'slideshow') {
			//do slideshow stuff here
		} else {
			console.log("The content type '" + type + "' is not supported");
		}
	}

	function getType(){ 
		return type;
	}

	init();

	return {
		"getType":getType
	};

}


