import React from 'react';

export const CartContext = React.createContext();

class CartContextProvider extends React.Component{
    state = {
        cart: [],
        details: {
            name: '',
            addressLineOne: '',
            addessLineTwo: '',
            city: '',
            state: '',
            zipcode: ''
        }
    }

    componentDidMount(){
        // check local storage
        // if local storage items exist, set items to local storage items
    };

    // if item doesn't exist in cart, add to cart and set quantity to one
    // if item exists in cart, increment quantity by one
    addToCart = (item) => {
        let dataCopy = [...this.state.cart];
        let existsIndex = dataCopy.findIndex((e) => e._id === item._id);
        if(existsIndex === -1){
            dataCopy.push({...item, qty: 1});
        }else{
            dataCopy[existsIndex].qty += 1;
        }
        this.setState({
            cart: dataCopy
        });
    }

    // removes item from cart at index "idx"
    removeFromCart = (idx) => {
        const dataCopy = [...this.state.cart];
        dataCopy.splice(idx, 1);
        this.setState({
            cart: dataCopy
        });
    }

    // sets cart to empty array
    clearCart = () => {
        this.setState({
            cart: []
        });
    }

    setDetails = (details) => {
        this.setState({
            details,
        });
    }

    render(){
        return(
            <CartContext.Provider value={{ ...this.state, addToCart: this.addToCart, removeFromCart: this.removeFromCart, clearCart: this.clearCart, setDetails: this.setDetails }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartContextProvider;