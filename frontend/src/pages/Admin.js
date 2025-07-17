import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const adminEmail = "grakshit430@gmail.com";
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Redirect if user is not logged in or not admin
    if (!user || user.email !== adminEmail) {
      navigate("/");
      return;
    }

    // Fetch payment data
    axios.get('http://localhost:5000/api/payments/all')
      .then(res => setPayments(res.data))
      .catch(err => console.log(err));
  }, [user, navigate]);

  return (
    <div style={{
      padding: '30px',
      background: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2d3436', marginBottom: '20px' }}>📋 Admin Dashboard</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>User Email</th>
            <th style={{ padding: '12px' }}>Product</th>
            <th style={{ padding: '12px' }}>Amount</th>
            <th style={{ padding: '12px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{p.userEmail}</td>
              <td>{p.product}</td>
              <td style={{ color: '#27ae60' }}>₹{p.amount}</td>
              <td>{new Date(p.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
