import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, total, loadCart, increment, decrement, clearCart } =
    useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        await loadCart();
        setLoading(false);
      } catch (error) {
        setError("Error fetching cart items");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [loadCart]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleViewSummary = () => {
    navigate("/order-summary");
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      alert("Failed to clear cart");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formattedTotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(total);

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4 cursor-pointer"
                  onClick={() => handleProductClick(item.product_id)}
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-700">
                    {item.quantity} x{" "}
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(parseFloat(item.price))}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => decrement(item.product_id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => increment(item.product_id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold">Total: {formattedTotal}</h2>
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mr-2"
            >
              Clear Cart
            </button>
            <button
              onClick={handleViewSummary}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              View Order Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
