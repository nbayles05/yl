var provinces = [];
$('#province option').each(function () {
    provinces.push($(this).val());
});


var infos = [];
//var i = provinces[13];
provinces.forEach(i => {
    $.post("zipcode-municipality.php", { id: i }, function (data) {
        var rex = RegExp("<\s*li[^>]*>(.*?)<\s*/\s*li>", "g");

        var rexResult;
        do {
            rexResult = rex.exec(data);
            if (rexResult) {
                // var info = {
                //     postalCode: extractPostalCode(rexResult[0]),
                //     city: extractCity(rexResult[0]),
                //     province: extractProvince(rexResult[0])
                // }            ;
                var info = [extractPostalCode(rexResult[0]), extractCity(rexResult[0]), extractProvince(rexResult[0])];
                infos.push(info);
            }
        } while (rexResult);
    });
});

// infos.forEach(info => {
//     console.log('"' + info.postalCode + '","' + info.city + '","' + info.province + '"');
// });

function extractPostalCode(input) {
    return input.substring(input.indexOf("<strong>") + 8, input.indexOf("</strong>"));
}

function extractCity(input) {
    return input.substring(input.indexOf(" - ") + 3, input.indexOf(" ,"));
}

function extractProvince(input) {
    return input.substring(input.indexOf(" ,") + 2, input.indexOf("</li>"));
}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
