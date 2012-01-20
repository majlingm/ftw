<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" /> 
		<title>Test</title>	
		<script src="htdoc/js/lib/jquery-1.6.2.js"></script>
	</head>
	<body>
		
		<script>
		$(function(){
			$("button").click(function(){
				console.log($(this).attr('id'));
				$.get("api/api.php", {action:$(this).attr('id')},
				   function(data){
				     alert(data);
				   });
			});
		});
		</script>

		<button id="sayHi">SayHi</button>
		<button id="sayBye">SayBye</button>

	</body>
</html>