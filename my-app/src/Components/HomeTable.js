import React, { useState } from "react";

const HomeTable = (props) => {
  const headers = [
    "getAttr",
    "__id",
    "EmployeeName",
    "CompanyName",
    "Age",
    "DistanceFromHome",
    "EnvironmentSatisfaction",
    "Gender",
    "JobInvolvement",
    "JobLevel",
    "JobSatisfaction",
    "MaritalStatus",
    "MonthlyIncome",
    "NumCompaniesWorked",
    "OverTime",
    "PercentSalaryHike",
    "PerformanceRating",
    "StockOptionLevel",
    "TotalWorkingYears",
    "TrainingTimesLastYear",
    "WorkLifeBalance",
    "YearsAtCompany",
    "YearsInCurrentRole",
    "YearsSinceLastPromotion",
    "YearsWithCurrManager",
    "_v",
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [EmpAtrr, setEmpAtrr] = useState({});
  const openModal = async (item) => {
    setModalOpen(true);
    setEmpAtrr(await handleGetButtonClick(item));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleGetButtonClick = async (rowData) => {
    try {
      console.log(rowData);
      const response = await fetch("http://localhost:3001/api/getAttrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rowData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from Node.js server:", data);
        return data;
      } else {
        console.error(
          "Failed to connect to Node.js server:",
          response.statusText
        );
      }
      openModal();
    } catch (error) {
      console.error("Error connecting to Node.js server:", error.message);
      return error.message;
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [llmresp, setllmresp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  const handleSaveInput = async () => {
    const requestBody = {
      model: "tinydolphin:1.1b-v2.8-fp16",
      prompt:
        "You are an assistant to HR manager in a comapny answer any question which is related to budgeting, analysis and human relations for HR. This is the question:" +
        inputValue +
        ".",
      stream: true,
    };

    setllmresp(null);

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // if (response.ok) {
      //   const data = await response.json();
      //   console.log("Response:", data.response);
      //   setllmresp(data.response);
      // } else {
      //   console.error("Failed to fetch");
      // }
      const reader = response.body.getReader();
      let loopRunner = true;
      const decoder = new TextDecoder();
      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        const parsedlines = JSON.parse(decodedChunk)['response']
        setllmresp(res=>res+parsedlines);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-200 text-white flex flex-col px-10 ">
      <div className="px-4 py-4 -mx-40 overflow-x-scroll sm:-mx-8 sm:px-8 ">
        <table className="inline-block min-w-full overflow-hidden rounded-lg shadow ">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.props.map((item, i) => (
              <tr key={i} className="text-gray-900 whitespace-no-wrap">
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <button
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-full"
                    onClick={() => openModal(item)}
                  >
                    Get
                  </button>
                </td>
                {Object.values(item).map((value, index) => (
                  <td
                    key={index}
                    className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    {typeof value === "number"
                      ? value
                      : value === 1
                      ? "Male"
                      : value === 0
                      ? "Female"
                      : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="text-4xl font-bold text-center mt-8 mb-12 text-black">
        Leverage Large Language Models to Solve HR Challenges
      </h1>
      <div className="flex flex-col items-center justify-center py-10">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter something..."
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 text-lg text-black w-3/5"
        />
        <button
          onClick={handleSaveInput}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {isLoading ? "Loading..." : "Ask"}
        </button>
      </div>
      <div className="text-black bg-gray-300 p-5 rounded-lg">{llmresp!=='' && llmresp}{llmresp==='' && <div className="text-black text-center">Ask any question so that our LLM can respond with correct solution. Ask any HR senarios and get solution or explanation from out finetuned llm</div>}</div>
      {/* <button onClick={()=>{loopRunner=false}} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" disabled={!isLoading} >Stop </button> */}
      {isModalOpen && (
        // <div className="fixed inset-0 flex items-center justify-center z-50">
        //   <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        //   <div className="bg-white p-8 rounded-lg z-50">
        //     {EmpAtrr && (
        //       <p className="text-lg text-gray-800">{EmpAtrr.data === 1 ? "The person will stay in the company." : "The person will not stay in the company."}</p>
        //     )}
        //     <button className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70 cursor-not-allowed rounded-lg " onClick={closeModal}>OK</button>
        //   </div>
        // </div>

        <div class="dark:bg-white fixed inset-0 flex items-center justify-center z-50">
          <div class="text-center">
            <div class="flex flex-col justify-between h-full">
              <svg
                class="w-12 h-12 m-auto mt-4 text-green-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <p class="px-6 py-2 text-black text-black text-md">
                {EmpAtrr && (
                  <p className="text-lg text-gray-800">
                    {EmpAtrr.data === 1
                      ? "The person will stay in the company."
                      : "The person will not stay in the company."}
                  </p>
                )}
              </p>
              <div class="flex items-center justify-between w-full gap-4 mt-8">
                <button
                  type="button"
                  class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTable;
