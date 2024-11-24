import React from "react";
import { useState } from "react";
export default function Pdf() {
  const [file, setFile] = useState(null);
  const [fileContent, setfileContent] = useState('');
  const [t5resp, sett5resp] = useState();
  const [isLoading,setisLoading] = useState(false);

  function Card({ title, skills }) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4 m-2">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <ul className="list-disc ml-6">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }

  const data = {
    "Software Engineer": ["python", "java", "javascript", "react", "node.js"],
    "Data Scientist": [
      "python",
      "machine learning",
      "data analysis",
      "tensorflow",
      "numpy",
    ],
    "Marketing Manager": [
      "marketing",
      "social media",
      "digital marketing",
      "analytics",
      "communication",
    ],
    "UI/UX Designer": [
      "ui/ux design",
      "adobe photoshop",
      "sketch",
      "user experience",
      "wireframing",
    ],
    "Product Manager": [
      "product management",
      "project management",
      "agile methodology",
      "communication",
      "leadership",
    ],
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      
      const response = await fetch("http://localhost:3001/pdf", {
        method: "POST",
        body: formData,
      });

      // Handle the response from the server
      const result = await response.json();
      console.log(result);
      setfileContent(result);
      
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSaveInput = async () => {
    // You can perform any additional processing here if needed
    const requestBody = {
      Jobs: "{'Software Engineer': ['python', 'java', 'javascript', 'react', 'node.js'],'Data Scientist': ['python', 'machine learning', 'data analysis', 'tensorflow', 'numpy'],'Marketing Manager': ['marketing', 'social media', 'digital marketing', 'analytics', 'communication'],'UI/UX Designer': ['ui/ux design', 'adobe photoshop', 'sketch', 'user experience', 'wireframing'],'Product Manager': ['product management', 'project management', 'agile methodology', 'communication', 'leadership']}",

      applicantDetails: inputValue,
    };
    
    try {
      setisLoading(true);
      const response = await fetch("http://127.0.0.1:8000/resumeMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        sett5resp(data);
      } else {
        console.error("Failed to fetch");
      }
      setisLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-10 border-thin bg-gray-200 ">
      <div className="rounded-md p-2 bg-gray-300">
        
        <div className="text-black bg-gray-300 p-5 rounded-lg">{fileContent!=='' && fileContent.content}{fileContent==='' && <div className="text-black text-center">Upload your resume and see preview.</div>}</div>

      </div>

      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col items-center justify-center py-10 w-full">
          <input
            type="file"
            accept=".pdf"
            class="py-2 px-5 bg-gray-300 rounded-md mr-2"
            onChange={handleFileChange}
          />
          <button
            className="py-2 px-5 m-2 bg-blue-500 text-white rounded-md"
            onClick={handleUpload}
          >
            Upload
          </button>

          <div className="flex flex-col items-center justify-center py-10 w-full">
            <h1 className="text-2xl font-semibold text-center mt-8 mb-4">
              Enter proficient skills as a list. Example: [ python, java, excel
              ]
            </h1>

            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter you most proficient skills."
              className="border border-gray-300 rounded-md px-5 py-2 focus:outline-none focus:border-blue-500 text-lg text-black w-3/5"
            />
            <button
              onClick={handleSaveInput}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {isLoading ? "Loading..." : "Ask"}
            </button>
            <div className="text-red p-10 ">
              <div className="text-2xl font-semibold text-center mt-8 mb-4 text-green-500">
                {t5resp &&
                  "The job which was matched for the given resume and known skill is: " +
                    t5resp}
              </div>

              <h1 className="text-2xl font-semibold text-center mt-8 mb-4">
                Jobs available in the portal
              </h1>
              <div className="container mx-auto p-4 flex flex-wrap justify-center">
                {Object.entries(data).map(([title, skills]) => (
                  <Card key={title} title={title} skills={skills} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
