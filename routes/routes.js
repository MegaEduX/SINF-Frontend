var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res, next) {
    request('http://this-request-will-fail/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log("Returning " + obj + "...");

            res.render('routes', { title: 'Routes', routes: obj });
        } else {
            var testObj = [
                {"ID": 1, "Name": "Route 12", "Costumers": "Jose Maria Fernandes & Filhos Lda", "Warehouse": "A1", "Workers": "Worker1", "Date": "20.11.2015."},
                {"ID": 2, "Name": "Route xyz", "Costumers": "Empreendimentos do Lima", "Warehouse": "A1", "Workers": "Worker1", "Date": "20.11.2015."},
                {"ID": 3, "Name": "Route 89AD89DS", "Costumers": "Jose Maria Fernandes & Filhos Lda, Empreendimentos do Lima, MircoAvi Inc.", "Warehouse": "A1", "Workers": "Worker2", "Date": "22.11.2015."},
                {"ID": 4, "Name": "WQW34", "Costumers": "MircoAvi Inc.", "Warehouse": "A1", "Workers": "Worker1", "Date": "27.11.2015."}
            	 
            ];

            res.render('routes', { title: 'Routes', routes: testObj });
        }
    });
});

module.exports = router;
