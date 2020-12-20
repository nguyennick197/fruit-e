const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
}, {
    collection: 'items'
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;