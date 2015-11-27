var express = require('express');
var router = express.Router();

var request = require('request');

function getProductInformation(id, success, error) {
    request(process.env.PRIMAVERA_URI + 'Products/' + id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            success(obj);
        } else {
            var testObj = {"DescArtigo": "Secretária"};

            success(testObj);
        }
    });
}

router.get('/:id', function(req, res, next) {
    //  req.params.id

    request(process.env.PRIMAVERA_URI + '/Warehouses/' + req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            res.render('inventory', { title: 'Warehouse ' + req.params.id + ' Inventory', inventory: obj });

        } else {
            var testObj = [
                {"Artigo": "A0002", "Lote" : "LT01", "Stock": "46", "Localizacao": "A2.A.001"}
            ];

            var completeObj = [];

            for (var i = 0; i < testObj.length; i++) {
                getProductInformation(testObj["Artigo"], function(pInf) {
                    console.log(testObj["Artigo"]);
                    console.log(pInf);
                    testObj["DescArtigo"] = pInf;
                    console.log(testObj["DescArtigo"]);
                }, function(error) { });
                }
            res.render('inventory', { title: 'Warehouse ' + req.params.id + ' Inventory', inventory: testObj });
        }
    });
});

module.exports = router;

