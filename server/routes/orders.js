const express = require('express');

let Order = require('../models/order.model');

const router = express.Router();

router.route('/').get((req, res) => {
    Order.find().then(items => res.json(items))
        .catch(err => res.status(400).json('Error getting items: ', err));
});

function getCartTotal(cart){
    let cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.qty * (item.price * 100);
    });
    return cartTotal;
}

router.route('/create').post((req, res) => {
    const newOrder = new Order({
        userDetails: req.body.userDetails,
        items: req.body.items,
        paymentIntentId: req.body.paymentIntentId,
        paymentMethodId: req.body.paymentMethodId,
        total: getCartTotal(req.body.items),
        orderDate: new Date()
    });
    newOrder.save().then(()=> res.json('New order successfully created'))
        .catch(err => res.status(400).json('Error creating order: ', err));
});

module.exports = router;
