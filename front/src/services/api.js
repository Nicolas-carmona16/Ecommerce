import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_URL}/product/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const addToCart = async (productId) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart`,
      { productId, quantity: 1 },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const fetchCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const fetchCartTotal = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart/total`, {
      withCredentials: true,
    });
    return response.data.total;
  } catch (error) {
    console.error("Error fetching cart total:", error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${productId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await axios.delete(`${API_URL}/cart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const fetchOrderSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart/summary`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order summary:", error);
    throw error;
  }
};

export const fetchAddress = async () => {
  try {
    const response = await axios.get(`${API_URL}/address`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

export const updateAddress = async (address) => {
  try {
    const response = await axios.post(`${API_URL}/address`, address, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const fetchPaymentMethod = async () => {
  try {
    const response = await axios.get(`${API_URL}/payment-method`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment method:", error);
    throw error;
  }
};

export const updatePaymentMethod = async (paymentMethod) => {
  try {
    const response = await axios.post(
      `${API_URL}/payment-method`,
      paymentMethod,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating payment method:", error);
    throw error;
  }
};
