
var express = require('express');
var checkToken = require('../api/auth/auth').checkToken;
var router = express.Router();

var request = require('request');

function getCustomerInformation(id, success, error) {
    request(process.env.PRIMAVERA_URI + 'Customers/' + id, function (error, response, body) {
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

router.get('/:id/json', checkToken(), function(req, res, next) {
    //  req.params.id

    request(process.env.PRIMAVERA_URI + 'Sales/' + req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            getCustomerInformation(obj["Entidade"], function(ci) {
                res.send(JSON.stringify(obj));
            }, function(error) {

            });
        } else {
            console.log("Returning test data...");

            var testObj = {"Entidade": "SILVA", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]};

            getCustomerInformation(testObj["Entidade"], function(ci) {
                res.send(testObj);
            }, function(error) {

            });
        }
    });
});

router.get('/:id', checkToken(), function(req, res, next) {
    //  req.params.id

    request(process.env.PRIMAVERA_URI + 'Sales/' + req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            getCustomerInformation(obj["Entidade"], function(ci) {
                res.render('items', { title: 'Sale items', order: obj, customer: ci });
            }, function(error) {

            });
        } else {
            console.log("Returning test data...");

            var testObj = {"Entidade": "SILVA", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]};

            getCustomerInformation(testObj["Entidade"], function(ci) {
                res.render('items', { title: 'Sale items', order: testObj, customer: ci });
            }, function(error) {

            });
        }
    });
});

module.exports = router;
