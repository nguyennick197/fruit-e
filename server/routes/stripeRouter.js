require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        let { status } = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            source: req.body.token,
        });
        return res.json({ status });
    } catch (err) {
        console.log('Error charging card: ', err);
        res.status(500).end();
    }
});

function getCartTotal(cart){
    let cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.qty * (item.price * 100);
    });
    return cartTotal;
}

router.post('/intent', async(req, res) => {
    try {
        const intent = await stripe.paymentIntents.create({
            amount: getCartTotal(req.body.items),
            currency: 'usd',
            metadata: {integration_check: 'accept_a_payment'},
        });
        return res.json({ client_secret: intent.client_secret});
    } catch (err) {
        console.log('Error creating intent: ', err);
        res.status(500).end();
    }
}); 

module.exports = router;
