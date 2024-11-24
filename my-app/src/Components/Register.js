// Register.js

import React, { useState } from 'react';
import {Link} from 'react-router-dom';
const Register = () => {
  const [email, setEmail] = useState('');
  const [company, setcompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleRegister = (event) => {
    // Password match validation
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    // Clear the error when passwords match
    setPasswordMatchError(false);

    // Add your registration logic here
   registeruser(event);
  };
  async function registeruser (event){
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/register', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
    company
  }),
});

if (response.status===200) {
  // Handle success
  const data = await response.json();
  console.log(data.success);
if(data.success===true)
{
  window.location.href="/login"
}
else{
  alert("already existing user")
}
} else {
  // Handle error
  const data = await response.json();
  console.error(data);

  // Check specific conditions for error handling
  if (response.status === 400 && data.success === false) {
    alert("User already exists");
  } else {
    alert("An error occurred");
  }
}

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 rounded shadow-md w-96 bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="company">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
            placeholder="Enter your company name"
            value={company}
            required
            onChange={(e) => setcompany(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${passwordMatchError ? 'border-red-500' : ''}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            required
            id="confirmPassword"
            className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${passwordMatchError ? 'border-red-500' : ''}`}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordMatchError && (
            <p className="text-red-500 text-sm mt-1">Password and Confirm Password must match.</p>
          )}
        </div>
        <button
          className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
          onClick={handleRegister}
        >
          Register
        </button>
        <Link to="/login" className="text-sm text-gray-300 hover:text-gray-400 ml-2">
    Already have an account? Login
  </Link>
      </div>
    </div>
  );
};

export default Register;
