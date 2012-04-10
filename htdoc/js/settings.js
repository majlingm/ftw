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
	"html2":{	
			"cContentWrapper":false,
			"cHtml":function(data){
				return '<object width="1100" height="700"> <param name="movie"value="https://www.youtube.com/v/' + data.contentData.body + '?version=3&autohide=1&showinfo=0"></param> <param name="allowScriptAccess" value="always"></param> <embed src="https://www.youtube.com/v/' + data.contentData.body + '?version=3&autohide=1&showinfo=0"type="application/x-shockwave-flash"allowscriptaccess="always" width="1100" height="700"></embed> </object>'; },
			"cEHtml":false,
			"cCloseButton":false,
			"cEditButton":false,
			"cSaveButton":false,
			"cCancelButton":false,
			"collectSaveData":false,
			"onload":false
			}
};
