import React from 'react';
import { Card, Button } from 'semantic-ui-react'
import { formatPrice } from '../utils/miscFuncs';

const ItemComponent = (props) => {
    const { data, addToCart, cart } = props;

    function handleAddToCart(){
        addToCart(data);
    }

    function itemsInCart(){
        const itemExistsInCart = cart.find(e => e._id === data._id);
        if(itemExistsInCart) return itemExistsInCart.qty;
        return null;
    }

    const itemQty = itemsInCart();

    return (
        <Card style={styles.card}>
            {itemQty &&
                <p style={styles.itemQty}> {`${itemQty} in cart`}</p>
            }
            <img src={data.image} width={120} alt="fruit" style={styles.image}/>
            <Card.Content>
                <Card.Header> {data.name} </Card.Header>
                <Card.Description style={styles.price}>
                    {`Price: ${formatPrice(data.price)}`}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button primary onClick={handleAddToCart}> Add to Cart </Button>
            </Card.Content>
        </Card>
    )
};

const styles = {
    card: {
        margin: 10,
        textAlign: 'center',
        alignSelf: 'stretch'
    },
    itemQty: {
        position: 'absolute',
        left: 8,
        top: 5
    },
    image: {
        display: 'block', 
        margin: 'auto'
    },
    price: {
        fontSize: 16
    }
}

export default ItemComponent;