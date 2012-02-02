
//this should be part of a separate settings file

var dataSettings = {
	"title": { "update":4000,
				"preFetch":false,
				"url":"title.json",
				"send_data":false
			 },
	"name":  { "update":false,
				"preFetch":false,
				"url":"name.json",
				"send_data":false
			 }
};


var gdh = new GetDataHandler(dataSettings);
gdh.getData("name", function(data){
	console.log(data);
});

function Test(){
	function update(data){
		$("#test").html(data.result);
	}

	return {
		"update":update	
	};
}

gdh.bindTo("title", new Test());

