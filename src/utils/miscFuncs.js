// takes in number, returns number formatted as USD
export function formatPrice(num){
    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return usdFormatter.format(num);
}

// takes in cart array, returns total number of items in cart
export function getCartQuantity(cart){
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.qty;
    });
    return totalQuantity;
}

// takes in cart array, returns total value of items in cart
export function getCartTotal(cart){
    let cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.qty * item.price;
    });
    return cartTotal;
}