
function ContentEdit(target, addButton, name, cb){
	
	var containers = {};

	var type = false;

	
	function init(){
		
		containers.target = target;
		containers.addButton = addButton;

		getTypeFromUser(function(type){
			if(type == "html"){
				createHtml()
			}
		});
	}


	function createHtml(){
		containers.closeButton= $("<div class='close'>");
		containers.content = $("<textarea>");
		containers.container = $("<div>").attr('class', 'new_content_item').append(closeButton).append(input);
		containers.containers.after(containers.addButton);

		/*newTab.hide();
		addButton.before(newTab);
		newTab.slideDown(400);*/
	}

	function getTypeFromUser(cb){
		//get desired content type the user want to add
		type = "html";

		cb(type);
	}



	init();

	return {
		"getType":getType
	};

}