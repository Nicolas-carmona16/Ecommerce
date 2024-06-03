import React from "react";

const DataPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Data Processing Policy</h1>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
        <p>
          At xyz style, we are committed to protecting and respecting the
          privacy of our users. This Data Processing Policy describes how we
          collect, use, protect, and share your personal information when you
          visit and use our website and the services offered on it.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h3>
        <p>We may collect and process the following types of personal data:</p>
        <ul className="list-disc list-inside ml-5">
          <li>
            <strong>Identification Data:</strong> name, lastname, email address,
            postal address, address.
          </li>
          <li>
            <strong>Registration Data:</strong> information provided when
            creating an account, such as name, email and password.
          </li>
          <li>
            <strong>Payment Data:</strong> credit or debit card details, billing
            information.
          </li>
          <li>
            <strong>Communication Data:</strong> content of emails, messages,
            and other communications you have with us.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">3. Use of Information</h3>
        <p>We use the collected information for the following purposes:</p>
        <ul className="list-disc list-inside ml-5">
          <li>
            <strong>Service Provision:</strong> processing your orders, managing
            your account, and providing customer support.
          </li>
          <li>
            <strong>Site Improvement:</strong> analyzing Site usage to improve
            our services and user experience.
          </li>
          <li>
            <strong>Marketing and Communications:</strong> sending you
            promotions, offers, and updates about our products and services,
            provided you have given your consent.
          </li>
          <li>
            <strong>Legal Compliance:</strong> complying with our legal
            obligations and responding to legal requests.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          4. Sharing of Information
        </h3>
        <p>We may share your personal information with:</p>
        <ul className="list-disc list-inside ml-5">
          <li>
            <strong>Service Providers:</strong> third parties that help us
            operate our business, such as payment processors, web hosting
            services, and analytics providers.
          </li>
          <li>
            <strong>Legal Authorities:</strong> in compliance with the law, to
            protect our rights, property, or the safety of our users and the
            public.
          </li>
          <li>
            <strong>Affiliates and Business Partners:</strong> with your
            consent, for joint marketing and promotional purposes.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">5. Information Security</h3>
        <p>
          We implement appropriate technical and organizational security
          measures to protect your personal data against unauthorized access,
          alteration, disclosure, or destruction. However, no data transmission
          over the Internet is entirely secure, and we cannot guarantee the
          absolute security of information transmitted through the Site.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">6. Your Rights</h3>
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc list-inside ml-5">
          <li>
            <strong>Access:</strong> you can request access to your personal
            data that we hold.
          </li>
          <li>
            <strong>Rectification:</strong> you can request the correction of
            inaccurate or incomplete personal data.
          </li>
          <li>
            <strong>Deletion:</strong> you can request the deletion of your
            personal data, subject to certain conditions.
          </li>
          <li>
            <strong>Restriction:</strong> you can request the restriction of the
            processing of your personal data under certain circumstances.
          </li>
          <li>
            <strong>Portability:</strong> you can request the transfer of your
            personal data to another entity.
          </li>
          <li>
            <strong>Objection:</strong> you can object to the processing of your
            personal data in certain circumstances.
          </li>
        </ul>
        <p>To exercise these rights, please contact us at [Email Address].</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          7. Changes to This Policy
        </h3>
        <p>
          We reserve the right to update this Data Processing Policy at any
          time. We will notify you of any changes by posting the new policy on
          the Site and, if applicable, through a notice on your account or via
          email. Your continued use of the Site after such modifications
          constitutes your acceptance of the new Policy.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">8. Contact</h3>
        <p>
          If you have any questions or concerns about this Data Processing
          Policy or our privacy practices, please contact us.
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

export default DataPolicy;
