//if(!console || !console.log){
//	console = {"log": function(){} };
//}

var settings = {
	"api":"http://localhost:8080/ftw/api/api.php"
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