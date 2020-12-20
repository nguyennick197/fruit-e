const express = require('express');

let Item = require('../models/item.model');

const router = express.Router();

router.route('/').get((req, res) => {
    Item.find().then(items => res.json(items))
        .catch(err => res.status(400).json('Error getting items: ', err));
});

router.route('/create').post((req, res) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const newItem = new Item({
       name,
       price, 
    });
    newItem.save().then(()=> res.json('New item successfully created'))
        .catch(err => res.status(400).json('Error creating item: ', err));
}) 

module.exports = router;