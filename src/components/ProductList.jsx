import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const ProductList = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { products, addToCart, quantities, cart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  const categoryProducts = products[id] || [];

  const handleViewCart = () => {
    navigate('/checkout'); 
  };

  return (
    <div>
      <h1>Products</h1>

      {cart.length > 0 && (
        <button onClick={handleViewCart} style={{ margin: '20px', padding: '10px' }}>
          View Cart
        </button>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {categoryProducts.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%' }} />
            <h2>{product.title}</h2>
            <p>{product.specifications}</p>
            <p>{product.price}</p>
            {quantities[product.id] ? (
              <div className="quantity-controls">
                <button onClick={() => decrementQuantity(product.id)}>-</button>
                <input
                  type="number"
                  value={quantities[product.id]}
                  readOnly
                  style={{ width: '40px', textAlign: 'center' }}
                />
                <button onClick={() => incrementQuantity(product.id)}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
