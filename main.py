import random
import string
import warnings
from fastapi import FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-large")
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-large")


class EmpDetails(BaseModel):
    Age : int
    DistanceFromHome: int
    EnvironmentSatisfaction : int
    Gender : int
    JobInvolvement : int
    JobLevel: int
    JobSatisfaction : int
    MaritalStatus : int
    MonthlyIncome : int
    NumCompaniesWorked : int 
    OverTime : int 
    PercentSalaryHike : int
    PerformanceRating : int
    StockOptionLevel : int 
    TotalWorkingYears : int
    TrainingTimesLastYear: int
    WorkLifeBalance  : int 
    YearsAtCompany : int 
    YearsInCurrentRole : int 
    YearsSinceLastPromotion : int 
    YearsWithCurrManager : int

class resumeDetails(BaseModel):
    Jobs:str
    applicantDetails:str

class resumeSkillCls(BaseModel):
    rawResume:str

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/GetAttrition")
async def root(empdetail: EmpDetails):
    ip = np.array([empdetail.Age, empdetail.DistanceFromHome, empdetail.EnvironmentSatisfaction, empdetail.Gender,
                   empdetail.JobInvolvement, empdetail.JobLevel, empdetail.JobSatisfaction, empdetail.MaritalStatus,
                   empdetail.MonthlyIncome, empdetail.NumCompaniesWorked, empdetail.OverTime, empdetail.PercentSalaryHike,
                   empdetail.PerformanceRating, empdetail.StockOptionLevel, empdetail.TotalWorkingYears,
                   empdetail.TrainingTimesLastYear, empdetail.WorkLifeBalance, empdetail.YearsAtCompany,
                   empdetail.YearsInCurrentRole, empdetail.YearsSinceLastPromotion, empdetail.YearsWithCurrManager],dtype='int32')
    
    model = joblib.load('./best_attrition_model') 
    res = model.predict(ip.reshape(1, -1))
    return  res.item()

@app.post("/resumeMatch")
async def root(resDetails: resumeDetails):
    prompt = f'''
    Pick a best job from 'jobs available' by comparing the 'Applicants skill' with the skill required by the job. Return only the job name as the output.
    RULES:
    1) 'jobs available' is a dictionary with job name as key and skills as value.
    2) 'Applicants skill' is a list which has the skills known by the applicant.
    3) Match the skill in the 'jobs avalilable' and skills in the 'Applicants skills'.
    4) Pick best job for the applicant using only the skills.
    5) Return only the job name.

    jobs available: 
    {resDetails.Jobs}

    Applicants skill:
    {resDetails.applicantDetails}
    '''
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs)
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)

@app.post("/resumeSkillext")
async def root(resSkillobj: resumeSkillCls):
    prompt = f'''
    Pick only the 'skills' from 'resume'. Skills are the programming language name, framework name or any other tools name. Return all the text which is followed by Skills headning.
    RULES:
    1) 'resume' contain the raw resume as text.
    2) Pick only the skill know by the person under 'Skills' section.
    3) Return all the text under Skills section as a array seperated by ','.
    4) these are the list of skills which you have to look for in the resume :['python', 'java', 'javascript', 'react', 'node.js', machine learning, data analysis', 'tensorflow', 'numpy','marketing', 'social media', 'digital marketing', 'analytics', 'communication','ui/ux design', 'adobe photoshop', 'sketch', 'user experience', 'wireframing','product management', 'project management', 'agile methodology', 'leadership',TypeScript,Postgres,"Hibernate", "Node.js","Express","React.js","Angular","Spring","HTML","CSS","Object-Oriented Programming (OOP)","Firebase","TensorFlow","LaTeX"]

    resume: 
    {resSkillobj.rawResume}
    '''
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs)
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)



@app.get("/hello")
async def root():
    return 'hello'