import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">About us</h1>
      <p className="mb-4">
        Welcome to our online store. We are a company committed to offer high
        quality products and exceptional service to our customers. Our mission
        is to provide a shopping experience unmatched and build lasting
        relationships with our clients.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our history</h2>
      <p className="mb-4">
        Founded in 2021, our store has grown rapidly thanks to the support from
        our amazing clients. From the beginning, we have focused on quality,
        innovation and customer satisfaction.
      </p>
      <h2 className="text-2xl font-semibold mb-4">our principles</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Quality: We offer products that meet the highest standards quality.
        </li>
        <li>
          Service: Our team is dedicated to providing service to the exceptional
          client.
        </li>
        <li>
          Innovation: We continually look for ways to improve and offer
          innovative products.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Contact us</h2>
      <p>
        If you have any questions or comments, please don't hesitate to get in
        touch with us through our contact form. We are here to help you!
      </p>
      <button
        onClick={handleContactClick}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Contact Us
      </button>
    </div>
  );
};

export default About;
