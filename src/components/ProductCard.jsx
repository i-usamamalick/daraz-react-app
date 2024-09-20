import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        margin: '8px',
        width: '200px',
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100%', height: 'auto' }}
      />
      <h2>{product.title}</h2>
      <p>{product.specifications}</p>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
