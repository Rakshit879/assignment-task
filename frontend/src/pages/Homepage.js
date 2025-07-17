import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const ADMIN_EMAILS = ["grakshit430@gmail.com"];

function Homepage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      localStorage.setItem("user", JSON.stringify(decoded));
      localStorage.setItem("email", decoded.email);

      if (ADMIN_EMAILS.includes(decoded.email)) {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  const handleLoginError = () => {
    alert("Login Failed!");
  };

  return (
    <GoogleOAuthProvider clientId="700439214754-qg2r6mp27fgnfcobksibq04dm2tatn6i.apps.googleusercontent.com">
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f6f8',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '40px 60px',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '28px',
            marginBottom: '10px',
            color: '#2c3e50'
          }}>
            🚀 Welcome to Our E-Commerce App
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#7f8c8d',
            marginBottom: '30px'
          }}>
            Please sign in with your Google account to continue.
          </p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            theme="filled_blue"
            size="large"
            width="100%"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Homepage;
