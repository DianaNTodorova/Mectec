import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export interface BasketItem extends Product {
  quantity: number;
}

interface BasketContextType {
  basketItems: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

interface BasketProviderProps {
  children: ReactNode;
}

export const BasketProvider = ({ children }: BasketProviderProps) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const addToBasket = (product: Product) => {
    setBasketItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add to basket with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromBasket = (productId: number) => {
    setBasketItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(productId);
    } else {
      setBasketItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return basketItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const value: BasketContextType = {
    basketItems,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    getTotalItems,
    getTotalAmount,
    clearBasket,
  };

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  );
};