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
                });
            }
        }
    };

    ajax.open("GET", "/items/" + sale + "/json", true);
    ajax.send();
}
