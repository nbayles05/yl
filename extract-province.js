var arr = [];
$('#province option').each(function() {
	arr.push($(this).val());
});
//console.log(arr);

//arr.forEach(i => {
var i = arr[1];
	$.post("zipcode-municipality.php", {id:i}, function(data) {
		//console.log(data);
    		var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");
    		var rexResult = rex.exec(data); 
		console.log(rexResult);
		//var str = rexResult[1];
		//var id = str.substring(str.indexOf("<strong>")+8, str.indexOf("</strong>"));
		//var city = str.substring(str.indexOf(" - ")+3, str.indexOf(" ,"));
		//var province = str.substring(str.indexOf(" ,")+2, str.indexOf("</li>"));
		//console.log(id,city,province);
	});
//});

//var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");
//console.log(rex.match(content))
