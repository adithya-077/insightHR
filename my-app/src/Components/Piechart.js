import React from "react";
import { Pie } from "react-chartjs-2";
export default function Piechart({ piedata }) {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const numberOfDataPoints = 10; // Adjust as needed
  const colorsArray = Array.from(
    { length: numberOfDataPoints },
    getRandomColor
  );
  let dictionary = {};
  for (let index = 0; index < piedata.length; index++) {
    if (dictionary[piedata[index]] > 0) {
      dictionary[piedata[index]]++;
    } else {
      dictionary[piedata[index]] = 1;
    }
  }
  let dataarray = [];
  let labelarray = [];
  for (let key in dictionary) {
    dataarray.push(dictionary[key]);
    labelarray.push(key + "");
  }
  const options = {
    maintainAspectRatio: false,
    width: 600, // Increase the width
    height: 600, // Increase the height
  };

  // console.log("dictionary",dictionary);
  const data = {
    datasets: [
      {
        data: dataarray,
        backgroundColor: colorsArray,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: labelarray,
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-96 h-96">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
