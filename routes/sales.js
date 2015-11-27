var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res, next) {
    request(process.env.PRIMAVERA_URI + 'Sales', function (error, response, body) {
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

router.get('/:client', function(req, res, next) {
    request(process.env.PRIMAVERA_URI + 'Sales', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            var filterObj = [];
            var j = 0;

            for (var i = 0; i < obj.length; i++) {
                if (obj[i]["Entidade"] == req.params.client) {
                    filterObj[j] = obj[i];
                    j++;
                }
            }

            console.log("Returning " + obj + "...");

            res.render('sales', { title: 'Sales', sales: filterObj });
        } else {
            var testObj = [
                {"Entidade": "SILVA", "Data": "2014-04-15T00:00:00", "TotalMerc": 526.8, "Serie": "A", "NumDoc": 12}
            ];

            var filterObj = [];
            var j = 0;

            for (var i = 0; i < testObj.length; i++) {
                if (testObj[i]["Entidade"] == req.params.client) {
                    filterObj[j] = testObj[i];
                    j++;
                }
            }

            res.render('sales', { title: 'Sales', sales: filterObj });
        }
    });
});

module.exports = router;
