const { PdfDocument } = require("@ironsoftware/ironpdf");
const axios = require("axios");

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Product = require("./models/user");
const connectDB = require("./DB/connect");
const { MongoClient } = require("mongodb");
const session = require("express-session");
const bodyparser = require("body-parser");
const multer = require("multer");
const pdf = require("pdf-parse");
const upload = multer();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("db connected");
    app.listen(3001, (req, res) => {
      console.log("Server is listening on 3001");
    });
  } catch (e) {
    console.log(e);
  }
};
start();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "",
    resave: true,
    saveUninitialized: true,
  })
);
app.post("/pdf", upload.single("pdf"), async (req, res) => {
  try {
    const buffer = req.file.buffer;

    // Use pdf-parse to extract text from the PDF buffer
    const data = await pdf(buffer);

    // Extracted text content
    const fileContent = data.text;

    const { reqStr } = req.body;
    const requestBody = {
      reqStr,
    };

    console.log(fileContent);

    // const fastApiEndpoint = "http://127.0.0.1:8000/resumeSkillext";
    // const response = await axios.post(fastApiEndpoint, fileContent,{
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // Send a response back to the client
    res.json({ success: true, content: fileContent });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.post("/employeetabledata", async (req, res) => {
  const companyName = req.body.companyName;
  const response = await Product.model3.find({ companyName: companyName });
  return res.json(response);
});

app.post("/api/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Product.model2.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    if (user != null) {
      console.log("not null");
      return res.json({
        success: true,
        user: user.email,
        company: user.company,
      });
    }

    return res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    console.log(req.body);

    const user = await Product.model2.create({
      email: req.body.email,
      password: req.body.password,
      company: req.body.company,
    });

    res.send({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    res.send({ success: false });
  }
});
app.post("/api/addemployees", async (req, res) => {
  try {
    console.log(req.body);
    // Create a new employee instance using the Employee model
    const newEmployee = new Product.model3(req.body);

    // Save the employee to the database
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getdropdownforpiechart", async (req, res) => {
  try {
    let documents = await Product.model4.find();
    return res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getdataforfilter", async (req, res) => {
  try {
    // Retrieve the desired column (assuming it's not '_id')
    const desiredColumn = req.body.filter || "productName"; // Use a default if not provided

    let data = await Product.model3.find({}); // Correct projection

    // If you need a flat array of values:
    const values = data.map((obj) => obj[desiredColumn]);
    // console.log(values);

    return res.json(data); // Return the filtered data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const convertToIntegers = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      convertToIntegers(obj[key]);
    } else if (!isNaN(obj[key])) {
      obj[key] = parseInt(obj[key]);
    }
  }
};
const transformKeys = (originalData) => {
  const keyMapping = {
    age: "Age",
    distanceFromHome: "DistanceFromHome",
    environmentSatisfaction: "EnvironmentSatisfaction",
    gender: "Gender",
    jobInvolvement: "JobInvolvement",
    jobLevel: "JobLevel",
    jobSatisfaction: "JobSatisfaction",
    maritalStatus: "MaritalStatus",
    monthlyIncome: "MonthlyIncome",
    numCompaniesWorked: "NumCompaniesWorked",
    overTime: "OverTime",
    percentSalaryHike: "PercentSalaryHike",
    performanceRating: "PerformanceRating",
    stockOptionLevel: "StockOptionLevel",
    totalWorkingYears: "TotalWorkingYears",
    trainingTimesLastYear: "TrainingTimesLastYear",
    workLifeBalance: "WorkLifeBalance",
    yearsAtCompany: "YearsAtCompany",
    yearsInCurrentRole: "YearsInCurrentRole",
    yearsSinceLastPromotion: "YearsSinceLastPromotion",
    yearsWithCurrManager: "YearsWithCurrManager",
  };

  const transformedData = {};
  for (const key in originalData) {
    if (keyMapping.hasOwnProperty(key)) {
      transformedData[keyMapping[key]] = originalData[key];
    }
  }
  return transformedData;
};

app.post("/api/getAttrition", async (req, res) => {
  try {
    const { _id, employeeName, companyName, __v, ...filteredBody } = req.body;
    convertToIntegers(filteredBody);
    console.log(filteredBody);

    const transformedData = transformKeys(filteredBody);

    const fastApiEndpoint = "http://127.0.0.1:8000/GetAttrition";
    const response = await axios.post(fastApiEndpoint, transformedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    res.status(201).json({
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
