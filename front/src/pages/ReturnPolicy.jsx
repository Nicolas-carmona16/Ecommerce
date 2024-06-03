import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Purchase and Return Policy</h1>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
        <p>
          At xyz style, we strive to provide our customers with the best
          shopping experience. This Purchase and Return Policy outlines the
          terms and conditions for purchasing and returning products through our
          website.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">2. Purchases</h3>
        <p>
          By placing an order on the Site, you agree to the following terms and
          conditions:
        </p>
        <ul className="list-disc list-inside ml-5">
          <li>
            <strong>Order Confirmation:</strong> After placing an order, you
            will receive an email confirmation. This email confirms that we have
            received your order and are processing it.
          </li>
          <li>
            <strong>Pricing and Availability:</strong> All prices are listed in
            [COP]. We make every effort to ensure the accuracy of the prices and
            availability of products on the Site. However, we reserve the right
            to correct any errors, inaccuracies, or omissions and to change or
            update information at any time without prior notice.
          </li>
          <li>
            <strong>Payment:</strong> We accept card. Payment must be received
            in full before we can process your order. Your credit card or other
            payment method will be charged at the time of purchase.
          </li>
          <li>
            <strong>Shipping:</strong> Shipping costs and delivery times will
            vary based on your location and the shipping method selected. We
            will provide an estimated delivery date when you place your order.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">3. Returns and Refunds</h3>
        <p>
          We want you to be completely satisfied with your purchase. If you are
          not satisfied, you may return the product under the following
          conditions:
        </p>
        <ul className="list-disc list-inside ml-5">
          <li>
            <strong>Return Period:</strong> You have 20 days from the date of
            delivery to return a product.
          </li>
          <li>
            <strong>Condition of Products:</strong> Products must be returned in
            their original condition, unused, and with all original packaging
            and tags attached.
          </li>
          <li>
            <strong>Return Process:</strong> To initiate a return, please
            contact our customer service with your order number and reason for
            the return. We will provide you with instructions on how to return
            the product.
          </li>
          <li>
            <strong>Return Shipping:</strong> You are responsible for the cost
            of return shipping. We recommend using a trackable shipping method
            to ensure the product reaches us safely.
          </li>
          <li>
            <strong>Refunds:</strong> Once we receive and inspect the returned
            product, we will process your refund. Refunds will be issued to the
            original payment method within 8 business days. Please note that
            original shipping costs are non-refundable.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">4. Exchanges</h3>
        <p>
          If you wish to exchange a product, please follow the return process to
          return the original item and place a new order for the desired
          product.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">5. Contact</h3>
        <p>
          If you have any questions or concerns about this Purchase and Return
          Policy or your order, please contact us.
        </p>
      </section>

      <p className="mt-6">
        <strong>XYZ STYLE</strong>
        <br />
        <strong>Date:</strong> {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default ReturnPolicy;
