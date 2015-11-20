var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res, next) {
    request('http://this-request-will-fail/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            res.render('sales', { title: 'Sales', sales: obj });
        } else {
            var testObj = [
                {"Entidade": "SILVA", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12}
            ];

            res.render('sales', { title: 'Sales', sales: testObj });
        }
    });
});

module.exports = router;
