function Content(menuItem){
	
	var type = false;
	var sortOrder = false;
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

	function init(){
		
		type = menuItem.contentData.type;
		sortOrder = menuItem.contentData.sort_order;

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
		return sortOrder;
	}

	function getType(){ 
		return type;
	}

	function close(){
		el.remove();
		menuItem.removeMe();
	}
	
	function save(saveCb){
		console.log(menuItem);

		body: "alllllaaaa"
		id: "27"
		sort_order: "1"
		type: "html"
		var saveData = collectSaveData(data);
		
		if(!saveData)
			return false;
		
		//add new post
		$.get(settings.api, {action:"addContent", 'name':data.contentData.name, 'type':data.contentData.type, 'body':saveData}, function(data2){
			data.contentData.body = saveData;
			html = cHtml(data);
			eHtml = cEHtml(data);
			if(saveCb)
				saveCb();
		});
	}


	init();

	return {
		"getType":getType,
		"getEl":getEl,
		"getSortOrder":getSortOrder,
		"enterEditMode":enterEditMode,
		"exitEditMode":exitEditMode,
		"save":save,
		"addEditButton":addEditButton
	};

}