


//Holds all the data for the site, controls if data needs to be updated, if it should be prefetched etc.
//It should be the only object that polls the server for data.
function GetDataHandler(settings){ //@TODO add method to update the instansiated object with new settings, fixa så att objektet håller flera olika data för varje poll, beroende på indata

	var preFetchAllData = false;
	var me = {};


	function init(){
		$.each(settings, function(dataName, s){
			
			s.polling = {};
			s.data = {};
			
			if(s.preFetch || preFetchAllData){
				pollUrl(dataName, {}, function(){});
			}

			if(typeof s.update === 'number' && s.update > 0) {
				
				settings[dataName].interval = setInterval(function(){
					pollUrl(dataName, {}, function(data){
						
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
	function getData(dataName, sendData ,cb){
		
		if(typeof settings[dataName] !== 'undefined') {

			var key = serializeObject(sendData);

			if(settings[dataName].polling[key]) {
				//Already asking the server for that data, retry in 100ms
				setTimeout(function(){
					getData(dataName, sendData ,cb);
				}, 100);
				return false;	
			}

			if(typeof settings[dataName].data[key] === 'undefined'){
				settings[dataName].polling[key] = true;
				pollUrl(dataName, sendData || {}, cb);
				console.log("poll " + dataName);
			} else {
				cb(settings[dataName].data[key]);
				console.log("using stored " + dataName);
			}

		} else {
			console.error("no settings for that data");
			error("Missing settings", cb);
		}
		
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

	//This will only run once for everytime its attached and only on a true poll not a chached poll
	function onDataLoaded(dataName, cb){
		if(typeof settings[dataName].data == 'undefined' || $.isEmptyObject(settings[dataName].data)){
			//attach the callback
			settings[dataName].callback = cb;
		} else {
			//data is already loaded, run the callback
			settings[dataName].callback = false;
			cb();
		}
	}



	function error(message, cb){
		data = {};
		data.result = "error";
		data.error = message + "!";
		cb(data);
	}

	//main poll method, should be kept private
	function pollUrl(dataName, sendData, cb){
		$.get(settings[dataName].url, sendData || {}, function(data) {
		  var key = serializeObject(sendData);
		  settings[dataName].data[key] = data;
		  settings[dataName].polling[key] = false;
		  cb(data);

		 if((typeof settings[dataName].callback != 'undefined') && settings[dataName].callback){
		  	settings[dataName].callback();
		  	settings[dataName].callback = false;
		  	/*var cb = settings[dataName].callback;
		  	settings[dataName].callback = false;
		  	cb();*/
		  }
		
		}, 'json');
	}

	init();

	me = {
		"bindTo":bindTo, 
		"getData":getData,
		 "onDataLoaded":onDataLoaded
	};


	function extend(obj){
		$.extend(me, obj);
	}


	return me;
}

function serializeObject(obj){
	
	var outputString = "";
	
	$.each(obj, function(key, value){
		outputString += key + value;
	});

	return outputString;
}


//Here goes the functionality for sending data 
function PostDataHandler(){
	
}