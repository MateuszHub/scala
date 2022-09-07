import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Cart from './page/Cart';
import Items from './page/Items';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation';
import CartContextProvider from './context/CartContextProvider';
import AuthPage from './page/AuthPage';
import AccountPage from './page/AccountPage';
import OrdersPage from './page/OrdersPage';
import AddKeysPage from './page/AddKeysPage';
import AddItem from './page/AddItem';

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Container fluid="md" className="p-3">
          <Navigation />
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/items/:id/keys' element={<AddKeysPage />} />
            <Route path='/items/add' element={<AddItem />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
