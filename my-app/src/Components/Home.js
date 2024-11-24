import React, { useEffect, useState } from 'react'
import HomeTable from './HomeTable';

export default function Home() {
  const[EmployeeArray,setEmployeeArray]=useState([]);
  
  async function getdata()
  {
    const response = await fetch("http://localhost:3001/employeetabledata", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName:localStorage.getItem("company")
      }),
   });
    const emparray=await response.json();
    setEmployeeArray(prev=>([...emparray]))

  }
  useEffect(()=>{
    getdata();

  },[])

  return (
    <div className='h-[100vh]'>
    <HomeTable props={EmployeeArray} /> 
    </div>
  )
}
 