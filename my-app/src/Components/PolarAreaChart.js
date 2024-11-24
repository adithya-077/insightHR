import React from 'react'
import { PolarArea } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function PolarAreaChart({polarareadata}) {
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
        for (let index = 0; index < polarareadata.length; index++) {
           
          if(dictionary[polarareadata[index]]>0)
          {
            dictionary[polarareadata[index]]++;
          }
          else{
            dictionary[polarareadata[index]]=1;
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
        // const options = {
        //   maintainAspectRatio: false,
        //   width: 600, // Increase the width
        //   height: 600, // Increase the height
          
        
        // };
        
        //console.log("dictionary",dictionary);
        const options = {
          maintainAspectRatio: false,
          width: 600, // Increase the width
          height: 600, // Increase the height
          
        
        };
         const data = {
          datasets: [{
              data: dataarray,
              backgroundColor: colorsArray,
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: labelarray
      };
       
        
          return (
            <div>
               <PolarArea data={data} options={options}/>
               </div>
          )
        }
        