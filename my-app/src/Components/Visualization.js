import React, { useEffect, useState } from "react";
import Piechart from "./Piechart";
import Barchart from "./Barchart";
import PolarAreaChart from "./PolarAreaChart";
export default function Visualization() {
  const [piechartdataarray, setPiechartDataArray] = useState([]);
  const [barchartdataarray, setBarchartDataArray] = useState([]);
  const [polarareachartdataarray, setPolarAreachartDataArray] = useState([]);
  let pieparent;
  let barparent;
  let polarareaparent;
  async function dropdowndata() {
    const response = await fetch(
      "http://localhost:3001/getdropdownforpiechart"
    );
    const data = await response.json();
    const mydataobj = data[0];

    for (let key in mydataobj) {
      if (key === "_id") {
        continue;
      }
      const value = mydataobj[key];

      let pieelement = document.createElement("option");
      pieelement.innerHTML = value.toString().toUpperCase();
      pieelement.value = value.toString();
      pieparent.appendChild(pieelement);
      let barelement = document.createElement("option");
      barelement.innerHTML = value.toString().toUpperCase();
      barelement.value = value.toString();
      barparent.appendChild(barelement);
      let polarareaelement = document.createElement("option");
      polarareaelement.innerHTML = value.toString().toUpperCase();
      polarareaelement.value = value.toString();
      polarareaparent.appendChild(polarareaelement);
    }
  }

  async function getdropdowndataforpiechart() {
    let filtervalue = document.getElementById("piechartselector").value;

    try {
      const response = await fetch("http://localhost:3001/getdataforfilter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: JSON.stringify(filtervalue),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let datarray = [];

        for (let item of data) {
          if (item.hasOwnProperty(filtervalue.toString())) {
            datarray.push(item[filtervalue.toString()]);
          }
        }

        setPiechartDataArray(datarray);
      } else {
        console.error("Failed to get filter data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getdropdowndataforbarchart() {
    let filtervalue = document.getElementById("barchartselector").value;
    //  console.log(filtervalue);
    try {
      const response = await fetch("http://localhost:3001/getdataforfilter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: JSON.stringify(filtervalue),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let datarray = [];

        for (let item of data) {
          if (item.hasOwnProperty(filtervalue.toString())) {
            datarray.push(item[filtervalue.toString()]);
          }
        }
        // console.log(datarray);
        setBarchartDataArray(datarray);
      } else {
        console.error("Failed to get filter data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function getdropdowndataforpolarareachart() {
    let filtervalue = document.getElementById("polarareachartselector").value;
    //  console.log(filtervalue);
    try {
      const response = await fetch("http://localhost:3001/getdataforfilter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: JSON.stringify(filtervalue),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let datarray = [];

        for (let item of data) {
          if (item.hasOwnProperty(filtervalue.toString())) {
            datarray.push(item[filtervalue.toString()]);
          }
        }
        // console.log(datarray);
        setPolarAreachartDataArray(datarray);
      } else {
        console.error("Failed to get filter data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    document.getElementById("piechartselector")
      ? (pieparent = document.getElementById("piechartselector"))
      : console.log("nothing");
    document.getElementById("barchartselector")
      ? (barparent = document.getElementById("barchartselector"))
      : console.log("nothing");
    document.getElementById("polarareachartselector")
      ? (polarareaparent = document.getElementById("polarareachartselector"))
      : console.log("nothing");
    dropdowndata();
  }, [piechartdataarray, barchartdataarray, polarareachartdataarray]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 p-10">Graph Visualization</h2>
      <div className="mx-auto max-w-4xl p-6 flex flex-col items-center">
        <div className="mb-6 width-full">
          <h2 className="text-xl font-bold mb-2">Pie chart</h2>
          <div className="flex items-center mb-4">
            <select
              id="piechartselector"
              name="piechartselector"
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            >
              <option value="">Select</option>
            </select>
            <button
              onClick={getdropdowndataforpiechart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Load
            </button>
          </div>
          <div className="bg-white h-96 w-full p-10 rounded">
            <Piechart piedata={piechartdataarray} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-6 flex flex-col items-center">
        <div className="mb-6 w-full">
          <h2 className="text-xl font-bold mb-2">Bar chart</h2>
          <div className="flex items-center mb-4">
            <select
              id="barchartselector"
              name="barchartselector"
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            >
              <option value="">Select</option>
            </select>
            <button
              onClick={getdropdowndataforbarchart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Load
            </button>
          </div>
          <div className="bg-white h-full w-full p-10 rounded">
            <Barchart bardata={barchartdataarray} />
          </div>
        </div>
      </div>

      <div className="mx-auto  h-full max-w-4xl p-6 flex flex-col items-center">
        <div className="mb-6 w-full h-full">
          <h2 className="text-xl font-bold mb-2">Polar Area chart</h2>
          <div className="flex items-center mb-4">
            <select
              id="polarareachartselector"
              name="polarareachartselector"
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            >
              <option value="">Select</option>
            </select>
            <button
              onClick={getdropdowndataforpolarareachart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Load
            </button>
          </div>
          <div className="bg-white h-full w-full p-10 rounded">
            <PolarAreaChart polarareadata={polarareachartdataarray} />
          </div>
        </div>
      </div>
    </>
  );
}
