import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
  });

  const [paymentMethod, setPaymentMethod] = useState({
    method_type: "",
    provider: "",
    account_number: "",
    expiry: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/address", {
          withCredentials: true,
        });
        if (response.data) {
          setAddress(response.data);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    const fetchPaymentMethod = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/payment-method",
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          setPaymentMethod(response.data);
        }
      } catch (error) {
        console.error("Error fetching payment method:", error);
      }
    };

    fetchAddress();
    fetchPaymentMethod();
  }, []);

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod({
      ...paymentMethod,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/address", address, {
        withCredentials: true,
      });
      await axios.post(
        "http://localhost:3000/api/payment-method",
        paymentMethod,
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Address</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zip_code"
              value={address.zip_code}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Method Type</label>
            <input
              type="text"
              name="method_type"
              value={paymentMethod.method_type}
              onChange={handlePaymentMethodChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Provider</label>
            <input
              type="text"
              name="provider"
              value={paymentMethod.provider}
              onChange={handlePaymentMethodChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Account Number</label>
            <input
              type="text"
              name="account_number"
              value={paymentMethod.account_number}
              onChange={handlePaymentMethodChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Expiry Date</label>
            <input
              type="date"
              name="expiry"
              value={paymentMethod.expiry}
              onChange={handlePaymentMethodChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
