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
		console.log(menuItem.contentData.id);
		if(!menuItem.contentData.id && menuItem.contentData.id !== 0){
			newItem = true;
		}

		if(!contentTypes.hasOwnProperty(type)){
			console.log("content type not supported");
			return false;
		} else {
			$.each(contentTypes[type], function(name, m){
				if(m)
					that[name] = m;
			});
		}

		//
		
		data = {
			"contentData":menuItem.contentData,
			"containers":{
				"el":el,
				"html":html,
				"eHtml":eHtml,
				"closeButton":closeButton,
				"editButton":editButton,
				"saveButton":saveButton,
				"cancelButton":cancelButton
			}
		};


		el = that.cContentWrapper(data);
		
		
		if(menuItem.contentData.sort_order)
			el.attr('data-sortorder', menuItem.contentData.sort_order);
		

		el.attr('data-id', data.contentData.id);

		html = that.cHtml(data);
		eHtml = that.cEHtml(data);
		editButton = that.cEditButton(data);
		closeButton = that.cCloseButton(data);
		saveButton = that.cSaveButton(data);
		cancelButton = that.cCancelButton(data);
		
		if(editMode){
			that.enterEditMode();;
		} else {
			el.append(html);
		}

		if(that.onload)
			that.onload(data);

	}

	
	this.cContentWrapper = function(data) {
		return  $("<div class='content_item'>");
	};

	this.cHtml = function(data){
		return data.contentData.body;
	}

	this.cEHtml = function(data){
		return $("<textarea>" + data.contentData.body + "</textarea>");
	}

	this.cCloseButton = function(data){
		return $("<div class='close'></div>");
	}

	this.cCancelButton = function(data){
		return $("<div class='cancel'>Cancel</div>");
	}

	this.cSaveButton = function(data){
		return $("<div class='save'>Save</div>");
	}

	this.cEditButton = function(data){
		return $("<div class='edit'>Edit</div>");
	}

	this.collectSaveData = function(data){
		if(data.contentData.body != eHtml.val()){
			return eHtml.val();
		} 

		return false;
	}

	this.addEditButton = function(){
		el.append(editButton);
		
		editButton.click(function(){
			that.removeEditButton();
			that.enterEditMode();
		});
	}

	this.removeEditButton = function(){
		editButton.detach();
		/*if(editMode)
			exitEditMode();*/
	}


	this.enterEditMode = function(){
		el.addClass('new_content_item');
		el.html(eHtml);
		el.append(closeButton);
		el.append(cancelButton);
		el.append(saveButton);

		//reset all the events everytime, delegate seems buggy. And using detach instead of remove, removes the events too sometimes.
		closeButton.click(function(){
			that.close();
		});

		cancelButton.click(function(){
			eHtml = that.cEHtml(data);
			that.exitEditMode();
			that.addEditButton();
		});

		saveButton.click(function(){
			that.save(function(){
				that.exitEditMode();
				that.addEditButton();
			});
		});
	}

	this.exitEditMode = function(){
		el.removeClass('new_content_item');
		el.html(html);
	}


	this.getEl = function(){
		return el;
	}

	this.getSortOrder = function(){
		return el.attr('data-sortorder');
	}

	this.getType = function(){ 
		return type;
	}

	this.close = function(){
		
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
	
	this.save = function(saveCb){

		var saveData = that.collectSaveData(data);
		
		if(!saveData)
			return false;
		
		//add or update new post
		$.get(settings.api, {action:"addContent", 'name':data.contentData.name, 'type':data.contentData.type, 'body':saveData, 'sort_order':that.	getSortOrder()}, function(data2){
			data.contentData.body = saveData;
			//lägg till id här
			html = that.cHtml(data);
			eHtml = that.cEHtml(data);
			newItem = false;
			if(saveCb)
				saveCb();
		});
	}

	this.setViewId = function(id){
		viewId = id;
	}

	this.getViewId = function(){
		return viewId;
	}

	this.getId = function(){
		return el.attr('data-id');
	}

	init();

	/*return {
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

	};*/

}