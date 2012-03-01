function Content(content, target){
	
	var type = false;
	var el = false;

	function init(){
		el = $("<div class='content_item'>");
		type = content.type;
		appendContent();
	}

	function appendContent(){
		
		console.log("appending");
		if(content.type == 'html'){
			target.append(el.html(content.body));
		} else if(content.type == 'template') {
			//do template stuff
		} else if(content.type == 'submenu') {
			target.append(el.html(content.body));
			ph.populateMenus(target, function(){
				console.log("wtf");
			});
			//do template stuff
		} else {
			console.log("The content type '" + type + "' is not supported");
		}
	}

	function getType(){ 
		return type;
	}

	function remove(){
		el.remove();
	}

	init();

	return {
		"remove":remove,
		"getType":getType,
		"appendContent":appendContent
	};

}















function ContentEdit(target, addButton, name, inData, saveCb){
	
	var containers = {};
	var type = false;
	var removed = false;
	var newContent = inData ? false : true;

	
	function init(){
		
		containers.target = target;
		containers.addButton = addButton;

		if(!inData){
			getTypeFromUser(function(type){
				if(type == "html"){
					createHtml();
				} else if(type == "submenu"){
					createHtml();
				}
			});
		} else {
			type = inData.type;
			if(type == "html"){
				createHtml();
			} else if(type == "submenu"){
				
			}
		}

		addClosEvent();
		

		
	}


	function createHtml(){
		//if(!inData)
		
		containers.closeButton= $("<div class='close'>");
		containers.content = $("<textarea>");
		containers.container = $("<div>").attr('class', 'new_content_item').append(containers.closeButton).append(containers.content);
		containers.container.hide();
		containers.addButton.after(containers.container);
		containers.container.slideDown(400)
		
		if(inData)
			containers.content.val(inData.body);
		
		/*containers.container.hide();
		addButton.before(newTab);
		newTab.slideDown(400);*/
	}

	function getTypeFromUser(cb){
		//get desired content type the user want to add
		//type = "html";
		type = prompt("type","html");

		cb(type);
	}

	function addClosEvent() {
		containers.closeButton.click(function() {
  				
  				if(newContent){
  					containers.container.slideUp(400, function(){
						containers.container.remove();
					});
  				} else {
					var del = confirm("Are you sure you wan't to delete this content");
					
					if(del){
						$.get(settings.api, {action:"hideContent", 'id':inData.id}, function(data){
							console.log('content removed');
							containers.container.slideUp(400, function(){
								containers.container.remove();
							});				
						});
					}
  				}
 
  
			});
	}

	function save(){

		/*if(removed)
		  return false;*/

		if(inData && containers.content.val() == inData.body){
			containers.container.remove();
			saveCb(inData);
			return false;
		}
		
		var contentData = { "sort_order":1, 
					 		"type":type, 
					 		"body":containers.content.val()};
		
		//add new post
		if(!inData){
			$.get(settings.api, {action:"addContent", 'name':name, 'type':contentData.type, 'body':contentData.body}, function(data){
				console.log("saving content...");
				containers.container.remove();
				saveCb(contentData);
			});
		} else {  //update post
			
		}

		
	}

	init();

	return {
		"save":save
	};

}


