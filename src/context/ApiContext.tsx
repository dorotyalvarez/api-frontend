// ApiContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ApiContextProps {
  children: ReactNode;
}

interface ApiContextValue {
  products: any[] | null;
  updateProducts: (newProducts: any[]) => void;
  eliminarProducto: (productId: number) => void; // Agrega la propiedad eliminarProducto
  
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export const ApiProvider: React.FC<ApiContextProps> = ({ children }) => {
  const [products, setProducts] = useState<any[] | null>(null);

  const updateProducts = (newProducts: any[]) => {
    setProducts(newProducts);
  };

  const eliminarProducto = (productId: number) => {
    // Lógica para eliminar el producto
    // ...
  };

  const value: ApiContextValue = {
    products,
    updateProducts,
    eliminarProducto, // Agrega la propiedad eliminarProducto
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApiContext = (): ApiContextValue => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApiContext debe ser utilizado dentro de un ApiProvider');
  }

  return context;
};
