// Login.js


import React, { useState } from 'react';
import {Link} from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    // Add your login logic here

    console.log('Email:', email);
    console.log('Password:', password);
loginuser(event);
  };
  async function loginuser(event) {
    console.log("inside")
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify({
          email,
          password,
       }),
    });
    console.log(response.status);
    if (response.status===200) {
       const data = await response.json();
       console.log(data.success)
       if(data.success===true){

      console.log(data);
      console.log(data.token);
      localStorage.setItem('user',data.user);
      localStorage.setItem('company',data.company);
       window.location.href="/home"
       }
       else{
        alert("wrong password or username");
       }
    } else {
       alert("wrong password or username");
    }
 }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="p-8 rounded shadow-md w-96 bg-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md bg-gray-700 text-black"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800 text-white"
          onClick={(e)=>handleLogin(e)}
        >
          Login
        </button>
        <Link to="/register" className="text-sm text-gray-800 ml-2">
    Dont have an account? Signup
  </Link>
      </div>
    </div>
  );
};

export default Login;
