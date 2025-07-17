import React from 'react';

function Success() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '100px',
      color: '#2ecc71',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ fontSize: '32px' }}>✅ Payment Successful! 🎉</h2>
      <p style={{ fontSize: '18px', color: '#34495e' }}>
        Thank you for your purchase. You’ll receive a confirmation email shortly.
      </p>
    </div>
  );
}

export default Success;
