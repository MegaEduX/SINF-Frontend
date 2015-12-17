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

router.get('/:client/json', checkToken(), function(req, res, next) {
    console.log("Called client json method.");

    request(config.primavera.url + 'Sales', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            var filterObj = [];
            var j = 0;

            for (var i = 0; i < obj.length; i++) {
                if (obj[i]["Entidade"] == req.params.client) {
                    filterObj[j] = obj[i];
                    j++;

                    console.log("Adding to filterObj with entity " + obj[i]["Entidade"]);
                }
            }

            parseDates(filterObj);

            console.log("Returning " + filterObj + "...");

            res.send(JSON.stringify({"data": filterObj}));
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
    request(config.primavera.url + 'Sales', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            parseDates(obj);

            res.render('invoices', { title: 'Invoices', sales: obj });
        } else {
            var testObj = [
                {"Entidade": "INFORSHOW", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]},
                {"Entidade": "FERNANDO", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]},
                {"Entidade": "INFORSHOW", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]}
            ];

            res.render('sales', { title: 'Sales', level: req.user.level, sales: testObj });
        }
    });
});

router.get('/:client', checkToken(), function(req, res, next) {
    console.log("Called client method!");

    request(config.primavera.url + 'Sales', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            var filterObj = [];
            var j = 0;

            for (var i = 0; i < obj.length; i++) {
                if (obj[i]["Entidade"] == req.params.client) {
                    filterObj[j] = obj[i];
                    j++;

                    console.log("Adding to filterObj with entity " + obj[i]["Entidade"]);
                }
            }

            parseDates(filterObj);

            console.log("Returning " + filterObj + "...");

            res.render('sales', { title: 'Sales', level: req.user.level, sales: filterObj });
        } else {
            var testObj = [
                {"Entidade": "INFORSHOW", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]},
                {"Entidade": "FERNANDO", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]},
                {"Entidade": "INFORSHOW", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]}
            ];

            var filterObj = [];
            var j = 0;

            for (var i = 0; i < testObj.length; i++) {
                if (testObj[i]["Entidade"] == req.params.client) {
                    filterObj[j] = testObj[i];
                    j++;
                }
            }

            parseDates(filterObj);

            res.render('sales', { title: 'Sales', level: req.user.level, sales: filterObj });
        }
    });
});

module.exports = router;
