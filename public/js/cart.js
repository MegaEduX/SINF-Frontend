//  requires js cookie!

var cartCookieName = 'itemsCart';

function addToShoppingCart(doc, item) {
    if (Cookies.getJSON(cartCookieName)) {
        addToCartCookie(doc, item);
    } else {
        createCartCookie(doc, item);
    }
}

function _cartMakePart(d, i) {
    return { order: d, item: i };
}

function createCartCookie(document, initialItem) {
    Cookies.set(cartCookieName, [_cartMakePart(document, initialItem)]);
}

function addToCartCookie(document, item) {
    var current = Cookies.getJSON(cartCookieName);
    
    current.push(_cartMakePart(document, item));

    Cookies.set(cartCookieName, _.uniq(current));
}

function removeFromCartCookie(item) {
    //   tbd
}
