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
