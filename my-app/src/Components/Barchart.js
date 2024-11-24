import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Colors } from 'chart.js';


export default function Barchart({bardata}) {
  //  console.log("bardata",bardata);
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const numberOfDataPoints = 10; // Adjust as needed
  const colorsArray = Array.from({ length: numberOfDataPoints }, getRandomColor);
    let dictionary={}
    for (let index = 0; index < bardata.length; index++) {
       
      if(dictionary[bardata[index]]>0)
      {
        dictionary[bardata[index]]++;
      }
      else{
        dictionary[bardata[index]]=1;
      }
    }
    let dataarray=[]
    let labelarray=[]
    for(let key in dictionary)
    {
      dataarray.push(dictionary[key])
      labelarray.push(key+"");
    }
    // console.log("dataarray",dataarray);
    // console.log("labelarray",labelarray);
    const options = {
      maintainAspectRatio: false,
      width: 600, // Increase the width
      height: 600, // Increase the height
      plugins: {
        legend: {
          display: false,
        },
      },
    
    };
    
    //console.log("dictionary",dictionary);
     const data= {
        datasets: [{
            barPercentage: 0.5,
            data: dataarray,
            backgroundColor: colorsArray,
        }],
        labels: labelarray
    };
    
      return (
        <div>
          <Bar data={data} options={options}/>
        </div>
      )
    }
    