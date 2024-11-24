
import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Landing from './Components/Landing';
import EmployeeForm from './Components/EmployeeForm';
import Pdf from './Components/Pdf';
import Visualization from './Components/Visualization';

function App() {
  return (
    <>
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<><Landing/></>} />
      <Route path="/register" element={  localStorage.getItem("user")!=null?<><Navbar/><Home/></>: <Register/>} /> 
      <Route path="/login" element={localStorage.getItem("user")!=null?<><Navbar/><Home/></>:<><Login/></>} />
      <Route path="/home" element={localStorage.getItem("user")!=null?<><Navbar/><Home/></>:<Login/>} /> 
      <Route path="/employeeform" element={<><EmployeeForm/></>} />
      <Route path="/pdf" element={localStorage.getItem("user")!=null?<><Navbar/><Pdf/></>:<Login/>} />
      <Route path="/visualization" element={localStorage.getItem("user")!=null?<><Navbar/><Visualization
      /></>:<Login/>} />
    </Routes>
  </BrowserRouter>
  </>
  );
}
export default App;
