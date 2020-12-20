import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemComponent from '../components/ItemComponent';
import { CartContext } from '../context/CartContext';

const ItemView = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/items/')
            .then(response => {
                setItems(response.data);
            }).catch(err => {
                console.log('Error retrieving items: ', err);
            });
    }, [])

    const context = useContext(CartContext);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}> Fresh Fruit On Demand </h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {items.map((item, idx) => (
                    <ItemComponent
                        key={idx}
                        data={item}
                        addToCart={context.addToCart}
                        cart={context.cart}
                    />
                ))}
            </div>
        </div>
    )
};

export default ItemView;