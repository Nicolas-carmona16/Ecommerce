import React, { useState } from 'react';

import {} from '../contexts/CartContext'

const RegisterForm = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario a tu servidor o realizar otras acciones
        console.log(formData);
    };

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-blue-100 border-gray-300 rounded-md px-4 py-2 mt-1" required />
            </div>
            <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-blue-100 border-gray-300 rounded-md px-4 py-2 mt-1" required />
            </div>
        </div>
        <div className="mt-4">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-blue-100 border-gray-300 rounded-md px-4 py-2 mt-1" required />
        </div>
        <div className="mt-4">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full bg-blue-100 border-gray-300 rounded-md px-4 py-2 mt-1" required />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full bg-blue-100 border-gray-300 rounded-md px-4 py-2 mt-1" required />
            </div>
            <div>
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="w-full bg-blue-100 border-gray-300 rounded-md px-4 py-2 mt-1" required />
            </div>
            <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full bg-blue-100 border-gray-300 rounded-md px-4 py-2 mt-1" required />
            </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-400">Finish</button>
        </form>
    </section>
  );
};

export default RegisterForm;
