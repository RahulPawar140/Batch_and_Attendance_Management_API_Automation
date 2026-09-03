import {
    Given,
    When,
    Then,
    Before
} from "@cucumber/cucumber";

import assert from "assert";

import { StudentApi } from "../api/studentApi";
import {
    getTestCase,
    ApiTestCase
} from "../utils/excelReader";


// ============================================================
// VARIABLES
// ============================================================

let studentApi: StudentApi;

// Current Excel test case
let studentTestCase: ApiTestCase | undefined;

// API response
let studentResponse: any;

// Temporary student ID used for DELETE
let temporaryStudentId: number | undefined;

// Student ID extracted from Excel
let studentId: number;


// ============================================================
// BEFORE HOOK
// ============================================================

Before(
    {
        tags: "@STU023 or @STU024 or @STU025 or @STU026"
    },
    function () {

        studentApi = new StudentApi();

        // Reset variables for every scenario
        studentTestCase = undefined;
        studentResponse = undefined;
        temporaryStudentId = undefined;
        studentId = 0;

        console.log("========================================");
        console.log("Student API Test Started");
        console.log("========================================");
    }
);


// ============================================================
// LOAD TEST CASE FROM EXCEL
// ============================================================

Given(
    "I load Student test case {string} from Excel",
    function (testCaseId: string) {

        studentTestCase = getTestCase(testCaseId);

        assert.ok(
            studentTestCase,
            `Test Case "${testCaseId}" was not found in Excel`
        );

        console.log("========================================");
        console.log(
            `Test Case ID: ${studentTestCase.testCaseId}`
        );
        console.log(
            `Scenario: ${studentTestCase.scenario}`
        );
        console.log(
            `Method: ${studentTestCase.method}`
        );
        console.log(
            `Endpoint: ${studentTestCase.endpointUrl}`
        );
        console.log("========================================");
    }
);


// ============================================================
// TC_STU_023
// GET STUDENT BY ID
// ============================================================

When(
    "I send a GET Student request for Excel test case {string}",
    async function (testCaseId: string) {

        // Load test case from Excel
        studentTestCase = getTestCase(testCaseId);

        assert.ok(
            studentTestCase,
            `Test Case "${testCaseId}" was not found in Excel`
        );

        const endpoint =
            studentTestCase.endpointUrl;

        console.log(
            `Endpoint from Excel: ${endpoint}`
        );

        // ========================================================
        // STUDENT ID
        // ========================================================

        // TC_STU_023 requires Student ID = 2
        studentId = 2;

        console.log(
            `Student ID used for API request: ${studentId}`
        );

        // ========================================================
        // SEND GET REQUEST
        // ========================================================

        studentResponse =
            await studentApi.getStudent(
                studentId
            );

        // ========================================================
        // PRINT RESPONSE
        // ========================================================

        console.log(
            "\nGET Student Response:"
        );

        console.log(
            JSON.stringify(
                studentResponse.data,
                null,
                2
            )
        );
    }
);


// ============================================================
// TC_STU_024
// GET STUDENT LIST
// ============================================================

When(
    "I send a GET Student List request for Excel test case {string}",
    async function (testCaseId: string) {

        studentTestCase = getTestCase(testCaseId);

        assert.ok(
            studentTestCase,
            `Test Case "${testCaseId}" was not found in Excel`
        );

        const endpoint =
            studentTestCase.endpointUrl;

        console.log(
            `Endpoint from Excel: ${endpoint}`
        );

        const url = new URL(endpoint);

        const params = {

            page_index: Number(
                url.searchParams.get("page_index")
            ),

            page_size: Number(
                url.searchParams.get("page_size")
            ),

            sort_by:
                url.searchParams.get("sort_by") || "",

            sort_order:
                url.searchParams.get("sort_order") || "",

            search_text:
                url.searchParams.get("search_text") || ""
        };

        console.log(
            "\nParameters read from Excel:"
        );

        console.log(
            JSON.stringify(
                params,
                null,
                2
            )
        );

        studentResponse =
            await studentApi.getStudentList(params);

        console.log(
            "\nGET Student List Response:"
        );

        console.log(
            JSON.stringify(
                studentResponse.data,
                null,
                2
            )
        );
    }
);


// ============================================================
// TC_STU_025
// CREATE STUDENT
// ============================================================

