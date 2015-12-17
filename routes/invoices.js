var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;
var config = require('../config/config');

var request = require('request');
var moment = require('moment');

function parseDates(salesObject) {
    for (var i in salesObject) {
        var date = moment(salesObject[i].Data);

        if (date != null) {
            if (!date.isValid() || date.isBefore('1990-01-01'))
                salesObject[i].Data = "No Data";
            else
                salesObject[i].Data = date.format("DD/MM/YYYY");
        }

        if (salesObject[i].LinhasDoc != null) {
            for (var j in salesObject[i].LinhasDoc) {
                var dateDelivery = moment(salesObject[i].LinhasDoc[j].DataEntrega);

                if (!dateDelivery.isValid() || dateDelivery.isBefore('1990-01-01'))
                    salesObject[i].LinhasDoc[j].DataEntrega = "No Data";
                else
                    salesObject[i].LinhasDoc[j].DataEntrega = dateDelivery.format("DD/MM/YYYY");
            }
        }
    }
}

router.get('/:numDoc/json', checkToken(), function(req, res, next) {
    console.log("Called client json method.");

    request(config.primavera.url + 'Invoices/' + req.params.numDoc, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            res.send(JSON.stringify({"result": obj}));
        } else {
            res.send(JSON.stringify({"result": false}));
        }
    });
});

router.get('/json', checkToken(), function(req, res, next) {
    request(config.primavera.url + 'Sales', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            parseDates(obj);

            res.send(JSON.stringify({"data": obj}));
        } else {
            var testObj = [
                {"Entidade": "INFORSHOW", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]},
                {"Entidade": "FERNANDO", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]},
                {"Entidade": "INFORSHOW", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]}
            ];

            res.send(JSON.stringify({"data": testObj}));
        }
    });
});

router.get('/', checkToken(), function(req, res, next) {
    res.render('invoices', { title: 'Invoices', level: req.user.level });
});

module.exports = router;
