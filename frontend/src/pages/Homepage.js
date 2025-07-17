import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import for latest version
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const ADMIN_EMAILS = ["grakshit430@gmail.com"];

function Homepage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      // ✅ Store entire user object
      localStorage.setItem("user", JSON.stringify(decoded));

      // ✅ Store just the email (used in ProductPage)
      localStorage.setItem("email", decoded.email);

      // Redirect based on admin status
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
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Welcome to the App</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Homepage;
