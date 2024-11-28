import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import "./App.css";
import OrderPage from './TableOrdering/Pages/Order/Order';
import MenuPage from './TableOrdering/Pages/Menu/Menu';
import MainPage from './TableTechs/Pages/Main/Main';
import HomePage from './TableTechs/Pages/Home/Home';
import DetailsPage from './TableOrdering/Pages/Details/Details';
import TrayPage from './TableOrdering/Pages/Tray/Tray';
import TablePage from './TableOrdering/Pages/Table/Table';
import ScrollToTop from './TableTechs/Components/ScrollToTop/ScrollToTop';
import CheckoutPage from './TableOrdering/Pages/Checkout/Checkout';
import ThanksPage from './TableOrdering/Pages/Thanks/Thanks';
import PaymentPage from './TableOrdering/Pages/Payment/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/order' element={<OrderPage />}>
          <Route path='details' element={<DetailsPage />} />
          <Route path='tray' element={<TrayPage />} />
          <Route path='table' element={<TablePage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='payment' element={<PaymentPage />} />
          <Route path='thanks' element={<ThanksPage />} />
          <Route path='' element={<MenuPage />} />
          <Route path='*' element={<Navigate to="/order" />} />
        </Route>
        
        <Route path='/' element={<MainPage />}>
          <Route path='' element={<HomePage />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </Router>
  );
}

export default App;
