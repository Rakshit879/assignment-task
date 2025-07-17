import React from 'react';

function Success() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f7ec, #f0fff5)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        animation: 'fadeIn 0.8s ease-in-out'
      }}>
        <div style={{
          fontSize: '64px',
          color: '#27ae60',
          marginBottom: '20px',
          animation: 'popIn 0.5s ease'
        }}>
          ✅
        </div>
        <h2 style={{
          fontSize: '28px',
          color: '#2ecc71',
          marginBottom: '12px'
        }}>
          Payment Successful! 🎉
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#34495e'
        }}>
          Thank you for your purchase. You’ll receive a confirmation email shortly.
        </p>
      </div>

      {/* Add simple animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Success;
