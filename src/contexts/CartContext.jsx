import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : {
      1: [
        { id: 1, title: 'iPhone 16 Pro Max', specifications: '128GB, Black', price: '$999', image: '../src/assets/images/iphone16.jpg' },
        { id: 2, title: 'Samsung S24 Ultra', specifications: '256GB, White', price: '$799', image: '../src/assets/images/samsungS24Ultra.jpg' },
      ],
      2: [
        { id: 3, title: 'Dell XPS 13', specifications: '8GB RAM, 256GB SSD', price: '$1199', image: '../src/assets/images/dell.jpg' },
        { id: 4, title: 'MacBook Air', specifications: 'M1, 512GB SSD', price: '$1299', image: '../src/assets/images/macbook.jpg' },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: 1, 
    }));
  };

  const addNewProduct = (newProduct) => {
    const category = newProduct.category;
    const product = {
      id: Date.now(),
      title: newProduct.title,
      specifications: newProduct.specifications,
      price: `$${newProduct.price}`,
      image: newProduct.image
    };

    setProducts((prevProducts) => ({
      ...prevProducts,
      [category]: [...(prevProducts[category] || []), product]
    }));
  };

  const incrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };
  
  const decrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 0),
    }));
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, products, addNewProduct, quantities, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
  