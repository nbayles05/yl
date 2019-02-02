var arr = [];
$('#province option').each(function() {
	arr.push($(this).val());
});

var i = arr[1];
	$.post("zipcode-municipality.php", {id:i}, function(data) {
	var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");
	var rexResult = rex.exec(data);
	
	var info = {
		postalCode: extractPostalCode(rexResult[0]),
		city: extractCity(rexResult[0]),
		province: extractProvince(rexResult[0])
	};
	
	console.log(info);
});

function extractPostalCode(input) {
	return input.substring(input.indexOf("<strong>")+8, input.indexOf("</strong>"));
}

function extractCity(input) {
	return input.substring(input.indexOf(" - ")+3, input.indexOf(" ,"));
}

function extractProvince(input) {
	input.substring(input.indexOf(" ,")+2, input.indexOf("</li>"));
}
