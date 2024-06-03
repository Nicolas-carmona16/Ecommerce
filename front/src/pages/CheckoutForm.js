import React, { useState, useContext } from 'react';
import { FaCreditCard, FaPaypal, FaHome } from 'react-icons/fa';
import {CartContext} from '../contexts/CartContext'
import { Link } from 'react-router-dom';

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [address, setAddress] = useState('');
  const { clearCart, total } = useContext(CartContext);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Method:', paymentMethod);
    console.log('Address:', address);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center'>Checkout</h2>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Payment Method</h3>
            <div className='flex items-center space-x-4'>
              <button
                type='button'
                className={`flex items-center p-4 border-2 rounded-lg ${
                  paymentMethod === 'credit-card' ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => handlePaymentMethodChange('credit-card')}
              >
                <FaCreditCard className='text-2xl mr-2' />
                <span>Credit Card</span>
              </button>
              <button
                type='button'
                className={`flex items-center p-4 border-2 rounded-lg ${
                  paymentMethod === 'paypal' ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => handlePaymentMethodChange('paypal')}
              >
                <FaPaypal className='text-2xl mr-2' />
                <span>PayPal</span>
              </button>
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Shipping Address</h3>
            <div className='flex items-center'>
              <FaHome className='text-2xl mr-2' />
              <input
                type='text'
                placeholder='Enter your address'
                value={address}
                onChange={handleAddressChange}
                className='w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
          </div>
          <div className='space-y-4'>
            <div className='text-lg font-semibold'>
              <span className='mr-2'>Total:</span> $ {parseFloat(total).toFixed(2)}
            </div>
            <Link to='/'>
            <button
              type='submit'
              onClick={clearCart}
              className='w-full py-4 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Finish Purchase
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
    );
};

export default CheckoutForm;

