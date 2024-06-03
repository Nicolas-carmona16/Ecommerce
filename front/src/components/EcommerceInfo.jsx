import React from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "../img/bg_hero.svg";
import MainImage from "../img/man.png";

const EcommerceInfo = () => {
  return (
    <section
      className="h-[800px] bg-no-repeat bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className="flex items-center uppercase mb-4">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>
            <div className="font-semibold">Trendy</div>
          </div>
          <h1 className="text-[70px] leading-[1.1] font-light mb-4">
            XYZ Style <br />
            <span className="font-semibold">New Collection</span>
          </h1>
          <Link
            to="/login"
            className="text-[30px] self-start uppercase font-semibold border-b-2 hover:text-red-400 mb-4"
          >
            Login Now!
          </Link>
          <Link
            to="/register"
            className="text-[30px] self-start uppercase font-semibold border-b-2 hover:text-red-400"
          >
            Register Now!
          </Link>
        </div>
        <div className="hidden lg:block">
          <img src={MainImage} alt="Ecommerce Store" className="rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default EcommerceInfo;
