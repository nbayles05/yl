var arr = [];
$('#province option').each(function() {
	arr.push($(this).val());
});

var i = arr[1];
	$.post("zipcode-municipality.php", {id:i}, function(data) {
    		var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");
    		var rexResult = rex.exec(data); 
		console.log(rexResult);
	});
