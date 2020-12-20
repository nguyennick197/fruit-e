import 'semantic-ui-css/semantic.min.css'

import {
  BrowserRouter,
  Route,
  useHistory
} from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Segment } from 'semantic-ui-react';
import CartContextProvider from './context/CartContext';
import HeaderBar from './components/HeaderBar';
import ItemView from './containers/ItemView';
import CartView from './containers/CartView';
import CheckoutView from './containers/CheckoutView';
import OrderDetailsView from './containers/OrderDetailsView';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function RouterApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

function App() {
  const history = useHistory()

  function goToHome() {
    history.push('/');
  }

  function goToCart() {
    history.push('/cart');
  }

  return (
    <div>
      <CartContextProvider>
        <HeaderBar goToHome={goToHome} goToCart={goToCart} />
        <Segment attached="bottom">
          <Route exact path='/' component={ItemView} />
          <Route path="/cart" component={CartView} />
          <Route path="/order-details" component={OrderDetailsView}/>
          <Elements stripe={stripePromise}>
            <Route path="/checkout" component={CheckoutView} />
          </Elements>
        </Segment>
      </CartContextProvider>
    </div>
  );
}

export default RouterApp;
