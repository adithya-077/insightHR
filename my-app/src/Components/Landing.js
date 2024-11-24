// LandingPage.js

import React from 'react';
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome!</h1>
        <p className="text-lg mb-8">Are you a HR or an Employee?</p>
        <div className="flex space-x-4">
         <Link to='/login'> <button className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">HR</button></Link>
          <Link to="/employeeform"><button className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Employee</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
