var express = require('express');
var checkToken = require('../api/auth/auth').checkToken;
var config = require('../config/config');
var router = express.Router();

var request = require('request');

function getProductInformation(id, success, error) {
    request(config.primavera.url + 'Products/' + id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            success(obj);
        } else {
            var testObj = {"DescArtigo": "Secretaria"};

            success(testObj);
        }
    });
}

router.get('/:id', checkToken(), function(req, res, next) {
    request(config.primavera.url + 'Warehouses/' + req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            request(config.primavera.url + 'Products/', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("Got all products.");

                    var allProducts = JSON.parse(body);

                    for (var i = 0; i < obj.length; i++) {
                        for (var j = 0; j < allProducts.length; j++) {
                            console.log("ap: " + allProducts[j]["CodArtigo"]);
                            console.log("o: " + obj[i]["Artigo"]);

                            if (allProducts[j]["CodArtigo"] == obj[i]["Artigo"]) {
                                console.log("Setting descArtigo...");

                                obj[i]["DescArtigo"] = allProducts[j]["DescArtigo"];

                                break;
                            }
                        }
                    }

                    res.render('inventory', { title: 'Warehouse ' + req.params.id + ' Inventory', level: req.user.level, inventory: obj });
                }
            });
        } else {
            var testObj = [
                {"Artigo": "A0002", "Lote" : "LT01", "Stock": "46", "Localizacao": "A2.A.001"}
            ];


            for (var i = 0; i < testObj.length; i++) {
                getProductInformation(testObj["Artigo"], function(pInf) {
                    testObj[i]["DescArtigo"] = pInf["DescArtigo"];
                }, function(error) { });
            }
            res.render('inventory', { title: 'Warehouse ' + req.params.id + ' Inventory', level: req.user.level, inventory: testObj });
        }
    });
});

module.exports = router;
