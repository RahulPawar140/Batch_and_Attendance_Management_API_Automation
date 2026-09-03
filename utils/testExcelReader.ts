import { getTestCase } from "./excelReader";

const testCase = getTestCase("TC_BAT_004");

console.log("----------------------------------------");
console.log("Excel Test Case");
console.log("----------------------------------------");

console.log("Test Case ID:", testCase.testCaseId);
console.log("Scenario:", testCase.scenario);
console.log("Method:", testCase.method);
console.log("Endpoint:", testCase.endpointUrl);
console.log("Request Body:", testCase.requestBodyParams);
console.log("Expected Status:", testCase.expectedStatusCode);
console.log("Expected Result:", testCase.expectedResult);

console.log("----------------------------------------");