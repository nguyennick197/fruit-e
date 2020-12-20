const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userDetails: {
        name: String,
        addressLineOne: String,
        addressLine2: String,
        city: String,
        state: String,
        zipcode: String
    },
    items: [
        {
            _id: String,
            name: String,
            price: Number,
            image: String
        }
    ],
    paymentIntentId: String,
    paymentMethodId: String,
    total: Number,
    orderDate: Date,
}, { collection: 'orders' }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;