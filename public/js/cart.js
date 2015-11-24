//  requires js cookie!

var cartCookieName = 'itemsCart';

function addToShoppingCart(item) {
    if (Cookies.getJSON(cartCookieName)) {
        addToCartCookie(item);
    } else {
        createCartCookie(item);
    }
}

function createCartCookie(initialItem) {
    Cookies.set(cartCookieName, [initialItem]);
}

function addToCartCookie(item) {
    var current = Cookies.getJSON(cartCookieName);

    current.push(item);

    Cookies.set(cartCookieName, current);
}

function removeFromCartCookie(item) {
    //   tbd
}
