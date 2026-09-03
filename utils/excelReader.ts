import * as XLSX from "xlsx";
import path from "path";

export interface ApiTestCase {
    srNo: number;
    module: string;
    testCaseId: string;
    scenario: string;
    method: string;
    endpointUrl: string;
    headers: string;
    requestBodyParams: string;
    expectedStatusCode: string;
    expectedResult: string;
    actualResult: string;
    status: string;
    remarks: string;
}

const excelPath = path.resolve(
    __dirname,
    "../test-data/API_Testing_Automation_TestCases.xlsx"
);

export function getTestCase(testCaseId: string): ApiTestCase {

    // Read Excel workbook
    const workbook = XLSX.readFile(excelPath);

    // Get required worksheet
    const sheetName = "API Test Cases";
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        throw new Error(
            `Excel sheet "${sheetName}" was not found`
        );
    }

    // Convert worksheet into JSON.
    // The actual header row is row 3 in Excel,
    // therefore skip the first 2 rows.
    const rows: any[] = XLSX.utils.sheet_to_json(
        worksheet,
        {
            range: 2,
            defval: ""
        }
    );

    // Find requested test case
    const testCase = rows.find(
        (row: any) =>
            String(row["Test Case ID"]).trim() === testCaseId
    );

    if (!testCase) {

        console.log("\nAvailable Test Case IDs:");

        rows.forEach((row: any) => {
            console.log(
                row["Test Case ID"]
            );
        });

        throw new Error(
            `Test Case "${testCaseId}" was not found in Excel`
        );
    }

    return {
        srNo: Number(testCase["Sr No"]),

        module: String(
            testCase["Module"] || ""
        ),

        testCaseId: String(
            testCase["Test Case ID"] || ""
        ),

        scenario: String(
            testCase["API Name / Scenario"] || ""
        ),

        method: String(
            testCase["Method"] || ""
        ),

        endpointUrl: String(
            testCase["Endpoint URL"] || ""
        ),

        headers: String(
            testCase["Headers"] || ""
        ),

        requestBodyParams: String(
            testCase["Request Body / Params"] || ""
        ),

        expectedStatusCode: String(
            testCase["Expected Status Code"] || ""
        ),

        expectedResult: String(
            testCase["Expected Result"] || ""
        ),

        actualResult: String(
            testCase["Actual Result"] || ""
        ),

        status: String(
            testCase["Status (Pass/Fail)"] || ""
        ),

        remarks: String(
            testCase["Remarks"] || ""
        )
    };
}