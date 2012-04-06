if(typeof console == 'undefined'){
	console = {"log": function(){} };
}

var settings = {
	"api":"/ftw/api/api.php",
	"button":"/ftw/htdoc/img/buttons/"
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