When(
    "I send a POST Student request for Excel test case {string}",
    async function (testCaseId: string) {

        studentTestCase = getTestCase(testCaseId);

        assert.ok(
            studentTestCase,
            `Test Case "${testCaseId}" was not found in Excel`
        );

        let requestBody: any =
            studentTestCase.requestBodyParams;

        // Handle JSON string from Excel
        if (typeof requestBody === "string") {

            try {

                requestBody =
                    JSON.parse(requestBody);

            } catch (error) {

                throw new Error(
                    `Invalid JSON request body for ${testCaseId}: ${requestBody}`
                );
            }
        }

        console.log(
            "\nRequest Body read from Excel:"
        );

        console.log(
            JSON.stringify(
                requestBody,
                null,
                2
            )
        );

        studentResponse =
            await studentApi.createStudent(
                requestBody
            );

        console.log(
            "\nCREATE Student Response:"
        );

        console.log(
            JSON.stringify(
                studentResponse.data,
                null,
                2
            )
        );

        // Store generated student ID
        if (
            studentResponse.data &&
            studentResponse.data.data &&
            studentResponse.data.data.id
        ) {

            temporaryStudentId =
                Number(
                    studentResponse.data.data.id
                );

            console.log(
                `Created Student ID: ${temporaryStudentId}`
            );
        }
    }
);


// ============================================================
// TC_STU_026
// CREATE TEMPORARY STUDENT FOR DELETE
// ============================================================

// ============================================================
// TC_STU_026
// CREATE UNIQUE TEMPORARY STUDENT FOR DELETE
// ============================================================

When(
    "I create a temporary Student for DELETE testing",
    { timeout: 30000 },
    async function () {

        // Generate unique values for every test execution
        const timestamp = Date.now();

        const temporaryStudent = {

            first_name:
                "API Automation Delete",

            last_name:
                "Test Student",

            mobile:
                `9${String(timestamp).slice(-9)}`,

            alternate_mobile:
                `8${String(timestamp).slice(-9)}`,

            email:
                `api.delete.student.${timestamp}@gmail.com`,

            remarks:
                "Temporary student created for DELETE API automation testing",

            dob:
                "2007-08-22"
        };

        console.log(
            "\nTemporary Student Request Body:"
        );

        console.log(
            JSON.stringify(
                temporaryStudent,
                null,
                2
            )
        );

        const response =
            await studentApi.createStudent(
                temporaryStudent
            );

        studentResponse = response;

        console.log(
            "\nCREATE Temporary Student Response:"
        );

        console.log(
            JSON.stringify(
                response.data,
                null,
                2
            )
        );

        // Check whether API actually created the student
        if (!response.data?.data?.id) {

            const apiMessage =
                response.data?.data?.message ||
                response.data?.error ||
                "Unknown error";

            throw new Error(
                `Temporary Student creation failed: ${apiMessage}`
            );
        }

        // Store generated student ID
        temporaryStudentId =
            Number(
                response.data.data.id
            );

        console.log(
            `Temporary Student ID: ${temporaryStudentId}`
        );
    }
);


// ============================================================
// DELETE TEMPORARY STUDENT
// ============================================================

When(
    "I delete the temporary Student",
    {
        timeout: 20000
    },
    async function () {

        // Make sure temporary Student ID exists
        assert.ok(
            temporaryStudentId,
            "Temporary Student ID is not available"
        );

        console.log(
            "\n========================================"
        );

        console.log(
            `Deleting Student ID: ${temporaryStudentId}`
        );

        console.log(
            "========================================"
        );

        try {

            // Send DELETE request
            studentResponse =
                await studentApi.deleteStudent(
                    temporaryStudentId
                );

            // Print response
            console.log(
                "\nDELETE Student Response:"
            );

            console.log(
                JSON.stringify(
                    studentResponse.data,
                    null,
                    2
                )
            );

            console.log(
                "\nDELETE HTTP Status:",
                studentResponse.status
            );

        } catch (error: any) {

            console.log(
                "\n========================================"
            );

            console.log(
                "DELETE STUDENT REQUEST FAILED"
            );

            console.log(
                "========================================"
            );

            console.log(
                "Student ID:",
                temporaryStudentId
            );

            console.log(
                "Endpoint:",
                `/students/delete_student/${temporaryStudentId}`
            );

            console.log(
                "Error:",
                error?.message || error
            );

            if (error?.response) {

                console.log(
                    "HTTP Status:",
                    error.response.status
                );

                console.log(
                    "Response:",
                    JSON.stringify(
                        error.response.data,
                        null,
                        2
                    )
                );
            }

            console.log(
                "========================================"
            );

            // Fail the Cucumber step
            throw error;
        }
    }
);

