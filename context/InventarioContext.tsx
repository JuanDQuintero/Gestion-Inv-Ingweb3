import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
  } from 'react';
  
  interface InventarioContextProps {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
  }
  
  const InventarioContext = createContext<InventarioContextProps>(
    {} as InventarioContextProps
  );
  
  export const useInventarioContext = () => useContext(InventarioContext);
  
  interface InventarioContextProviderProps {
    children: JSX.Element;
  }
  
  const InventarioContextProvider = ({
    children,
  }: InventarioContextProviderProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);  
    return (
      <InventarioContext.Provider
        value={{
          openModal,
          setOpenModal,
        }}
      >
        {children}
      </InventarioContext.Provider>
    );
  };
  
  export { InventarioContextProvider };
  