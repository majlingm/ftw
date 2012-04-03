jQuery(function(){
    function createUploader(){      	    
        var uploader = new qq.FileUploader({
            element: document.getElementById('uploadZone'),
            listElement: document.getElementById('uploadedFiles'),
            allowedExtensions: ['jpg', 'png', 'gif'], 
            onSubmit: function(id, fileName){
            	console.log(id,fileName);
                // if (fileName == '5text.txt'){
                    // submitId = id;
                    // submitFileName = fileName; 
                // } else if (fileName == '6text.txt'){
                    // uploader.setParams({'new':'newvalue'});  
//                     
                    // same(uploader.getInProgress(), 0, 'getFilesInProgress');                    
//                     
                    // setTimeout(function(){
                        // same(uploader.getInProgress(), 1, 'getFilesInProgress');
                    // }, 1);                                                                                                                   
                // } else if (fileName == '8text.txt'){
//                     
                    // setTimeout(function(){
                        // same(uploader.getInProgress(), 0, 'all uploads should have finished');
                        // start(); // check test results    
                    // }, 1000);
//                     
                    // return false;
                // }
            },
            onComplete: function(id, fileName, responseJSON){
            	console.debug(id,fileName,responseJSON);
                // if (fileName == '4text.txt'){
                    // same(responseJSON, {}, 'should be empty if server returned malformed json');
                // } else if (fileName == '5text.txt'){
                    // same(submitId, id, "id in both callbacks match");
                    // same(submitFileName, fileName, "filename in both callbacks match");    
                    // ok(responseJSON.one === 'value1' && responseJSON.two === 'value2', "server received default params");
                    // same(responseJSON.fileName, fileName, "filename in onComplete correct");
                // } else if (fileName == '6text.txt'){                    
                    // ok(responseJSON['new'] === 'newvalue' && responseJSON.one == null, "server received new params");                    
                    // same(uploader.getInProgress(), 0, 'upload should have finished');                                                            
                // } else if (fileName == '8text.txt'){
                    // ok(false, "upload should be cancelled by returning false in onSubmit");                    
                // }                                                                                
            },
            action: settings.api,
            params : {action:"uploadFile", id: "id"}
        });        
    }      
    
	$.get(settings.api, {action:"addContent", 'name':"data.contentData.name", 'type':"data.contentData.type", 'body':"saveData", 'sort_order':"getSortOrder()"}, function(data2){
		console.log(data2);
	});
    
    createUploader();
    $(".fileUploadDropArea").click(function(){
    	$(this).remove();
    })
});