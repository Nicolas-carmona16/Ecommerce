import React from 'react';

import Img from '../img/man.png';

import {Link} from 'react-router-dom';

const Hero = () => {
  return <section className='bg-pink-200 h-[800px] bg-no-repeat bg-hero bg-cover bg-center py-24'>
    <div className='container mx-auto flex justify-around h-full'>
      <div className='flex flex-col justify-center'>
        <div className='flex items-center uppercase mb-4'>
          <div className='w-10 h-[2px] bg-red-500 mr-3'></div> 
          <div className='font-semibold'>Trendy</div> 
        </div>
        <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
          XYZ STYLE <br/>
          <span className='font-semibold'>NEW COLLECTION</span>
        </h1>
        <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary'>No se que poner aquí</Link>
      </div>
      <div className='hidden lg:block'>
        <img src={Img} alt=''/>
      </div>
    </div>
  </section>;
};

export default Hero;
