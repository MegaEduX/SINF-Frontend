var express = require('express');
var router = express.Router();

var request = require('request');

function getCustomerInformation(id, success, error) {
    request('http://this-request-will-fail/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            success(obj);
        } else {
            var testObj = {"Morada": "Av. dos Coqueiros", "Moeda": "EUR"};

            success(testObj);
        }
    });
}

router.get('/:id', function(req, res, next) {
    //  req.params.id

    request('http://this-request-will-fail/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            getCustomerInformation(req.params.id, function(ci) {
                res.render('items', { title: 'Sale items', order: obj, customer: ci });
            }, function(error) {

            });
        } else {
            var testObj = {"Entidade": "SILVA", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]};

            getCustomerInformation(req.params.id, function(ci) {
                res.render('items', { title: 'Sale items', order: testObj, customer: ci });
            }, function(error) {

            });
        }
    });
});

module.exports = router;
