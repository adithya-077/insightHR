const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const loginModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
  const registerModel = new mongoose.Schema({
    email: {
      type: String,
    
      unique:true,
  
    },
    password: {
      type: String,
      unique:false,
    
    },
    company:{
      type:String,
      unique:false,
    
    }
  });
  const employeeSchema = new mongoose.Schema({
    employeeName: String,
    companyName: String,
    age: Number,
    distanceFromHome: Number,
    environmentSatisfaction: Number,
    gender: Number,
    jobInvolvement: Number,
    jobLevel: Number,
    jobSatisfaction: Number,
    maritalStatus: Number,
    monthlyIncome: Number,
    numCompaniesWorked: Number,
    overTime: Number,
    percentSalaryHike: Number,
    performanceRating: Number,
    stockOptionLevel: Number,
    totalWorkingYears: Number,
    trainingTimesLastYear: Number,
    workLifeBalance: Number,
    yearsAtCompany: Number,
    yearsInCurrentRole: Number,
    yearsSinceLastPromotion: Number,
    yearsWithCurrManager: Number,
  });
  const Barchart_filter_mapping  = new mongoose.Schema({
    age: String,
    distanceFromHome: String,
    environmentSatisfaction: String,
    gender: String,
    jobInvolvement: String,
    jobLevel: String,
    jobSatisfaction: String,
    maritalStatus: String,
    monthlyIncome: String,
    numCompaniesWorked: String,
    overTime: String,
    percentSalaryHike: String,
    performanceRating: String,
    stockOptionLevel: String,
    totalWorkingYears: String,
    trainingTimesLastYear: String,
    workLifeBalance: String,
    yearsAtCompany: String,
    yearsInCurrentRole: String,
    yearsSinceLastPromotion: String,
    yearsWithCurrManager: String,
  });
  
 
const model1 = mongoose.model("loginmodel", loginModel);
const model2=mongoose.model("registermodel",registerModel);
const model3 = mongoose.model('Employee', employeeSchema);
const model4 = mongoose.model('Barchart_filter_mapping', Barchart_filter_mapping);
module.exports = { model1,model2,model3,model4};
