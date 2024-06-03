import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto w-full">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Ecommerce Store. All rights
          reserved.
        </p>
        <div className="mt-4">
          <a href="/about" className="text-gray-400 hover:text-white mx-2">
            About
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">
            Contact
          </a>
          <a
            href="/data-policy"
            className="text-gray-400 hover:text-white mx-2"
          >
            data processing policy
          </a>
          <a
            href="/return-policy"
            className="text-gray-400 hover:text-white mx-2"
          >
            purchase and return policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
