import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);

  // ၁။ Backend API ထံမှ Data လှမ်းယူမည့် Function
  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/metrics');
      setMetrics(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Data ယူရာတွင် အမှားအယွင်းရှိနေပါသည်:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // ၂။ Form မှတစ်ဆင့် Data အသစ်လှမ်းထည့်မည့် Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !value) return alert("ကျေးဇူးပြု၍ အချက်အလက်အားလုံး ဖြည့်စွက်ပါ");

    try {
      await axios.post('http://localhost:5000/api/metrics', {
        title,
        value: Number(value)
      });
      setTitle('');
      setValue('');
      fetchMetrics(); // Data အသစ်ဝင်သွားပါက ဇယားကိုချက်ချင်း Update ဖြစ်စေရန်
    } catch (error) {
      console.error("Data ထည့်ရာတွင် အမှားအယွင်းရှိနေပါသည်:", error);
    }
  };

  // ၃။ Dashboard အတွက် အခြေခံကိန်းဂဏန်းများ တွက်ချက်ခြင်း
  const totalValue = metrics.reduce((sum, item) => sum + item.value, 0);
  const avgValue = metrics.length ? (totalValue / metrics.length).toFixed(2) : 0;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ color: '#222', marginBottom: '25px', textAlign: 'center' }}>📊 Real-time MERN Dashboard</h1>
      
      {/* ကိန်းဂဏန်းပြကတ်များ (Metric Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #007bff' }}>
          <h3 style={{ margin: 0, color: '#777', fontSize: '14px', textTransform: 'uppercase' }}>စုစုပေါင်း အမျိုးအစား</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#007bff' }}>{metrics.length} ခု</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #28a745' }}>
          <h3 style={{ margin: 0, color: '#777', fontSize: '14px', textTransform: 'uppercase' }}>စုစုပေါင်း တန်ဖိုး</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#28a745' }}>{totalValue}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #dc3545' }}>
          <h3 style={{ margin: 0, color: '#777', fontSize: '14px', textTransform: 'uppercase' }}>ပျမ်းမျှ တန်ဖိုး</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#dc3545' }}>{avgValue}</p>
        </div>
      </div>

      {/* အောက်ခြေအပိုင်း (Form နှင့် Chart) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* ဒေတာအသစ်ထည့်ရန် Form */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>➕ ဒေတာအသစ်ထည့်သွင်းရန်</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>ခေါင်းစဉ် (Title)</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ဥပမာ - January Sales, Users"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>တန်ဖိုး ကိန်းဂဏန်း (Value)</label>
              <input 
                type="number" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                placeholder="ဥပမာ - 4500"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
              ဒေတာသိမ်းဆည်းမည်
            </button>
          </form>
        </div>

        {/* Chart ပြသရန် နေရာ */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minHeight: '350px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>📈 ဒေတာပြဇယား (Data Visualization)</h3>
          {loading ? (
            <p>ဒေတာများဆွဲယူနေပါသည်...</p>
          ) : metrics.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', marginTop: '50px' }}>ပြသရန် ဒေတာမရှိသေးပါ။ ဘယ်ဘက်မှ ဒေတာ စတင်ထည့်သွင်းပါ။</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="title" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#007bff" name="တန်ဖိုး" radius={[4, 4, 0, 0]} />
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