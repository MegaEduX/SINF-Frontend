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
    Cookies.setJSON(cartCookieName, [initialItem]);
}

function addToCartCookie(item) {
    var current = Cookies.getJSON(cartCookieName);

    current.push(item);

    Cookies.setJSON(cartCookieName, current);
}

function removeFromCartCookie(item) {
    //   tbd
}