// ============================================================
// STATUS CODE VALIDATION
// ============================================================

Then(
    "the student response status code should match Excel",
    function () {

        assert.ok(
            studentTestCase,
            "Excel test case data is not available"
        );

        const expectedStatus =
            Number(
                String(
                    studentTestCase.expectedStatusCode
                ).match(/\d+/)?.[0]
            );

        const actualStatus =
            studentResponse.status;

        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatus}`
        );

        console.log(
            `Actual HTTP Status Code: ${actualStatus}`
        );

        assert.strictEqual(
            actualStatus,
            expectedStatus,
            `Expected status ${expectedStatus}, but received ${actualStatus}`
        );
    }
);


// ============================================================
// STUDENT DETAILS VALIDATION
// ============================================================

Then(
    "the student details should be returned successfully",
    function () {

        assert.ok(
            studentResponse.data,
            "Student response body is empty"
        );

        assert.strictEqual(
            studentResponse.data.status,
            "success",
            "Student API did not return success status"
        );

        assert.ok(
            Array.isArray(
                studentResponse.data.data
            ),
            "Student data is not an array"
        );

        assert.ok(
            studentResponse.data.data.length > 0,
            "No student details were returned"
        );

        console.log(
            "Student details verified successfully."
        );
    }
);


// ============================================================
// STUDENT LIST VALIDATION
// ============================================================

Then(
    "the student list should be returned successfully",
    function () {

        assert.ok(
            studentResponse.data,
            "Student list response body is empty"
        );

        assert.strictEqual(
            studentResponse.data.status,
            "success",
            "Student List API did not return success status"
        );

        assert.ok(
            Array.isArray(
                studentResponse.data.data
            ),
            "Student list data is not an array"
        );

        console.log(
            `Student list contains ${studentResponse.data.data.length} record(s).`
        );
    }
);


// ============================================================
// CREATE STUDENT VALIDATION
// ============================================================

Then(
    "the student should be created successfully",
    function () {

        assert.ok(
            studentResponse.data,
            "Create Student response body is empty"
        );

        assert.strictEqual(
            studentResponse.data.status,
            "success",
            "Create Student API did not return success status"
        );

        assert.ok(
            studentResponse.data.data,
            "Created Student data is missing"
        );

        // If API returns a duplicate message even with HTTP 200,
        // treat it as a failed creation.
        if (
            studentResponse.data.data.message
        ) {

            throw new Error(
                `Student creation failed: ${studentResponse.data.data.message}`
            );
        }

        assert.ok(
            studentResponse.data.data.id,
            "Created Student ID is missing"
        );

        console.log(
            `Student created successfully with ID: ${studentResponse.data.data.id}`
        );
    }
);


// ============================================================
// DELETE VALIDATION
// ============================================================

Then(
    "the student should be deleted successfully",
    function () {

        assert.ok(
            studentResponse.data,
            "Delete Student response body is empty"
        );

        assert.strictEqual(
            studentResponse.data.status,
            "success",
            "Delete Student API did not return success status"
        );

        assert.strictEqual(
            studentResponse.data.data.msg,
            "Student Deleted Successfully",
            "Unexpected delete success message"
        );

        console.log(
            "Student deleted successfully."
        );
    }
);


// ============================================================
// VERIFY DELETED STUDENT
// ============================================================

Then(
    "the deleted Student should not be retrievable",
    { timeout: 30000 },
    async function () {

        assert.ok(
            temporaryStudentId,
            "Temporary Student ID is not available"
        );

        console.log(
            `\nGetting deleted Student ID: ${temporaryStudentId}`
        );

        const response =
            await studentApi.getStudent(
                temporaryStudentId
            );

        console.log(
            "\nGET Deleted Student Response:"
        );

        console.log(
            JSON.stringify(
                response.data,
                null,
                2
            )
        );

        assert.strictEqual(
            response.status,
            200,
            "GET deleted Student request did not return 200"
        );

        assert.ok(
            Array.isArray(
                response.data.data
            ),
            "Deleted Student response data is not an array"
        );

        assert.strictEqual(
            response.data.data.length,
            0,
            "Deleted Student is still retrievable"
        );

        console.log(
            "Deleted Student verification passed."
        );
    }
);