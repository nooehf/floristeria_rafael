import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../lib/supabase';

interface CartItem extends Product {
  quantity: number;
  selectedPrice?: number;
  selectedLabel?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedPrice?: number, selectedLabel?: string) => void;
  removeFromCart: (productId: number, selectedLabel?: string) => void;
  updateQuantity: (productId: number, quantity: number, selectedLabel?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedPrice?: number, selectedLabel?: string) => {
    const finalPrice = selectedPrice !== undefined ? selectedPrice : product.price;
    const finalLabel = selectedLabel || '';

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id && item.selectedLabel === finalLabel);
      if (existingItem) {
        return currentItems.map(item =>
          (item.id === product.id && item.selectedLabel === finalLabel)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, quantity: 1, selectedPrice: finalPrice, selectedLabel: finalLabel }];
    });
  };

  const removeFromCart = (productId: number, selectedLabel?: string) => {
    setItems(currentItems => currentItems.filter(item => !(item.id === productId && item.selectedLabel === (selectedLabel || ''))));
  };

  const updateQuantity = (productId: number, quantity: number, selectedLabel?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedLabel);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        (item.id === productId && item.selectedLabel === (selectedLabel || '')) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + ((item.selectedPrice !== undefined ? item.selectedPrice : item.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
