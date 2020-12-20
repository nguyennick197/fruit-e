import { List } from 'semantic-ui-react'
import { formatPrice, getCartTotal, getCartQuantity } from '../utils/miscFuncs';

const OrderDetailsView = (props) => {
    const { cart, customerDetails } = props.location.state;
    return (
        <div>
            <h1> Order Details </h1>
            <h3> Your order has been placed! </h3>
            {customerDetails &&
                <div>
                    <p style={{margin: 3}}> {customerDetails.name} </p>
                    <p style={{margin: 3}}> {`${customerDetails.addressLineOne}, ${customerDetails.addressLineTwo}`} </p>
                    <p style={{margin: 3}}> {`${customerDetails.city}, ${customerDetails.state} ${customerDetails.zipcode}`} </p>
                </div>
            }
            {(cart && cart.length) &&
                <List celled >
                    {cart.map(item => (
                        <List.Item key={item._id}>
                            <List.Content>
                                <List.Header> {item.name} </List.Header>
                                <List.Description> {`Price: ${formatPrice(item.price)}`} </List.Description>
                                <List.Description> {`Quantity: ${item.qty}`} </List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                    <List.Item>
                        <List.Content>
                            {`Total: ${formatPrice(getCartTotal(cart))} (${getCartQuantity(cart)} items)`}
                        </List.Content>
                    </List.Item>
                </List>
            }
        </div>
    )
};

export default OrderDetailsView;