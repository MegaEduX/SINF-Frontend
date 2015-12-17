var express = require('express');
var checkToken = require('../api/auth/auth').checkToken;
var config = require('../config/config');
var router = express.Router();

var request = require('request');
var RouteModel = require('../api/route/routeModel');

router.get('/:id/json', checkToken(), function(req, res, next) {
    request(config.primavera.url + 'Sales/' + req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            RouteModel.find().exec(function(err, routes) {
                if (err == null) {
                    var picked = [];

                    for (var idx in routes) {
                        var route = routes[idx];

                        for (var objIdx in route.objects) {
                            var order = route.objects[objIdx].order;
                            var item = route.objects[objIdx].item;

                            picked.push({"order": order, "item": item});
                        }
                    }

                    var sale = obj;

                    for (var pickedIdx in picked) {
                        var pair = picked[pickedIdx];

                        if (pair.order == sale.NumDoc)
                            for (var saleItemsIdx in sale.LinhasDoc)
                                if (sale.LinhasDoc[saleItemsIdx].CodArtigo == pair.item)
                                    obj.LinhasDoc[saleItemsIdx].picked = true;
                    }

                    var index = obj.LinhasDoc.length;

                    for (var i = 0; i < index; i++) {
                        if (obj.LinhasDoc[i].picked == true) {
                            obj.LinhasDoc.splice(i, 1);

                            i--;
                            index--;
                        }
                    }

                    res.send(JSON.stringify(obj));
                } else {
                    //  Handle Error!
                }
            });
        } else {
            console.log("Returning test data...");

            var testObj = {"Entidade": "SILVA", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]};

            res.send(testObj);
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
                res.render('items', { title: 'Sale items', level: req.user.level, order: obj, customer: ci });
            }, function(error) {

            });
        } else {
            console.log("Returning test data...");

            var testObj = {"Entidade": "SILVA", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12, "LinhasDoc" : [{"CodArtigo": "A0006", "DescArtigo": "Secretária", "DataEntrega": "2014-04-15T00:00:00", "Quantidade": 30, "Unidade": "UN", "Desconto": 0, "PrecoUnitario": 250}]};

            getCustomerInformation(testObj["Entidade"], function(ci) {
                res.render('items', { title: 'Sale items', level: req.user.level, order: testObj, customer: ci });
            }, function(error) {

            });
        }
    });
});

module.exports = router;
