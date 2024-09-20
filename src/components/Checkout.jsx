import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, quantities, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleCheckout = () => {
    if(isFormValid) {
      alert('Your order has been placed. Thank you for the purchase!');
      navigate('/');
    } 
  };

  useEffect(() => {
    if (address.trim() && paymentMethod) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [address, paymentMethod]);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price.slice(1) * quantities[product.id], 0
  );

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cart.map((product) => (
          <div key={product.id} style={{ borderBottom: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
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
          </div>
        ))}
      </div>
      <div>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>

      <div>
        <h3>Address Information</h3>
        <textarea value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          style={{ padding: '10px', width: '100%' }}>
        </textarea>
        {!address.trim() && <p style={{ color: 'red' }}>Address is required</p>}
      </div>

      <div>
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === 'cash'}
            required
            onChange={() => setPaymentMethod('cash')}
          />
          Cash on Delivery
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            value="card"
            required
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          Credit/Debit Card
        </label>
        {!paymentMethod && <p style={{ color: 'red' }}>Payment method is required</p>}
      </div>

      <button onClick={handleCheckout} style={{ margin: '20px', padding: '10px' }}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
