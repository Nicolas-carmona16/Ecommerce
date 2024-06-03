import { createContext, useEffect, useState } from "react";
import React from 'react';

//  Context
export const ProductContext = createContext();



const ProductProvider = ({children}) => {
  //products state
  const [products, setProducts] = useState([])
  //Fetch Product
  useEffect(()=>{
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  
  
  return <ProductContext.Provider value={{products}}>{children}</ProductContext.Provider>
};

export default ProductProvider;
