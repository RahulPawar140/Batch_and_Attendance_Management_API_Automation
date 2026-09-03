# Batch & Attendance Management API Automation

An Excel-driven API Test Automation Framework built using TypeScript, Cucumber BDD, Axios, and Node.js for testing the Batch & Attendance Management APIs.

The framework supports data-driven API testing, reusable API utilities, Cucumber BDD scenarios, automated assertions, and HTML test reporting.

## 🚀 Project Overview

This project automates REST API testing for a Batch & Attendance Management system.

The framework reads test cases and test data from an Excel sheet and executes API requests based on the test case configuration.

It validates:

- HTTP response status codes
- API responses
- Request payloads
- Expected results
- Actual results
- Positive and negative API scenarios

## 🛠️ Tech Stack

- TypeScript
- Node.js
- Cucumber BDD
- Axios
- Excel / XLSX
- dotenv
- Git & GitHub
- Cucumber HTML Reporter
- Multiple Cucumber HTML Reporter

## 📌 API Modules Covered

- Batch
- Branch
- Course
- Faculty
- Manager
- Student
- User

## ✨ Key Features

### Excel-Driven Testing

Test cases are maintained in an Excel file instead of hardcoding test data inside the step definitions.

Excel file:

`test-data/API_Testing_Automation_TestCases.xlsx`

The Excel sheet contains:

- Sr No
- Module
- Test Case ID
- API Name / Scenario
- Method
- Endpoint URL
- Headers
- Request Body / Params
- Expected Status Code
- Expected Result
- Actual Result
- Status
- Remarks

### Cucumber BDD

The framework uses Cucumber feature files to describe API test scenarios in a readable format.

Example:

```gherkin
Scenario: Get Batch by ID
  Given I read test case "TC_BAT_001" from Excel
  When I send the API request
  Then the response status code should match the expected status code
