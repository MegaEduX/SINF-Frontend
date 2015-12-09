var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;
var User = require('../api/user/userModel');

var _ = require('underscore');

var request = require('request');

router.get('/:id', checkToken(), function(req, res, next) {
    var RouteModel = require('../api/route/routeModel');

    RouteModel.findById(req.params.id, function(err, route) {
        if (err == null) {
            //  Phase 1 - Get all sales.

            var orders = [];

            route.objects.forEach(function(itemInOrder) {
                if (_.findWhere(orders, { order: itemInOrder.order }) == null) {
                    orders.push(itemInOrder);
                }
            });

            request(process.env.PRIMAVERA_URI + 'Sales', function(error, response, body) {
                var sales = JSON.parse(body);

                //  Phase 2 - Get count of each item.

                var itemsAndCount = {};

                sales.forEach(function(sale) {
                    if (_.findWhere(orders, { order: sale.NumDoc }) != null) {
                        route.objects.forEach(function(itemInOrder) {
                            if (itemInOrder.order == sale.NumDoc) {
                                sale.LinhasDoc.forEach(function(linha) {
                                    if (itemInOrder.item == linha.CodArtigo) {
                                        if (itemInOrder.item in itemsAndCount)
                                            itemsAndCount[itemInOrder.item] += linha.Quantidade;
                                        else
                                            itemsAndCount[itemInOrder.item] = linha.Quantidade;
                                    }
                                });
                            }
                        });
                    }
                });

                //  Phase 3 - Get warehouses for items.

                var itemsAndWarehouses = {};

                var i = 0;

                for (var key in itemsAndCount) {
                    //  Sometimes I just hate JS.
                    //  Creating a function to force the variable scope I desire...

                    (function() {
                        var k = key;

                        i++;

                        request(process.env.PRIMAVERA_URI + 'Stock/' + k, function(error, response, body) {
                            i--;

                            var wh = JSON.parse(body);

                            for (w in wh)
                                delete w.artigo;

                            itemsAndWarehouses[k] = JSON.parse(body);

                            if (i == 0) {
                                var final = [];

                                for (var itemIdentifier in itemsAndCount) {
                                    var x = { item: itemIdentifier, count: itemsAndCount[itemIdentifier], warehouses: wh };

                                    final.push(x);
                                }
                            }

                            //  Step 4 - We have {item, count, warehouses}.
                            //  Build a path.

                            //  Thanks in advance.
                        });
                    })();
                }
            });
        } else {
            //  Handle Error
        }
    });
});

router.get('/', checkToken(), function(req, res, next) {
    var RouteModel = require('../api/route/routeModel');

    User.findById(req.user._id).then(function(user) {
        RouteModel.find({username: user.username}).exec(function(err, routes) {
            if (err == null) {
                res.render('routes', { title: 'Routes', level: req.user.level, routes: routes });
            } else {
                //  Handle Error!
            }
        });
    });
});

module.exports = router;
