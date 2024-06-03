import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrderSummary } from "../services/api";

const OrderSummary = () => {
  const [orderSummary, setOrderSummary] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderSummary = async () => {
      try {
        const data = await fetchOrderSummary();
        setOrderSummary(data.items);
        setTotal(data.total);
        setLoading(false);
      } catch (error) {
        setError("Error fetching order summary");
        setLoading(false);
      }
    };

    getOrderSummary();
  }, []);

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
      <h1 className="text-4xl font-bold mb-6">Order Summary</h1>
      {orderSummary.length === 0 ? (
        <p>No items in the order</p>
      ) : (
        <div>
          {orderSummary.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
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
                  <p className="text-gray-700">
                    Total:{" "}
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(parseFloat(item.price) * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold">Total: {formattedTotal}</h2>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => navigate("/cart")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Back to Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
