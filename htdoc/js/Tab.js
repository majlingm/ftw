
//Fetches the tabdata from the GetDataHandler and creates the tab consisting of different objects extending Content
function Tab(name, container, em, cb) {
	
	var editMode = em || false;
	var content = new Array();
	var hidden = true;
	var el = $("<div>").width("100%").height("100%").addClass("content_container").hide().appendTo(container);
	var addButton = $("<div>").addClass("add_content_item").html("+");
	var contentBeingEdited = new Array();

	console.log("tab");
	
	function init(){
		gdh.getData('getContentItems', {'name':name}, function(data){
			console.log(data);
			if(data.error != 'true'){
				content = data.data;
				console.log(content);
				addContent();
			} else {
				console.log("no content found");
			}
			
			if(editMode)
				enterEditMode();	
			
			if(cb)
				cb();
		});
	}

	function addContent(){
		$.each(content, function(i, c){
			content[i].content = new Content(c, el);
		});
	}

	/*function addEditContent(){
		$.each(content, function(i, c){
			contentBeingEdited[i].content = contentBeingEdited.push(new ContentEdit(el, addButton, name, c, function(data){
				//on exit callback
				data.content = new Content(data, el);
				content.push(data);
			}));
		});
	}*/

	function show(){
		if(hidden){
			el.show();		
			hidden = false;
		}
	}

	function hide(){
		if(!hidden){
			el.hide();
			hidden = true;
		}
	}

	function enterEditMode(){

		//el.html("");
		el.prepend(addButton);
		editMode = true;
		
		$.each(content, function(i, c){
			if(c.type != 'submenu'){
				c.content.remove();
			}
		});

		if(el.find('.new_content_item').size()){
			el.find('.new_content_item').show();
			return false;
		}



		$.each(content, function(i, c){
			if(c.type == 'submenu'){
				ph.enterEditMode();
				return true;
			}
				
		/*c.content.remove();
		if(el.find('.new_content_item').size())
				return true;*/
			
			contentBeingEdited.push(new ContentEdit(el, addButton, name, c, function(data){
				//on exit callback
				data.content = new Content(data, el);
				content.push(data);
			}));
		});

		addButton.click(function(){
			contentBeingEdited.push(new ContentEdit(el, addButton, name, false ,function(data){
				//on exit callback
				data.content = new Content(data, el);
				content.push(data);
			}));
		});
	}

	function exitEditMode(){
		console.log($(content).size());
		editMode = false;
		el.find('.new_content_item').hide();
		addButton.remove();
	
		$.each(content, function(i, c){
			if(c.type == 'submenu'){
				return true;
			}

			c.content.appendContent();
			/*data.content = new Content(data, el);
			content.push(data);*/
		});
	}


	/*function enterEditMode(){
		el.html("");
		el.prepend(addButton);
		editMode = true;
	
	}

	function exitEditMode(){
		editMode = false;
		addButton.remove();
	
	}*/


	function save(){
		$.each(contentBeingEdited, function(i, item){
			item.save();
		});

		contentBeingEdited = new Array();
	}


	init();

	return {
		"exitEditMode":exitEditMode,
		"enterEditMode":enterEditMode,
		"show":show,
		"hide":hide,
		"save":save
	};

}

