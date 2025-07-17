// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Dummy products for demo
    const dummyProducts = [
      { name: "Wireless Earbuds", price: 1299 },
      { name: "Bluetooth Speaker", price: 1799 },
      { name: "Smart LED Bulb", price: 599 },
      { name: "Power Bank 10000mAh", price: 899 },
      { name: "Laptop Stand", price: 1099 },
      { name: "USB-C Hub", price: 1499 },
    ];
    setTimeout(() => setProducts(dummyProducts), 500);

    // ✅ Get user email from localStorage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setUserEmail(storedEmail);
    } else {
      console.warn("No email found in localStorage. Please log in.");
    }
  }, []);

  const handleBuy = async (product) => {
    if (!userEmail) {
      alert("Please log in to proceed with the payment.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/payments/create-checkout-session', {
        product: product.name,
        price: product.price,
        email: userEmail
      });

      const sessionId = res.data.id;
      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>🛍️ Available Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.map((product, i) => (
          <div key={i} style={{
            border: '1px solid #ccc',
            padding: '20px',
            width: '250px',
            borderRadius: '8px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <button
              onClick={() => handleBuy(product)}
              style={{
                background: '#27ae60',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
