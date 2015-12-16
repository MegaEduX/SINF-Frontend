var express = require('express');
var checkToken = require('../api/auth/auth').checkToken;
var config = require('../config/config');
var router = express.Router();
var request = require('request');
var async = require('async');

// same cached value if you call it in get route
// but it will take more time for look up
var RouteModel = require('../api/route/routeModel');
var User = require('../api/user/userModel');

function compareItems(a, b) {
    var x = a.warehouse.toLowerCase();
    var y = b.warehouse.toLowerCase();
    var res =  x < y ? -1 : x > y ? 1 : 0;
    if (res == 0) { // items are in the same warehouse
        console.log(a);
        console.log(b);
        // if one item doesn't have properties, give advantage to another
        if (a.floor == undefined) {
            console.log("a floor und");
            return 1;
        } else if (b.floor == undefined) {
            console.log("b floor und");
            return -1;
        } else {
            // compare floors
            x = Number(a.floor);
            y = Number (b.floor);
            res = x < y ? -1 : x > y ? 1 : 0;
            if (res == 0) {
                // compare corridors
                if (a.corridor == undefined) {
                    return 1;
                } else if (b.corridor == undefined) {
                    return -1;
                } else {
                    x = a.corridor.toLowerCase();
                    y = b.corridor.toLowerCase();
                    res = x < y ? -1 : x > y ? 1 : 0;
                    if (res == 0) {
                        // compare sections
                        if (a.section == undefined) {
                            return 1;
                        } else if (b.section == undefined) {
                            return -1;
                        } else {
                            x = a.section;
                            y = b.section;
                            return x < y ? -1 : x > y ? 1 : 0;
                        }
                    } else {
                        return res;
                    }
                }
            } else {
                return res;
            }
        }
    } else {
        return res;
    }
}

function sortItems(items) {
    // sort stock for each item
    for (var i = 0; i < items.length; i++) {
        if (items[i].stock.length > 1) {
            items[i].stock.sort(function(a, b) {
                return compareItems(a,b);
            });
        }
    }
    items.sort(function(a, b) {
        var x = a.stock[0].warehouse.toLowerCase();
        var y = b.stock[0].warehouse.toLowerCase();
        var rez =  x < y ? -1 : x > y ? 1 : 0;
        return rez;
        /*
        
        */
    });

    for (var i = 0; i < items.length; i++) {
        //console.log(items[i]);
    }

    return items;
    /*
    if(isNumericSort) {
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
    } else {
        sortable.sort(function(a, b) {
            var x = a[1].toLowerCase(),
                y = b[1].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }
    */
    
}

function createPickingRoute(items) {
    for (var i = 0; i < items.length; i++) {
        //console.log(items[i]);
        items[i].id = i;
    }
    return sortItems(items);
}


router.get('/create', checkToken(), function(req, res, next) {
    
    // WARNING - today manipulation is just for debuging purpouse
    var today = new Date();
    today.setDate(today.getDate() - 14); // today - 14 days

    var items = [];
    var iter = 0;
    // get cart data
    var cart = JSON.parse(req.cookies.itemsCart);
    var urls = [];
    for (var i = 0; i < cart.length; i++) {
        urls.push(config.primavera.url + 'Stock/' + cart[i].item);
    }

    async.eachSeries(urls, function(url, next) {

        request(url, function (error, response, body) {    
            if (!error && response.statusCode == 200) {
                // stock array
                var stocks = JSON.parse(body);
                var cartItem = cart[iter++];
                // items stock array
                cartItem.stock = [];
                for (var i = 0; i < stocks.length; i++) {
                    var stockQuantity = Number(stocks[i].Stock);
                    // if there is an item on the stock, we can consider it
                    if (stockQuantity != NaN && stockQuantity > 0) {
                        var temp = {};
                        temp.expirationDate = new Date(stocks[i].DataValidade);
                        /*
                        if (temp.expirationDate < today) {
                            continue; // just ignore this item
                        }
                        */

                        temp.quantity = stockQuantity;
                        temp.lot = stocks[i].Lote.replace("<", "").replace(">", "");
                        
                        // get warehouse, corridor, floor and section location of the item
                        var p = stocks[i].Localizacao.split(".");
                        if (p[0] != undefined) {
                            temp.warehouse = p[0];
                        }
                        if (p[1] != undefined) {
                            temp.corridor = p[1];
                        }
                        if (p[2] != undefined) {
                            if (p[3] != undefined) {
                                temp.floor = p[2];
                                temp.section = p[3];
                            } else {
                                temp.section = p[2];
                            }
                        }

                        cartItem.stock.push(temp);
                    }
                }
                items.push(cartItem);
                next();
            } else { 
                next(error);
            }
        }); // request


    }, function() {
        // all items are ready - see previous function
        // now we need to get sales data
        // first - get all unique sales ids
        var saleIds = [];
        for (var i = 0; i < items.length; i++) {
            if (saleIds.indexOf(items[i].order) == -1) {
                saleIds.push(items[i].order);
            }
        }
        // prepare sales urls
        var urls = [];
        for (var i = 0; i < saleIds.length; i++) {
            urls.push(config.primavera.url + 'Sales/' + saleIds[i]);
        }
        async.eachSeries(urls, function(url, next) {
            request(url, function (error, response, body) {    
                if (!error && response.statusCode == 200) {
                    var sale = JSON.parse(body);
                    //console.log(sale);
                    for (var i = 0; i < sale.LinhasDoc.length; i++) {
                        console.log(sale.NumDoc, sale.LinhasDoc[i].CodArtigo, sale.LinhasDoc[i].Quantidade);
                        // update items with needed quantity
                        for (var j = 0; j < items.length; j++) {
                            if (items[j].order == sale.NumDoc && items[j].item == sale.LinhasDoc[i].CodArtigo) {
                                items[j].needed = sale.LinhasDoc[i].Quantidade;
                                break;
                            }
                        }
                    }  
                    next();
                } else { 
                    next(error);
                }
            }); // request


        }, function() {
            // if needed quantity is 0 we can ignore that items
            var temp = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].needed > 0) {
                    temp.push(items[i]);
                }
            }
            items = temp;
            // create picking route - item sorting
            var sortedItems = createPickingRoute(items);
            console.log("sorted items");
            for (var i = 0; i < sortedItems.length; i++) {
                console.log(sortedItems[i]);
            }
            /*
            User.findById(req.user._id).then(function(user) {
                try {
                    var r = new RouteModel({
                        username: user.username,
                        objects: cart,
                        picked: [],
                        date: Date.now()
                    });
                } catch (e) {
                    console.log("Exception! - " + e);
                }

                r.save(function(err, route) {
                    if (err == null) {
                        res.redirect('/routes/' + route.id);
                    } else {
                        console.log(err);
                    }
                });
            });
            */ 
        });
    });

});

router.get('/', checkToken(), function(req, res, next) {
    var cart = [];

    try {
        cart = JSON.parse(req.cookies.itemsCart);
    } catch (e) {

    }

    res.render('picking', { title: 'Confirm Picking Route Creation', level: req.user.level, toPick: cart });
});

module.exports = router;
