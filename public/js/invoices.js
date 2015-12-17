function getXMLHTTP() {
    var xmlhttp = false;

    try {
        xmlhttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e1) {
                xmlhttp = false;
            }
        }
    }

    return xmlhttp;
}

function pickAllFromSale(sale) {
    var ajax = getXMLHTTP();

    ajax.onreadystatechange = function() {
        console.log(ajax.readyState);

        if (ajax.readyState == 4 && ajax.status == 200) {
            //  alert(ajax.responseText);

            var json = JSON.parse(ajax.responseText);

            if (json["LinhasDoc"]) {
                json["LinhasDoc"].forEach(function(obj) {
                    addToShoppingCart(json["NumDoc"], obj["CodArtigo"]);

                    var plusId = json["NumDoc"] + '-' + obj["CodArtigo"];

                    try {
                        $("#" + plusId).hide();
                    } catch (e) {

                    }
                });
            }

            $("#pickAll-" + sale).hide();
        }
    };

    ajax.open("GET", "/items/" + sale + "/json", true);
    ajax.send();

    $("#pickAll-" + sale).attr('disabled', 'disabled');
}

function format(d) {
    var ret = '<table class="table no-footer subtable">' +
                '<thead>' +
                    '<tr>' +
                        '<th>Code</th>' +
                        '<th>Description</th>' +
                        '<th>Shipping Date</th>' +
                        '<th>Unit</th>' +
                        '<th>Quantity</th>' +
                        '<th>Price</th>' +
                        '<th>Discount</th>' +
                        '<th>Total</th>'
                    '</tr>' +
                '</thead>';

    var rem = d.LinhasDoc.length;

    console.log(d.LinhasDoc);

    d.LinhasDoc.forEach(function(linhaDoc) {
        var plusId = d.NumDoc + '-' + linhaDoc.CodArtigo;

        ret += '<tr><td>' + linhaDoc.CodArtigo +
        '</td><td>' + linhaDoc.DescArtigo +
        '</td><td>' + linhaDoc.DataEntrega +
        '</td><td>' + linhaDoc.Unidade +
        '</td><td>' + linhaDoc.Quantidade +
        '</td><td>' + linhaDoc.PrecoUnitario +
        '</td><td>' + linhaDoc.Desconto +
        '</td><td>' + (linhaDoc.PrecoUnitario * linhaDoc.Quantidade - linhaDoc.Desconto) +
        '</td></tr>';
    });

    ret += '</table>';

    return ret;
}

$(document).ready(function() {

    var expl = window.location.href.split("/");

    var ajax = null;

    if (expl[expl.length - 1] == "" || expl[expl.length - 1] == null || expl[expl.length - 1] == "invoices") {
        ajax = "/invoices/json";
    } else {
        ajax = "/invoices/" + expl[expl.length - 1] + "/json";
    }

    console.log(ajax);

    var table = $('#salesTable').DataTable( {
        "paging":   false,
        "ajax": ajax,
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "Entidade" },
            { "data": "Data" },
            { "data": "TotalMerc" },
            { "data": "Serie" }
        ],
        "order": [[1, 'asc']],
        oLanguage: {
            sSearch: '<span class="glyphicon glyphicon-search"></span>'
        }
    } );

    // Add event listener for opening and closing details
    $('#salesTable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    } );
    $('[data-toggle="tooltip"]').tooltip();
} );
