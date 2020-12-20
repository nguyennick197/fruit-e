import React, { useContext } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { CartContext } from '../context/CartContext';
import { getCartQuantity } from '../utils/miscFuncs';

const HeaderBar = (props) => {
    const { goToHome, goToCart } = props;
    const context = useContext(CartContext);
    return (
        <Menu
            attached="top"
            style={{ padding: 10 }}
        >
            <div onClick={goToHome} style={{display: 'flex', cursor: 'pointer'}}>
                <img src="https://www.flaticon.com/svg/static/icons/svg/3082/3082005.svg" width={80} height={60} alt="Fruit-E" />
                <h2 style={{marginTop: 20}}> Fruit-E </h2>
            </div>
            <Menu.Menu position='right'>
                <Button
                    onClick={goToCart}
                    style={{fontSize: 16}}
                >
                    <Icon name="shopping cart" size="large" />
                    {`Cart (${getCartQuantity(context.cart)})`}
                </Button>
            </Menu.Menu>
        </Menu>
    )
};

export default HeaderBar;