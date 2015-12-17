var express = require('express');
var checkToken = require('../api/auth/auth').checkToken;
var router = express.Router();
var config = require('../config/config');
var request = require('request');

router.get('/', checkToken(), function(req, res, next) {
    request(config.primavera.url + 'Customers', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            res.render('customers', { title: 'Customers', customers: obj, level: req.user.level });
        } else {
            var testObj = [
                {"Morada": "Av. dos Coqueiros", "CodCliente" : "INFORSHOW", "NomeCliente": "Inforshow, Informática Comunicação", "Moeda": "EUR", "NumContribuinte": "123456789"}
            ];

            res.render('customers', { title: 'Customers', level: req.user.level, customers: testObj });
        }
    });
});

module.exports = router;
