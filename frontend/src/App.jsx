import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);

  // မှတ်ချက်။ ။ "https://your-backend-app.vercel.app/api/metrics" နေရာတွင် သင်၏ Vercel Backend Link ကို ထည့်ပါ။
  const API_URL = "https://your-backend-app.vercel.app/api/metrics"; 

  const fetchMetrics = async () => {
    try {
      const response = await axios.get(API_URL);
      setMetrics(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !value) return alert("Please fill in all fields");

    try {
      await axios.post(API_URL, {
        title,
        value: Number(value)
      });
      setTitle('');
      setValue('');
      fetchMetrics();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const totalValue = metrics.reduce((sum, item) => sum + item.value, 0);
  const avgValue = metrics.length ? (totalValue / metrics.length).toFixed(2) : 0;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ color: '#222', marginBottom: '25px', textAlign: 'center' }}>📊 Real-time MERN Dashboard</h1>
      
      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #007bff' }}>
          <h3 style={{ margin: 0, color: '#777', fontSize: '14px', textTransform: 'uppercase' }}>Total Items</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#007bff' }}>{metrics.length}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #28a745' }}>
          <h3 style={{ margin: 0, color: '#777', fontSize: '14px', textTransform: 'uppercase' }}>Total Value</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#28a745' }}>{totalValue}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #dc3545' }}>
          <h3 style={{ margin: 0, color: '#777', fontSize: '14px', textTransform: 'uppercase' }}>Average Value</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#dc3545' }}>{avgValue}</p>
        </div>
      </div>

      {/* Form & Chart Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Add Data Form */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>➕ Add New Data</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., January Sales, Users"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>Value</label>
              <input 
                type="number" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., 4500"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
              Save Data
            </button>
          </form>
        </div>

        {/* Data Chart */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minHeight: '350px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>📈 Data Visualization</h3>
          {loading ? (
            <p>Loading data...</p>
          ) : metrics.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', marginTop: '50px' }}>No data available yet. Please add data from the left form.</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="title" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#007bff" name="Value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;