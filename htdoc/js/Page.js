//Gets all the page data form the GetDatahandler and creates all the Tabs. Creats a menu in the menu container and linking them to the Tabs.
function Page(){

	var menuContainer = $("#menu");
	var contentContainer = $("#content");
	var currentPage = 0;
	var pages = false;

	function init() {
		gdh.getData("pages", function(data){
			pages = data;
			createMenu();
			createTabs();			
			//visa currentPage med showPage()
			showPage(currentPage);

		});
	}

	function createTabs(){
		//skapa alla pages
		$.each(pages, function(i, page){
				
			pages[i].tab = new Tab(page.name, contentContainer);

		});	
	}

	function createMenu(){
		if(pages && menuContainer){
			
			if(menuContainer.html())
				menuContainer.html("");
			
			var menuItems = $(pages).map(function(page, i){
			    return $('<li/>').text(page.name).attr('data-pageId', i).get(0);
			});

			menuItems.appendTo(menuContainer);
			
			menuItems.click(function(){
				showPage($(this).attr('data-pageId'));
			});

		}
	}

	function showPage(pageId) {
		pages[currentPage].hide();
		pages[pageId].show();      //@TODO may need to add some checks here to control how ofter a user can change the pages, for example if one is already loading while trying to load a second one
		currentPage = pageId;
	}

	function setMenuContainer(id){
		menuContainer = $("#" + id);
		createMenu();
	}

	function setContentContainer(){
		
	}

	init();


}