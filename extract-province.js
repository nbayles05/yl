var arr = [];
$('#province option').each(function() {
	arr.push($(this).val());
});
console.log(arr);

//arr.forEach(i => {
var i = arr[1];
	$.post("zipcode-municipality.php", {id:i}, function(data) {
		console.log(data);
    var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");
    console.log(rex.exec(data))
	});
//});

//var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");
//console.log(rex.match(content))
