import React, { useContext } from 'react';
import { Button, Image, List } from 'semantic-ui-react'
import { CartContext } from '../context/CartContext';
import { formatPrice, getCartTotal, getCartQuantity } from '../utils/miscFuncs';

const CartView = (props) => {
    const context = useContext(CartContext);

    const cartTotal = formatPrice(getCartTotal(context.cart));

    const cartQuantity = getCartQuantity(context.cart);

    const goToCheckout = () => {
        props.history.push('/checkout')
    }

    return (
        <div style={{ padding: 8, }}>
            <h1 style={{ textAlign: 'center' }}> Cart </h1>
            <List divided verticalAlign="middle">
                {context.cart.length > 5 &&
                    // if cart has more than 5 items, display total amount and checkout button above items
                    <List.Item>
                        <List.Content floated="right" style={{ marginBottom: 14 }}>
                            <Button style={{ fontSize: 20 }} color="orange" onClick={goToCheckout}> Checkout </Button>
                        </List.Content>
                        <List.Content>
                            <h2> {`Total: ${cartTotal} (${cartQuantity} items)`}  </h2>
                        </List.Content>
                    </List.Item>
                }
                {context.cart.map((item, idx) => (
                    <List.Item key={item._id}>
                        <List.Content floated="right" style={{ fontSize: 16, paddingTop: 35 }}>
                            <Button onClick={()=>context.removeFromCart(idx)}> Remove from cart </Button>
                        </List.Content>
                        <Image avatar size="tiny" src={item.image} />
                        <List.Content style={{ fontSize: 20 }}> {item.name} </List.Content>
                        <List.Content style={{ fontSize: 16 }}>
                            {`Price: ${formatPrice(item.price)} ea.`}
                        </List.Content>
                        <List.Content style={{ fontSize: 15 }}>
                            {`Quantity: ${item.qty}`}
                        </List.Content>
                    </List.Item>
                ))}
                <List.Item style={{ paddingTop: 10 }}>
                    <List.Content floated="right">
                        <Button style={{ fontSize: 20 }} color="orange" onClick={goToCheckout}> Checkout </Button>
                    </List.Content>
                    <List.Content style={{paddingTop: 15}}>
                        <h2> {`Total: ${cartTotal} (${cartQuantity} items)`}  </h2>
                    </List.Content>
                </List.Item>
            </List>
        </div>
    )
}



export default CartView;

