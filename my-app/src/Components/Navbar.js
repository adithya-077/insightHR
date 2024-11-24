
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    function logout()
    {
        localStorage.clear();
        window.location.href="/";
    }
  return (
    <nav className="bg-white p-4">
      <ul className="flex space-x-4 text-black">
        <li>
          <Link to="/home" className="hover:text-gray">Home</Link>
        </li>
        <li>
          <Link to="/pdf" className="hover:text-gray">Jobs</Link>
        </li>
        <li>
          <Link to="/visualization" className="hover:text-gray">Visualization</Link>
        </li>
        <li>
          <button onClick={logout}  className="hover:text-gray">Logout</button>
        </li>
      </ul> 
    </nav>
  );
};

export default Navbar;
