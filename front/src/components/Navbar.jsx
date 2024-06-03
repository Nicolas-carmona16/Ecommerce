import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Logo from "../img/logo.svg";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { itemAmount } = useContext(CartContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white py-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between h-full px-8">
        <Link to="/">
          <img className="w-[40px]" src={Logo} alt="Logo" />
        </Link>
        <ul className="flex items-center space-x-4">
          <Link className="text-black hover:text-red-500" to="/about">
            About
          </Link>
          <Link className="text-black hover:text-red-500" to="/contact">
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <li>
                <Link className="text-black hover:text-red-500" to="/profile">
                  Profile
                </Link>
              </li>
              {user && user.role === 1 && (
                <>
                  <li>
                    <Link
                      className="text-black hover:text-red-500"
                      to="/add-product"
                    >
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black hover:text-red-500"
                      to="/create-category"
                    >
                      Create Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black hover:text-red-500"
                      to="/manage-categories"
                    >
                      Manage Categories
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  className="text-black hover:text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="text-black hover:text-red-500" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="text-black hover:text-red-500" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
        <Link className="text-black hover:text-red-500" to="/cart">
          <div className="cursor-pointer relative flex">
            <BsBag className="text-2xl text-black hover:text-red-500" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-black rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
