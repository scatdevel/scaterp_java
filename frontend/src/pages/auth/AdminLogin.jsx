import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ setAdminAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!username || !password) {
        setError('Please enter both username and password');
        return;
    }

    setLoading(true);
    setError('');

    try {
        const response = await axios.post('http://localhost:8080/admin/login', { username, password }); // Ensure the URL is correct

        if (response.status === 200) {
            setAdminAuthenticated(true); // Set the admin as authenticated
            navigate('/admin-dashboard'); // Redirect to admin dashboard
        } else {
            setError('Invalid credentials');
        }
    } catch (err) {
        setError('An error occurred. Please try again.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/img/farmers1.jpg")' }}
    >
      <div className="login-container p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="flex justify-center mb-4">
          <img src="/img/logo_scat.png" alt="Logo" className="w-24" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
