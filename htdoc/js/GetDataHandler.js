

 
//Holds all the data for the site, controls if data needs to be updated, if it should be prefetched etc.
//It should be the only object that polls the server for data.
function GetDataHandler(settings){ //@TODO add method to update the instansiated object with new settings

	var preFetchAllData = false;
	var me = {};


	function init(){
		$.each(settings, function(dataName, s){
			
			if(s.preFetch || preFetchAllData){
				pollUrl(dataName, function(){});
			}

			if(typeof s.update === 'number' && s.update > 0) {
				
				settings[dataName].interval = setInterval(function(){
					pollUrl(dataName, function(data){
						
						settings[dataName].data = data;
						if(typeof settings[dataName].bound != 'undefined'){
							
							$.each(settings[dataName].bound, function(key, obj){
								if(obj.update)
									obj.update(data);
							});
						}

					})	
				}, s.update);
			}
		});
	}

	//get the data for the given name
	function getData(dataName, cb){
		
		var data;

		if(typeof settings[dataName] !== 'undefined') {

			if(typeof settings[dataName].data === 'undefined'){
				pollUrl(dataName, cb);
			} else {
				cb(settings[dataName].data);
			}


		} else {
			console.error("no settings for that data");
			error("Missing settings", cb);
		}
		
	}

	//future use pherhaps
	function sendData(){
		
	}

	//bind an object to given set if data, updating the object everytime the data is updated.
	function bindTo(dataName, f){
	
		if(typeof settings[dataName] !== 'undefined') { 
			if(typeof settings[dataName].bound === 'undefined'){
				settings[dataName].bound = [];
				settings[dataName].bound.push(f);
			} else {
				settings[dataName].bound.push(f);
			}
		}
	}

	function error(message, cb){
		data = {};
		data.result = "error";
		data.error = message + "!";
		cb(data);
	}

	//main poll method, should be kept private
	function pollUrl(dataName, cb){
		$.get(settings[dataName].url, function(data) {
		  settings[dataName].data = data;
		  cb(data);
		  console.log(data.result);
		});
	}

	init();

	me = {
		"bindTo":bindTo, 
		"getData":getData
	};


	function extend(obj){
		$.extend(me, obj);
	}


	return me;
}

//Here goes the functionality for sending data 
function PostDataHandler(){
	
}