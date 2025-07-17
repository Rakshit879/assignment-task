import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const dummyProducts = [
      { name: "Wireless Earbuds", price: 1299 },
      { name: "Bluetooth Speaker", price: 1799 },
      { name: "Smart LED Bulb", price: 599 },
      { name: "Power Bank 10000mAh", price: 899 },
      { name: "Laptop Stand", price: 1099 },
      { name: "USB-C Hub", price: 1499 },
    ];
    setTimeout(() => setProducts(dummyProducts), 500);

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
    <div style={{
      padding: '40px 20px',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #e0f7fa, #f5f5f5)',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '36px',
        marginBottom: '40px',
        color: '#2c3e50'
      }}>
        🛍️ Explore Our Products
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {products.map((product, i) => (
          <div key={i} style={{
            background: '#ffffff',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
            }}
          >
            <h3 style={{ fontSize: '22px', color: '#34495e', marginBottom: '10px' }}>
              {product.name}
            </h3>
            <p style={{ fontSize: '18px', color: '#7f8c8d' }}>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <button
              onClick={() => handleBuy(product)}
              style={{
                background: '#27ae60',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                marginTop: '15px',
                fontSize: '16px',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#219653'}
              onMouseLeave={e => e.currentTarget.style.background = '#27ae60'}
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
