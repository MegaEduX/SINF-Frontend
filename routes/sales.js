var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;

var request = require('request');

router.get('/:client/json', checkToken(), function(req, res, next) {
    console.log("Called client json method.");
    
    request(process.env.PRIMAVERA_URI + 'Sales', function (error, response, body) {
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
    request(process.env.PRIMAVERA_URI + 'Sales', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

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
    request(process.env.PRIMAVERA_URI + 'Sales', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            res.render('sales', { title: 'Sales', sales: obj });
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

router.get('/:client', function(req, res, next) {
    console.log("Called client method!");

    request(process.env.PRIMAVERA_URI + 'Sales', function (error, response, body) {
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

            res.render('sales', { title: 'Sales', level: req.user.level, sales: filterObj });
        }
    });
});

module.exports = router;
