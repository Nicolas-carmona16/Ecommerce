import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CheckoutForm from './pages/CheckoutForm.js';
import Login from './pages/Login';
import RegisterForm from './pages/RegisterForm.js'

//Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';





const App = () => {
  return (
  <div className='overflow-hidden'>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/checkout' element={<CheckoutForm/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
      </Routes>
      <Sidebar/>
      <Footer/>
    </Router>
    </div>
  );
};

export default App;
