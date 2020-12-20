import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Input, Button, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const CheckoutView = (props) => {
    const [name, setName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const context = useContext(CartContext);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        await axios.post('http://localhost:5000/stripe/intent', {
            items: context.cart
        })
            .then(response => {
                return response.data;
            }).then(responseJson => {
                var clientSecret = responseJson.client_secret;
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: name
                        }
                    }
                }).then(result => {
                    if (result.error) {
                        console.log(result.error.message);
                        setErrorMessage(result.error.message);
                        setLoading(false);
                    } else {
                        if (result.paymentIntent.status === 'succeeded') {
                            const customerDetails = {
                                name,
                                addressLineOne,
                                addressLineTwo,
                                city,
                                state,
                                zipcode
                            };
                            console.log("Payment success!");
                            console.log(result);
                            axios.post('http://localhost:5000/orders/create', {
                                items: context.cart,
                                userDetails: customerDetails,
                                paymentIntentId: result.paymentIntent.id,
                                paymentMethodId: result.paymentIntent.payment_method
                            }).then(response => {
                                setLoading(false);
                                const cart = [...context.cart];
                                context.clearCart();
                                props.history.push({
                                    pathname: '/order-details',
                                    state: {
                                        customerDetails: customerDetails,
                                        cart: cart,
                                    }
                                });
                            }).catch(err => {
                                console.log('Error creating order: ', err);
                                setLoading(false);
                            })
                        }
                    }
                })
            }).catch(err => {
                console.log('Error creating intent: ', err);
                setLoading(false);
            })
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}> Checkout </h1>
            {errorMessage &&
                <p style={{ color: '#cc0000', textAlign: 'center' }}> {errorMessage} </p>
            }
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{ width: 600, padding: 15 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Input placeholder="Full Name (First and Last)" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
                        <Input placeholder="Address Line 1" style={styles.input} value={addressLineOne} onChange={(e) => setAddressLineOne(e.target.value)} />
                        <Input placeholder="Address Line 2" style={styles.input} value={addressLineTwo} onChange={(e) => setAddressLineTwo(e.target.value)} />
                        <Input placeholder="City" style={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
                        <Input placeholder="State/Province" style={styles.input} value={state} onChange={(e) => setState(e.target.value)} />
                        <Input placeholder="ZIP Code" style={{ marginBottom: 20 }} value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                    </div>
                    <CardElement options={CARD_OPTIONS} onChange={() => setErrorMessage("")} />
                    <Button type="submit" disabled={!stripe} color="blue" style={{ marginTop: 20, width: 120 }}> Pay </Button>
                </form>
            </div>
            <Dimmer active={loading}>
                <Loader>Processing transaction...</Loader>
            </Dimmer>
        </div>
    )
};

const styles = {
    input: {
        marginBottom: 5
    }
}

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#9e2146"
        }
    }
}

export default CheckoutView