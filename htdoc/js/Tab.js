
//Fetches the tabdata from the GetDataHandler and creates the tab consisting of different objects extending Content
function Tab(name, container) {
	
	var content = false;
	var hidden = true;
	var el = $("<div>").width("100%").height("100%").hide().appendTo(container);

	function init(){
		gdh.getData(name, function(data){
			content = data;
			addContent();			
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

	init();



}

