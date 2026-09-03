import reporter from "cucumber-html-reporter";
import path from "path";
import fs from "fs";

/*
|--------------------------------------------------------------------------
| Generate Extent-Style HTML Report
|--------------------------------------------------------------------------
|
| This file runs AFTER Cucumber execution.
|
| It reads:
|   reports/cucumber-report.json
|
| And generates:
|   reports/extent-report.html
|
|--------------------------------------------------------------------------
*/

// Path of Cucumber JSON report
const jsonFile = path.resolve(
    __dirname,
    "../reports/cucumber-report.json"
);

// Output path of Extent-style HTML report
const outputFile = path.resolve(
    __dirname,
    "../reports/extent-report.html"
);

/*
|--------------------------------------------------------------------------
| Check whether Cucumber JSON exists
|--------------------------------------------------------------------------
*/

if (!fs.existsSync(jsonFile)) {

    console.error(
        "❌ Cucumber JSON report not found:"
    );

    console.error(jsonFile);

    process.exit(1);
}

/*
|--------------------------------------------------------------------------
| Report Configuration
|--------------------------------------------------------------------------
*/

const options = {

    // Report theme
    theme: "bootstrap",

    // Cucumber JSON file
    jsonFile: jsonFile,

    // Generated HTML report
    output: outputFile,

    // Display each scenario as a test
    reportSuiteAsScenarios: true,

    // Show scenario execution timestamp
    scenarioTimestamp: true,

    // Show failed test summary
    failedSummaryReport: true,

    // Project name
    name: "Batch & Attendance API Automation",

    // Report title
    brandTitle: "API Automation Extent Report",

    // Metadata displayed in the report
    metadata: {

        "Project":
            "Batch & Attendance API Automation",

        "Automation Tool":
            "Cucumber + TypeScript",

        "API Tool":
            "Axios",

        "Test Data":
            "Excel",

        "Test Framework":
            "Cucumber 13.2.1",

        "Environment":
            "Local",

        "Base URL":
            "http://localhost:9998",

        "Platform":
            process.platform,

        "Node Version":
            process.version,

        "Executed":
            new Date().toLocaleString()
    }
};

/*
|--------------------------------------------------------------------------
| Generate Report
|--------------------------------------------------------------------------
*/

reporter.generate(options as any);

/*
|--------------------------------------------------------------------------
| Success Message
|--------------------------------------------------------------------------
*/

console.log("");
console.log("========================================");
console.log("EXTENT REPORT GENERATED SUCCESSFULLY");
console.log("========================================");
console.log("");
console.log(`Report: ${outputFile}`);
console.log("");