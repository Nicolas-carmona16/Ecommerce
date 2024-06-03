import React, {createContext, useState} from 'react';
//Create context
export const SidebarContext = createContext()

const SidebarProvider = ({children}) => {
  // Sider state
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  
  return(
  <SidebarContext.Provider value={{isOpen, setIsOpen, handleClose}}>
    {children}
  </SidebarContext.Provider>
  );
};

export default SidebarProvider;
