//  requires js cookie!

var cartCookieName = 'itemsCart';

function removeFromArray(array, value) {
    var idx = array.indexOf(value);

    if (idx !== -1)
        array.splice(idx, 1);

    return array;
}

function addToShoppingCart(doc, item) {
    if (Cookies.getJSON(cartCookieName)) {
        addToCartCookie(doc, item);
    } else {
        createCartCookie(doc, item);
    }

    updateCounter();
}

function _cartMakePart(d, i) {
    return { order: d, item: i };
}

function existsInCartCookie(document, initialItem) {
    var c = Cookies.getJSON(cartCookieName);

    for (var i = 0, len = c.length; i < len; i++)
        if (c[i].order == document || c[i].item == initialItem)
            return false;

    return true;
}

function createCartCookie(document, initialItem) {
    Cookies.set(cartCookieName, [_cartMakePart(document, initialItem)]);
}

function addToCartCookie(document, item) {
    var current = Cookies.getJSON(cartCookieName);

    if (!existsInCartCookie(document, item))
        current.push(_cartMakePart(document, item));

    Cookies.set(cartCookieName, current);
}

function removeFromCartCookie(item) {
    var c = Cookies.getJSON(cartCookieName);

    for (var i = 0, len = c.length; i < len; i++)
        if (c[i].order == document || c[i].item == item) {
            removeFromArray(c[i], item);

            Cookies.set(cartCookieName, c);

            updateCounter();

            return;
        }
}

function updateCounter() {
    var arr = Cookies.getJSON(cartCookieName);

    $("#pickingItemCount").text(arr.length);
}

$(document).ready(function() {
    updateCounter();
});
