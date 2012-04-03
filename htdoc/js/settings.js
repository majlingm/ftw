if(typeof console == 'undefined'){
	console = {"log": function(){} };
}

var settings = {
	"api":"/ftw/api/api.php"
};

var dataSettings = {
	"getMenuContainer":{ "update":false,
					     "preFetch":false,
					     "url":settings.api + "?action=getMenuContainer"
			 		   },
	"getMenuItems":		{"update":false,
						 "preFetch":false,
						 "url":settings.api + "?action=getMenuItems"
				 		},
	"getContentItems":	{"update":false,
						 "preFetch":false,
						 "url":settings.api + "?action=getContentItems"
				 		}
};


var contentTypes = {
	"html":{	
			"cContentWrapper":false,
			"cHtml":false,
			"cEHtml":false,
			"cCloseButton":false,
			"cEditButton":false,
			"cSaveButton":false,
			"cCancelButton":false,
			"collectSaveData":false,
			"onload":false
			},
	"test":{	
			"cContentWrapper":false,
			"cHtml":false,
			"cEHtml":false,
			"cCloseButton":false,
			"cEditButton":false,
			"cSaveButton":false,
			"cCancelButton":false,
			"collectSaveData":false,
			"onload":false
			}
};
