$(function(){
	$('#topbar').mouseenter(function() {
		$('#topbar > div').stop();
		$('#topbar > div').animate({	
			top:0
		});
	});
	$('#topbar').mouseleave(function() {
		$('#topbar > div').stop();
		$('#topbar > div').animate({	
			top:-40
		},'slow');
	});
    
	var selectedLabels=[];
	var labelList=[];
	var mediaList=[];
    
    /*
     * Gets all the labels and puts them in an array
     */
    function getLabels() {
    	$("#labelList").empty();
		$.get(settings.api, {action:"getMediaLabelList"}, function(data){
			var result = data.data;
			$(result).each(function(i) {
				var labelItem=$("<li/>")
	
				// var buttonAdd = $("<img/>").attr({ src:settings.button+"32/plus_2.png", alt:"Add" });
				// var buttonRemove = $("<img/>").attr({ src:settings.button+"32/delete_2.png", alt:"Remove" });
				var labelId = $("<input/>").attr({ type:"hidden",name:"labelId" }).val(result[i].id);
	
				var labelTitle=$("<span/>")
					.html(result[i].title)
					.click(function() {
						toggleLabel(result[i].id,labelItem);
					});
					labelItem.draggable({ 
						revert: true, 
						helper: "clone" 
					});
				
				labelItem.append(labelTitle,labelId);//,buttonRemove,buttonAdd);
	
				labelList[result[i].id] = {
					title:result[i].title,
					element:labelItem
				};
				$("#labelList").append(labelItem);
			});
		},"json"); 	
    }
	getLabels();
	
	/*
	 * Toggles a lable
	 */
	function toggleLabel(label,labelItem) {
		//Checking if label is selected
		if ($.inArray(label, selectedLabels)!=-1) {
			labelItem.removeClass("selected");
			selectedLabels = $.grep(selectedLabels, function(value) {
		        return value != label;
		    });
			viewMedia(selectedLabels);	
		} else {
			labelItem.addClass("selected");
			selectedLabels.push(label);
			//Sort the array, viewMedia() only works if the label id's are is in order.
			selectedLabels.sort();
			viewMedia(selectedLabels);	
		}
		/*
		 * Sets the content header
		 */
		$("#contentHeader").empty();
		if (selectedLabels.length==0) {
			$("#contentHeader").append("<h2>Viewing all labels</h2>");
		} else {
			$("#contentHeader").append("<h2>Viewing media with labels:</h2>");
			$(selectedLabels).each(function(i) {
				$("#contentHeader").append("<h2>"+labelList[selectedLabels[i]].title+"</h2>");
			});
		}
	}

	function resetLabels() {
		selectedLabels=[];
		$("#labelList").children().removeClass("selected");
	}

	/*
	 * Appends the media items depending on what labels are selected
	 */
	function viewMedia(labels) {
		$("#contentList").empty();
		if (selectedLabels[0]) {
			$(mediaList).each(function(i) {
				if (mediaList[i]) {
					mediaList[i].labels.activated=[];
					$(mediaList[i].labels).each(function(i2) {
						if (labels.length==1) {
							if (labels[0]==mediaList[i].labels[i2].id) {
								$("#contentList").append(mediaList[i].element);
							}
						} else {
							$(labels).each(function(i3) {
								//First label
								if (i3==0) {
									if (labels[i3]==mediaList[i].labels[i2].id) {
										console.debug("got first label:",i);
	
										mediaList[i].labels.activated.push(true);
										
									}
								//Laast label
								} else if (i3==labels.length-1) {
									// console.debug("last label");
									// mediaList[i].labels.activated,i3-1);
									if (mediaList[i].labels.activated[i3-1]) {
										// console.debug(mediaList[i].labels[i2].id);
									}
									if (mediaList[i].labels.activated[i3-1] && labels[i3]==mediaList[i].labels[i2].id) {
										console.debug("got all labels:",i);
										$("#contentList").append(mediaList[i].element);
									}
								//Labels between last and first
								}  else {
									if (labels[i3]==mediaList[i].labels[i2].id) {
										console.debug("got middle label(s)");
										mediaList[i].labels.activated.push(true);
									}
								}
							 });
						}
					});
				}
			});
		} else {
			$(mediaList).each(function(i) {
				if (mediaList[i]) {
					$("#contentList").append(mediaList[i].element);
				}
			});

		}

	}
	
	$("#labelHeadline").click(function() {
		$("#addLabel")
			.animate({
				opacity:'toggle'
			});
	});
	/*
	 * Creats a label
	 */
	$("#addLabel button").click(function() {
		var labelTitle=$("#addLabel input").val();
		$.get(settings.api, {action:"addLabel",title:labelTitle }, function(data){
			labelTitle=$("#addLabel input").val("");
			getLabels();
		},"json");

	});
	
	function addLableToMedia() {

	}
	function removeLableToMedia() {

	}
	/*
	 * Dropable function for Media items
	 */
	$("#mediaInformation").droppable({
		drop: function( event, ui ) {

			$("#labelList").find(".ui-draggable-dragging").remove();

			var label= $("<li/>")
				.append(ui.draggable.html());
				
			var mediaId = $("#mediaInformation").find("input[name=hiddenId]").val();
			var mediaLabelId = label.find("input[name=labelId]").val();
				
			$.get(settings.api, {action:"addLabelToMedia","mediaLabelId":mediaLabelId,"mediaId":mediaId }, function(data){
				if (data['error']=="false") {
					$("#mediaInformationLabels ul").append(label);
					mediaList[mediaId].labels.push({ id:mediaLabelId });
				} else {
					console.debug(data);
				}
			},"json");
		}
	});

	/*
	 * Displays information about a selected media item
	 */
	function setMediaInformation(media) {
		var mediaLabelList=$("<ul/>");
		
		//Prints label for the media
		$(media.labels).each(function(i) {
			if (media.labels[i].id) {
				var labelItem= $("<li/>");
				var labelTitle = $("<span/>").text(labelList[media.labels[i].id].title);
				var buttonRemove = $("<img/>")
					.attr({ src:settings.button+"32/delete_2.png", alt:"Remove" })
					.click(function() {
						var labelId=media.labels[i].id;
						$.get(settings.api, {action:"removeLabelFromMedia","mediaLabelId":labelId,"mediaId":media.id }, function(data){
							if (data["error"]=="false") {
								labelItem.remove();		
								//Removes the label from the media label array							
								mediaList[media.id].labels = $.grep(mediaList[media.id].labels, function(value) {
							        return value.id != labelId;
							     });
							} else {
								console.log(data);
							}
						},"json");
					});
				labelItem.append(labelTitle,buttonRemove);
				mediaLabelList.append(labelItem);
			}
		});
		
		$("#mediaInformation").show();
		$("#mediaInformation").find("input[name=hiddenId]").val(media.id);
		$("#mediaInformationLabels").empty();
		$("#mediaInformationLabels").append(mediaLabelList);

		changeMediaInformation(media.title,"#mediaInformationTitle","title");
		changeMediaInformation(media.description,"#mediaInformationDescription","description");		
	}
	
	/*
	 * For editing Title or Description
	 */
	function changeMediaInformation(value,information,toChange) {
		$(information).empty();
		$(information).text(value);
		var showMediaInput=false;
		$(information).unbind('click');
		$(information).click(function() {
			if (!showMediaInput) {
				showMediaInput=true;
				var mediaInput=$(this);
				var value=$(this).text();
				var input=$("<input/>")
					.attr({ type:"text", name:toChange,value:value })
					.keypress(function(event) {
 						if ( event.which == 13 ) {
 							var mediaId = $("#mediaInformation").find("input[name=hiddenId]").val();
 							var value = input.val();
							$.get(settings.api, {action:"updateMedia"+capitaliseFirstLetter(toChange),"id":mediaId,value:value }, function(data){
								if (data["error"]=="false") {
		 							showMediaInput=false;
									mediaList[mediaId][toChange] = value;
		 							mediaInput.empty();
									mediaInput.text(value);
								} else {
									console.log(data);
								}
							},"json");
 						}
					})
				$(this).empty();
				$(this).append(input);
				input.focus();
			}
		});
	}

	
	function capitaliseFirstLetter(string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//Gets all the media items, print them and put them in a array
	$.get(settings.api, {action:"getMediaList"}, function(data){
		result = data.data;
		$(result).each(function(i) {
			if (!mediaList[result[i].id]) {
				mediaList[result[i].id] = {
					id:result[i].id,
					labels:[{ id:result[i].label_id }],
					title:result[i].title,
					description:result[i].description
				}
				
				var mediaItem = function() {
					var element=$("<li/>")
						.html("<img src=" + mediaList[result[i].id].filename +"></img>")
						.click(function() {
							setMediaInformation(mediaList[result[i].id]);
							$("#contentList").children().removeClass("selected");
							element.toggleClass("selected");							
						});
					return element;
				}

				mediaList[result[i].id].element = mediaItem;
				// mediaList[result[i].id].labels.push({ id:result[i].label_id });
				
				$("#contentList").append(mediaItem);
			} else {
				mediaList[result[i].id].labels.push({ id:result[i].label_id });
			}	
		});
	},"json");
});