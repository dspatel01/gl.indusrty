import React, { useState } from 'react';
import axios from 'axios';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8080/api/admin/users', { username, password }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('User created successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <form onSubmit={createUser} className="bg-white p-6 rounded shadow-md w-1/2">
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Create User</button>
      </form>
    </div>
  );
};


export default Signup;
