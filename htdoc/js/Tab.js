
//Fetches the tabdata from the GetDataHandler and creates the tab consisting of different objects extending Content
function Tab(name, container, em, cb) {
	
	var editMode = em || false;
	var content = false;
	var hidden = true;
	var el = $("<div>").width("100%").height("100%").addClass("content_container").hide().appendTo(container);
	var addButton = $("<div>").addClass("add_content_item").html("+");
	
	console.log("tab");
	
	function init(){
		gdh.getData('getContentItems', {'name':name}, function(data){
			console.log(data);
			if(data.error != 'true'){
				content = data.data;
				console.log(content);
				addContent();
			} else {
				console.log("no content  found");
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

		el.prepend(addButton);
		editMode = true;
		/*$('.new_menu_item').show();
		
		addButton.click(function(){
			var closeButton = $("<div class='close'>");
			var input = $("<input type='text'>");
			var newTab = $("<li>").attr('class', 'new_menu_item').append(closeButton).append(input);
			var index = newTabs.push(newTab);
			newTab.hide();
			addButton.before(newTab);
			newTab.slideDown(400);

			closeButton.click(function(){
				newTabs[index] = false;
				newTab.slideUp(400, function(){
					newTab.remove();
				});
				
			});

		});*/
	}

	function exitEditMode(){
		editMode = false;
		addButton.remove();
	}


	init();

	return {
		"exitEditMode":exitEditMode,
		"enterEditMode":enterEditMode,
		"show":show,
		"hide":hide
	};

}

