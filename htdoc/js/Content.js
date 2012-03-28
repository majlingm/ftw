function Content(menuItem){
	
	var type = false;
	var el = false;
	var html = false;
	var eHtml = false;
	var closeButton = false;
	var editButton = false;
	var saveButton = false;
	var cancelButton = false;
	var editMode = false;
	var data = false;
	var that = this;
	var viewId = false;
	var newItem = false;

	function init(){
		
		type = menuItem.contentData.type;
		if(!menuItem.contentData.id && menuItem.contentData.id != 0){
			newItem = true;
		}

		/*if(!contentTypes.hasOwnProperty(type)){
			console.log("content type not supported");
			return false;
		}

		that.prototype = contentTypes[type];
		*/
		data = {
			"contentData":menuItem.contentData
		};


		el = cContentWrapper(data);
		
		
		if(menuItem.contentData.sort_order)
			el.attr('data-sortorder', menuItem.contentData.sort_order);
		

		el.attr('data-id', data.contentData.id);

		html = cHtml(data);
		eHtml = cEHtml(data);
		editButton = cEditButton(data);
		closeButton = cCloseButton(data);
		saveButton = cSaveButton(data);
		cancelButton = cCancelButton(data);
		
		if(editMode){
			enterEditMode();;
		} else {
			el.append(html);
		}

	}

	
	function cContentWrapper(data) {
		return  $("<div class='content_item'>");
	};

	function cHtml(data){
		return data.contentData.body;
	}

	function cEHtml(data){
		return $("<textarea>" + data.contentData.body + "</textarea>");
	}

	function cCloseButton(data){
		return $("<div class='close'></div>");
	}

	function cCancelButton(data){
		return $("<div class='cancel'>Cancel</div>");
	}

	function cSaveButton(data){
		return $("<div class='save'>Save</div>");
	}

	function cEditButton(data){
		return $("<div class='edit'>Edit</div>");
	}

	function collectSaveData(data){
		if(data.contentData.body != eHtml.val()){
			return eHtml.val();
		} 

		return false;
	}

	function addEditButton(){
		el.append(editButton);
		
		editButton.click(function(){
			removeEditButton();
			enterEditMode();
		});
	}

	function removeEditButton(){
		editButton.detach();
		/*if(editMode)
			exitEditMode();*/
	}


	function enterEditMode(){
		el.addClass('new_content_item');
		el.html(eHtml);
		el.append(closeButton);
		el.append(cancelButton);
		el.append(saveButton);

		//reset all the events everytime, delegate seems buggy. And using detach instead of remove, removes the events too sometimes.
		closeButton.click(function(){
			close();
		});

		cancelButton.click(function(){
			eHtml = cEHtml(data);
			exitEditMode();
			addEditButton();
		});

		saveButton.click(function(){
			save(function(){
				exitEditMode();
				addEditButton();
			});
		});
	}

	function exitEditMode(){
		el.removeClass('new_content_item');
		el.html(html);
	}


	function getEl(){
		return el;
	}

	function getSortOrder(){
		return el.attr('data-sortorder');
	}

	function getType(){ 
		return type;
	}

	function close(){
		
		if(!newItem){
			var id = menuItem.contentData.id;
		
			$.get(settings.api, {action:"hideContent", 'id':id}, function(data){	
				menuItem.removeMe();
				el.slideUp(400, function(){
					el.remove();
				});						
			});
		} else {
			menuItem.removeMe();
			el.slideUp(400, function(){
				el.remove();
			});	
		}
		
	}
	
	function save(saveCb){

		var saveData = collectSaveData(data);
		
		if(!saveData)
			return false;
		
		//add or update new post
		$.get(settings.api, {action:"addContent", 'name':data.contentData.name, 'type':data.contentData.type, 'body':saveData, 'sort_order':getSortOrder()}, function(data2){
			data.contentData.body = saveData;
			//lägg till id här
			html = cHtml(data);
			eHtml = cEHtml(data);
			newItem = false;
			if(saveCb)
				saveCb();
		});
	}

	function setViewId(id){
		viewId = id;
	}

	function getViewId(){
		return viewId;
	}

	function getId(){
		return el.attr('data-id');
	}

	init();

	return {
		"getType":getType,
		"getEl":getEl,
		"getSortOrder":getSortOrder,
		"enterEditMode":enterEditMode,
		"exitEditMode":exitEditMode,
		"save":save,
		"addEditButton":addEditButton,
		"setViewId":setViewId,
		"getViewId":getViewId,
		"getId":getId

	};

}