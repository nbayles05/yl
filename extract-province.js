var provinces = [];
$('#province option').each(function () {
    provinces.push($(this).val());
});


var i = provinces[13];
$.post("zipcode-municipality.php", { id: i }, function (data) {
    var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");

    var infos = [];
    var rexResult;
    do {
        rexResult = rex.exec(data);
        if (rexResult) {
            var info = {
                postalCode: extractPostalCode(rexResult[0]),
                city: extractCity(rexResult[0]),
                province: extractProvince(rexResult[0])
            };
            infos.push(info);
        }
    } while (rexResult);

    infos.forEach(info => {
        console.log('"' + info.postalCode + '","' + info.city + '","' + info.province + '"');
    });
});

function extractPostalCode(input) {
    return input.substring(input.indexOf("<strong>") + 8, input.indexOf("</strong>"));
}

function extractCity(input) {
    return input.substring(input.indexOf(" - ") + 3, input.indexOf(" ,"));
}

function extractProvince(input) {
    return input.substring(input.indexOf(" ,") + 2, input.indexOf("</li>"));
}
