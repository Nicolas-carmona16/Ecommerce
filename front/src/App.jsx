import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import OrderSummary from "./pages/OrderSummary";
import CheckoutForm from "./pages/CheckoutForm";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import CreateCategory from "./pages/CreateCategory";
import ManageCategories from "./pages/ManageCategories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DataPolicy from "./pages/DataPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import Footer from "./components/Footer";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AuthContext.Consumer>
            {({ loading }) => (
              <div className="flex flex-col min-h-screen">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    <Navbar />
                    <div className="flex-grow pt-20 px-4 mx-auto max-w-7xl w-full">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                          path="/cart"
                          element={
                            <ProtectedRoute>
                              <Cart />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/profile"
                          element={
                            <ProtectedRoute>
                              <Profile />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/product/:id"
                          element={<ProductDetails />}
                        />
                        <Route
                          path="/order-summary"
                          element={
                            <ProtectedRoute>
                              <OrderSummary />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/checkout"
                          element={
                            <ProtectedRoute>
                              <CheckoutForm />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/add-product"
                          element={
                            <ProtectedRoute roles={[1]}>
                              <AddProduct />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/update-product/:id"
                          element={
                            <ProtectedRoute roles={[1]}>
                              <UpdateProduct />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/create-category"
                          element={
                            <ProtectedRoute roles={[1]}>
                              <CreateCategory />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/manage-categories"
                          element={
                            <ProtectedRoute roles={[1]}>
                              <ManageCategories />
                            </ProtectedRoute>
                          }
                        />{" "}
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/data-policy" element={<DataPolicy />} />
                        <Route
                          path="/return-policy"
                          element={<ReturnPolicy />}
                        />
                      </Routes>
                    </div>
                    <Footer />
                  </>
                )}
              </div>
            )}
          </AuthContext.Consumer>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
