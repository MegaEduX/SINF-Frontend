var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res, next) {
    request(process.env.PRIMAVERA_URI + 'Warehouses', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            res.render('warehouses', { title: 'Warehouses', warehouses: obj });
        } else {
            var testObj = [
                {"Nome": "A1", "Morada": "Rua do Zaire, 765", "Localidade": "Porto", "CodPostal": ""},
                {"Nome": "A2", "Morada": "Rua Sousa Pinto, 1", "Localidade": "Porto", "CodPostal": ""},
                {"Nome": "Test", "Morada": "Primavera Unreachable...", "Localidade": "...", "CodPostal": ""}
            ];

            res.render('warehouses', { title: 'Warehouses', warehouses: testObj });
        }
    });
});

module.exports = router;
