import React, { useState } from 'react';
import {Link} from 'react-router-dom';
const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    companyName: '',
    age: 0,
    distanceFromHome: 0,
    environmentSatisfaction: '',
    gender: '',
    jobInvolvement: '',
    jobLevel:0,
    jobSatisfaction: '',
    maritalStatus: '',
    monthlyIncome:0,
    numCompaniesWorked: 0,
    overTime: '',
    percentSalaryHike: 0,
    performanceRating: '',
    stockOptionLevel: 0,
    totalWorkingYears: 0,
    trainingTimesLastYear:0,
    workLifeBalance:'',
    yearsAtCompany: 0,
    yearsInCurrentRole: 0,
    yearsSinceLastPromotion: 0,
    yearsWithCurrManager: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(formData);
    try {
      const response = await fetch('http://localhost:3001/api/addemployees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Employee data sent successfully:', data);
alert("employee info added successfully");
setFormData({
  employeeName: '',
  companyName: '',
  age: 0,
  distanceFromHome: 0,
  environmentSatisfaction: 0,
  gender: 0,
  jobInvolvement: 0,
  jobLevel: 0,
  jobSatisfaction: 0,
  maritalStatus: 0,
  monthlyIncome: 0,
  numCompaniesWorked: 0,
  overTime: 0,
  percentSalaryHike: 0,
  performanceRating: 0,
  stockOptionLevel: 0,
  totalWorkingYears: 0,
  trainingTimesLastYear: 0,
  workLifeBalance: 0,
  yearsAtCompany: 0,
  yearsInCurrentRole: 0,
  yearsSinceLastPromotion: 0,
  yearsWithCurrManager: 0,
});
        // Optionally, you can redirect or perform other actions after a successful submission
      } else {
        console.error('Failed to send employee data');
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch or other errors
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="p-8 rounded shadow-md w-full max-w-screen-md bg-gray-800">
      <h2 className="text-3xl font-semibold mb-4">Employee Form</h2>

        <form onSubmit={handleSubmit} className="w-full">
        <label className="block text-gray-300 text-sm font-bold mb-2">
            Employee Name:
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
          </label>

          <label className="block text-gray-300 text-sm font-bold mb-2">
            Company Name:
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Age:
            <input
              type="range"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              required
              max="100"
              className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.age}
          </label>

          <label className="block text-gray-300 text-sm font-bold mb-2">
            Distance From Home:
            <input
              type="range"
              name="distanceFromHome"
              value={formData.distanceFromHome}
              onChange={handleChange}
              required
              min="0"
              max="200"
              
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.distanceFromHome}
          </label>

          <label className="block text-gray-300 text-sm font-bold mb-2">
            Environment Satisfaction:
            <select
              name="environmentSatisfaction"
              value={formData.environmentSatisfaction}
              onChange={handleChange}
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            >
              <option value="">Select</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
              <option value="4">Very High</option>
            </select>
          </label>

          <label className="block text-gray-300 text-sm font-bold mb-2">
            Gender:
            <div className="flex">
              <label className="mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="0"
                  checked={formData.gender === '0'}
                  onChange={handleChange}
                 
                  className="mr-1  mt-1"
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  checked={formData.gender === '1'}
                  onChange={handleChange}
                  className="mr-1  mt-1"
                />
                Male
              </label>
            </div>
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Job Involvement:
            <select
              name="jobInvolvement"
              value={formData.jobInvolvement}
              onChange={handleChange}
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            >
              <option value="">Select</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
              <option value="4">Very High</option>
            </select>
          </label>

          <label className="block text-gray-300 text-sm font-bold mb-2">
          Job Level:
            <input
              type="range"
              name="jobLevel"
              value={formData.jobLevel}
              onChange={handleChange}
              required
              min="0"
              max="200"
              
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.jobLevel}
          </label>

          <label className="block text-gray-300 text-sm font-bold mb-2">
            Job Satisfaction:
            <select
              name="jobSatisfaction"
              value={formData.jobSatisfaction}
              onChange={handleChange}
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            >
              <option value="">Select</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
              <option value="4">Very High</option>
            </select>
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Marital Status:
            <div className="flex">
              <label className="mr-2">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="1"
                  checked={formData.maritalStatus === '1'}
                  onChange={handleChange}
                  className="mr-1  mt-1"
                />
                Married
              </label>
              <label>
                <input
                  type="radio"
                  name="maritalStatus"
                  value="2"
                  checked={formData.maritalStatus === '2'}
                  onChange={handleChange}
                  className="mr-1  mt-1"
                />
                Single
              </label>
            </div>
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          Monthly Income ($):
            <input
              type="numeric"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Number of Companies Worked in : 
            <input
              type="range"
              name="numCompaniesWorked"
              value={formData.numCompaniesWorked}
              onChange={handleChange}
              required
              min="0"
              max="100"
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.numCompaniesWorked}
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            OverTime:
            <div className="flex">
              <label className="mr-2">
                <input
                  type="radio"
                  name="overTime"
                  value="1"
                  checked={formData.overTime === '1'}
                  onChange={handleChange}
                  className="mr-1  mt-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="overTime"
                  value="2"
                  checked={formData.overTime === '2'}
                  onChange={handleChange}
                  className="mr-1  mt-1"
                />
                No
              </label>
            </div>
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          PercentSalaryHike :
            <input
              type="range"
              name="percentSalaryHike"
              value={formData.percentSalaryHike}
              onChange={handleChange}
              min="0"
              required
              max="100"
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.percentSalaryHike}
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Performance Rating :
            <select
              name="performanceRating"
              value={formData.performanceRating}
              onChange={handleChange}
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            >
              <option value="">Select</option>
              <option value="1">Low</option>
              <option value="2">Good</option>
              <option value="3">Excellent</option>
              <option value="4">Outstanding</option>
            </select>
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          Stock Option Level :
            <input
              type="range"
              name="stockOptionLevel"
              value={formData.stockOptionLevel}
              onChange={handleChange}
              min="0"
              required
              max="3"
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.stockOptionLevel}
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          Total Working Years :
            <input
              type="range"
              name="totalWorkingYears"
              value={formData.totalWorkingYears}
              onChange={handleChange}
              min="0"
              required
              max="100"
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.totalWorkingYears}
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          Training Times LastYear :
            <input
              type="range"
              name="trainingTimesLastYear"
              value={formData.trainingTimesLastYear}
              onChange={handleChange}
              min="0"
              required
              max="6"
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.trainingTimesLastYear}
          </label>

          <label className="block text-gray-300 text-sm font-bold mb-2">
             Worklife Balance :
            <select
              name="workLifeBalance"
              value={formData.workLifeBalance}
              onChange={handleChange}
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            >
              <option value="">Select</option>
              <option value="1">Bad</option>
              <option value="2">Good</option>
              <option value="3">Better</option>
              <option value="4">Best</option>
            </select>
          </label>



          <label className="block text-gray-300 text-sm font-bold mb-2">
          Years at Company :
            <input
              type="range"
              name="yearsAtCompany"
              value={formData.yearsAtCompany}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.yearsAtCompany}
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          Years in current role :
            <input
              type="range"
              name="yearsInCurrentRole"
              value={formData.yearsInCurrentRole}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.yearsInCurrentRole}
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          Years since last promotion:
            <input
              type="range"
              name="yearsSinceLastPromotion"
              value={formData.yearsSinceLastPromotion}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.yearsSinceLastPromotion}
          </label>
          <label className="block text-gray-300 text-sm font-bold mb-2">
          Years with current manager :
            <input
              type="range"
              name="yearsWithCurrManager"
              value={formData.yearsWithCurrManager}
              onChange={handleChange}
              min="0"
              required
              max="100"
              className="w-full px-3 py-2  mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gray-600"
            />
            {formData.yearsWithCurrManager}
          </label>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white mt-4"
          >
            Submit
          </button> 
          <Link to="/" className="text-sm text-gray-300 hover:text-gray-400 ml-2">
    Back to Home
  </Link>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
