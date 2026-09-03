import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../utils/world";
import assert from "assert";
import { FacultyApi } from "../api/facultyApi";
import { getTestCase } from "../utils/excelReader";

const facultyApi = new FacultyApi();


// ============================================================
// HELPER FUNCTION
// Extract Faculty ID from Excel endpoint
// ============================================================

function extractFacultyId(endpoint: string): number {

    // Example Excel endpoint:
    //
    // http://localhost:9998/faculties/get_faculty/[faculty_id] eg: 2
    //
    // We extract:
    // 2

    const egMatch = endpoint.match(/eg:\s*(\d+)/i);

    if (egMatch) {

        return Number(egMatch[1]);
    }

    // If "eg:" is not present,
    // try to find numbers from endpoint

    const numbers = endpoint.match(/\d+/g);

    if (numbers && numbers.length > 0) {

        return Number(
            numbers[numbers.length - 1]
        );
    }

    throw new Error(
        `Faculty ID could not be extracted from endpoint: ${endpoint}`
    );
}


// ============================================================
// HELPER FUNCTION
// Extract expected HTTP status code from Excel
// ============================================================

function extractExpectedStatusCode(
    expectedStatusCode: string
): number {

    // Example:
    //
    // "200 OK"
    //
    // becomes:
    //
    // 200

    const match =
        expectedStatusCode.match(/\d+/);

    if (!match) {

        throw new Error(
            `Invalid expected status code from Excel: ${expectedStatusCode}`
        );
    }

    return Number(match[0]);
}


// ============================================================
// FACULTY API SERVICE
// ============================================================

Given(
    "the Faculty API service is available",
    async function (this: CustomWorld) {

        console.log(
            "========================================"
        );

        console.log(
            "Faculty API Test Started"
        );

        console.log(
            "========================================"
        );
    }
);


// ============================================================
// FAC016
// GET FACULTY BY ID
// ============================================================

When(
    "I send a GET Faculty request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // --------------------------------------------------------
        // Read test case from Excel
        // --------------------------------------------------------

        const testCase =
            getTestCase(testCaseId);

        // --------------------------------------------------------
        // Store Excel test case in CustomWorld
        // --------------------------------------------------------

        this.excelTestCase =
            testCase;

        // --------------------------------------------------------
        // Print Excel test case information
        // --------------------------------------------------------

        console.log(
            "========================================"
        );

        console.log(
            `Test Case ID: ${testCase.testCaseId}`
        );

        console.log(
            `Scenario: ${testCase.scenario}`
        );

        console.log(
            `Method: ${testCase.method}`
        );

        console.log(
            `Endpoint: ${testCase.endpointUrl}`
        );

        console.log(
            "========================================"
        );

        // --------------------------------------------------------
        // Extract Faculty ID from Excel endpoint
        // --------------------------------------------------------

        const facultyId =
            extractFacultyId(
                testCase.endpointUrl
            );

        console.log(
            `Faculty ID extracted from Excel: ${facultyId}`
        );

        // --------------------------------------------------------
        // Send GET request
        // --------------------------------------------------------

        this.response =
            await facultyApi.getFaculty(
                facultyId
            );

        // --------------------------------------------------------
        // Print API response
        // --------------------------------------------------------

        console.log(
            "\nGET Faculty Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );
    }
);


// ============================================================
// FAC016
// VERIFY HTTP STATUS CODE FROM EXCEL
// ============================================================

Then(
    "the faculty response status code should match Excel",
    function (this: CustomWorld) {

        // Get current Excel test case
        const testCase =
            this.excelTestCase;

        // Make sure Excel data exists
        assert.ok(
            testCase,
            "Excel test case data is not available"
        );

        // Extract expected status code
        const expectedStatusCode =
            extractExpectedStatusCode(
                testCase.expectedStatusCode
            );

        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatusCode}`
        );

        console.log(
            `Actual HTTP Status Code: ${this.response.status}`
        );

        // Compare expected and actual
        assert.strictEqual(
            this.response.status,
            expectedStatusCode,
            `Expected HTTP status ${expectedStatusCode}, ` +
            `but received ${this.response.status}`
        );
    }
);


// ============================================================
// FAC016
// VERIFY RESPONSE STATUS
// ============================================================

Then(
    'the faculty response status should be "success"',
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.status,
            "success",
            `Expected response status "success", ` +
            `but received "${this.response.data.status}"`
        );
    }
);


// ============================================================
// FAC016
// VERIFY ERROR
// ============================================================

Then(
    "the faculty response error should be null",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.error,
            null,
            "Expected faculty response error to be null"
        );
    }
);


// ============================================================
// FAC016
// VERIFY ERROR CODE
// ============================================================

Then(
    "the faculty response errorCode should be 0",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.errorCode,
            0,
            "Expected faculty response errorCode to be 0"
        );
    }
);


// ============================================================
// FAC016
// VERIFY FACULTY ID
// ============================================================

Then(
    "the faculty response should contain faculty ID from Excel",
    function (this: CustomWorld) {

        // Get Excel test case
        const testCase =
            this.excelTestCase;

        assert.ok(
            testCase,
            "Excel test case data is not available"
        );

        // Extract expected Faculty ID
        const expectedFacultyId =
            extractFacultyId(
                testCase.endpointUrl
            );

        // Get response data
        const faculties =
            this.response.data.data;

        // Verify response data is array
        assert.ok(
            Array.isArray(faculties),
            "Expected faculty response data to be an array"
        );

        // Check Faculty ID
        const facultyExists =
            faculties.some(
                (faculty: any) =>
                    faculty.id === expectedFacultyId
            );

        assert.ok(
            facultyExists,
            `Faculty ID ${expectedFacultyId} was not found in response`
        );
    }
);


// ============================================================
// FAC017
// GET FACULTY LIST
// ============================================================

When(
    "I send a GET Faculty List request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // --------------------------------------------------------
        // Read Excel test case
        // --------------------------------------------------------

        const testCase =
            getTestCase(testCaseId);

        // --------------------------------------------------------
        // Store Excel test case
        // --------------------------------------------------------

        this.excelTestCase =
            testCase;

        // --------------------------------------------------------
        // Print test case details
        // --------------------------------------------------------

        console.log(
            "========================================"
        );

        console.log(
            `Test Case ID: ${testCase.testCaseId}`
        );

        console.log(
            `Scenario: ${testCase.scenario}`
        );

        console.log(
            `Method: ${testCase.method}`
        );

        console.log(
            `Endpoint: ${testCase.endpointUrl}`
        );

        console.log(
            "========================================"
        );

        // --------------------------------------------------------
        // Convert Excel endpoint into URL
        // --------------------------------------------------------

        const url =
            new URL(
                testCase.endpointUrl
            );

        // --------------------------------------------------------
        // Read query parameters from Excel
        // --------------------------------------------------------

        const params = {

            page_index:
                Number(
                    url.searchParams.get(
                        "page_index"
                    )
                ),

            page_size:
                Number(
                    url.searchParams.get(
                        "page_size"
                    )
                ),

            sort_by:
                url.searchParams.get(
                    "sort_by"
                ) || "",

            sort_order:
                url.searchParams.get(
                    "sort_order"
                ) || "",

            search_text:
                url.searchParams.get(
                    "search_text"
                ) || ""
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

        // --------------------------------------------------------
        // Send GET Faculty List request
        // --------------------------------------------------------

        this.response =
            await facultyApi.getFacultyList(
                params
            );

        // --------------------------------------------------------
        // Print response
        // --------------------------------------------------------

        console.log(
            "\nGET Faculty List Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );
    }
);


// ============================================================
// FAC017
// VERIFY HTTP STATUS CODE
// ============================================================

Then(
    "the faculty list response status code should match Excel",
    function (this: CustomWorld) {

        const testCase =
            this.excelTestCase;

        assert.ok(
            testCase,
            "Excel test case data is not available"
        );

        const expectedStatusCode =
            extractExpectedStatusCode(
                testCase.expectedStatusCode
            );

        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatusCode}`
        );

        console.log(
            `Actual HTTP Status Code: ${this.response.status}`
        );

        assert.strictEqual(
            this.response.status,
            expectedStatusCode
        );
    }
);


// ============================================================
// FAC017
// VERIFY STATUS
// ============================================================

Then(
    "the faculty list response status should be success",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.status,
            "success"
        );
    }
);


// ============================================================
// FAC017
// VERIFY ERROR
// ============================================================

Then(
    "the faculty list response error should be null",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.error,
            null
        );
    }
);


// ============================================================
// FAC017
// VERIFY ERROR CODE
// ============================================================

Then(
    "the faculty list response errorCode should be 0",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.errorCode,
            0
        );
    }
);


// ============================================================
// FAC017
// VERIFY SEARCH RESULT
// ============================================================

Then(
    "the faculty list response should contain the Excel search text",
    function (this: CustomWorld) {

        const testCase =
            this.excelTestCase;

        assert.ok(
            testCase,
            "Excel test case data is not available"
        );

        // Read endpoint from Excel
        const url =
            new URL(
                testCase.endpointUrl
            );

        // Get search text
        const searchText =
            url.searchParams.get(
                "search_text"
            ) || "";

        const faculties =
            this.response.data.data;

        assert.ok(
            Array.isArray(faculties),
            "Expected faculty list data to be an array"
        );

        // --------------------------------------------------------
        // Verify search result
        // --------------------------------------------------------

        if (searchText.trim() !== "") {

            const searchLower =
                searchText.toLowerCase();

            const facultyExists =
                faculties.some(
                    (faculty: any) => {

                        const firstName =
                            String(
                                faculty.first_name || ""
                            ).toLowerCase();

                        const lastName =
                            String(
                                faculty.last_name || ""
                            ).toLowerCase();

                        const mobile =
                            String(
                                faculty.mobile || ""
                            ).toLowerCase();

                        const email =
                            String(
                                faculty.email || ""
                            ).toLowerCase();

                        return (
                            firstName.includes(searchLower) ||
                            lastName.includes(searchLower) ||
                            mobile.includes(searchLower) ||
                            email.includes(searchLower)
                        );
                    }
                );

            assert.ok(
                facultyExists,
                `No faculty matched search text "${searchText}"`
            );
        }
    }
);


// ============================================================
// FAC018
// CREATE FACULTY
// ============================================================

When(
    "I send a POST Faculty request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // --------------------------------------------------------
        // Read Excel test case
        // --------------------------------------------------------

        const testCase =
            getTestCase(testCaseId);

        // Store Excel test case
        this.excelTestCase =
            testCase;

        // --------------------------------------------------------
        // Print test case information
        // --------------------------------------------------------

        console.log(
            "========================================"
        );

        console.log(
            `Test Case ID: ${testCase.testCaseId}`
        );

        console.log(
            `Scenario: ${testCase.scenario}`
        );

        console.log(
            `Method: ${testCase.method}`
        );

        console.log(
            `Endpoint: ${testCase.endpointUrl}`
        );

        console.log(
            "========================================"
        );

        // --------------------------------------------------------
        // Parse request body from Excel
        // --------------------------------------------------------

        let facultyData: any;

        try {

            facultyData =
                JSON.parse(
                    testCase.requestBodyParams
                );

        } catch (error) {

            throw new Error(
                `Unable to parse Faculty request body from Excel.\n` +
                `Request Body: ${testCase.requestBodyParams}`
            );
        }

        console.log(
            "\nRequest Body read from Excel:"
        );

        console.log(
            JSON.stringify(
                facultyData,
                null,
                2
            )
        );

        // --------------------------------------------------------
        // Send POST request
        // --------------------------------------------------------

        this.response =
            await facultyApi.createFaculty(
                facultyData
            );

        // --------------------------------------------------------
        // Print response
        // --------------------------------------------------------

        console.log(
            "\nCREATE Faculty Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );
    }
);


// ============================================================
// FAC018
// VERIFY HTTP STATUS
// ============================================================

Then(
    "the create faculty response status code should match Excel",
    function (this: CustomWorld) {

        const testCase =
            this.excelTestCase;

        assert.ok(
            testCase,
            "Excel test case data is not available"
        );

        const expectedStatusCode =
            extractExpectedStatusCode(
                testCase.expectedStatusCode
            );

        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatusCode}`
        );

        console.log(
            `Actual HTTP Status Code: ${this.response.status}`
        );

        assert.strictEqual(
            this.response.status,
            expectedStatusCode
        );
    }
);


// ============================================================
// FAC018
// VERIFY STATUS
// ============================================================

Then(
    "the create faculty response status should be success",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.status,
            "success"
        );
    }
);


// ============================================================
// FAC018
// VERIFY ERROR
// ============================================================

Then(
    "the create faculty response error should be null",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.error,
            null
        );
    }
);


// ============================================================
// FAC018
// VERIFY ERROR CODE
// ============================================================

Then(
    "the create faculty response errorCode should be 0",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.errorCode,
            0
        );
    }
);


// ============================================================
// FAC018
// VERIFY GENERATED FACULTY ID
// ============================================================

Then(
    "the created faculty ID should be generated",
    function (this: CustomWorld) {

        const createdFacultyId =
            this.response.data.data.id;

        // Verify ID exists
        assert.ok(
            createdFacultyId,
            "Created Faculty ID was not generated"
        );

        // Verify ID type
        assert.strictEqual(
            typeof createdFacultyId,
            "number",
            "Created Faculty ID should be a number"
        );

        // Store ID
        this.createdFacultyId =
            createdFacultyId;

        console.log(
            `Created Faculty ID: ${this.createdFacultyId}`
        );
    }
);


// ============================================================
// FAC018
// VERIFY CREATED FACULTY DATA
// ============================================================

Then(
    "the created faculty name should match Excel",
    function (this: CustomWorld) {

        const testCase =
            this.excelTestCase;

        assert.ok(
            testCase,
            "Excel test case data is not available"
        );

        // Read request body from Excel
        const requestBody =
            JSON.parse(
                testCase.requestBodyParams
            );

        // Expected values
        const expectedFirstName =
            String(
                requestBody.first_name || ""
            );

        const expectedLastName =
            String(
                requestBody.last_name || ""
            );

        // Actual values
        const actualFirstName =
            String(
                this.response.data.data.first_name || ""
            );

        const actualLastName =
            String(
                this.response.data.data.last_name || ""
            );

        // Compare first name
        assert.strictEqual(
            actualFirstName,
            expectedFirstName
        );

        // Compare last name
        assert.strictEqual(
            actualLastName,
            expectedLastName
        );
    }
);


// ============================================================
// FAC019
// CREATE TEMPORARY FACULTY FOR DELETE
// ============================================================

When(
    "I create a temporary faculty for deletion using Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // --------------------------------------------------------
        // Read DELETE test case from Excel
        // --------------------------------------------------------

        const testCase =
            getTestCase(testCaseId);

        // Store Excel test case
        this.excelTestCase =
            testCase;

        // --------------------------------------------------------
        // Print test case information
        // --------------------------------------------------------

        console.log(
            "========================================"
        );

        console.log(
            `Test Case ID: ${testCase.testCaseId}`
        );

        console.log(
            `Scenario: ${testCase.scenario}`
        );

        console.log(
            `Method: ${testCase.method}`
        );

        console.log(
            `Endpoint: ${testCase.endpointUrl}`
        );

        console.log(
            "========================================"
        );

        // --------------------------------------------------------
        // Temporary Faculty data
        //
        // Excel DELETE test case does not contain
        // request body, so temporary data is used.
        // --------------------------------------------------------

        const temporaryFacultyData = {

            first_name:
                "API Automation Delete",

            last_name:
                "Test Faculty",

            mobile:
                "9876543210",

            email:
                "api.delete.faculty@gmail.com",

            availability_schedule: [

                {
                    day: "Monday",
                    slots: []
                },

                {
                    day: "Tuesday",
                    slots: []
                },

                {
                    day: "Wednesday",
                    slots: []
                },

                {
                    day: "Thursday",
                    slots: []
                },

                {
                    day: "Friday",
                    slots: []
                },

                {
                    day: "Saturday",
                    slots: []
                },

                {
                    day: "Sunday",
                    slots: []
                }
            ]
        };

        console.log(
            "\nTemporary Faculty Request Body:"
        );

        console.log(
            JSON.stringify(
                temporaryFacultyData,
                null,
                2
            )
        );

        // --------------------------------------------------------
        // Create temporary Faculty
        // --------------------------------------------------------

        this.response =
            await facultyApi.createFaculty(
                temporaryFacultyData
            );

        console.log(
            "\nCREATE Temporary Faculty Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );

        // --------------------------------------------------------
        // Extract generated Faculty ID
        // --------------------------------------------------------

        const createdFacultyId =
            this.response.data.data.id;

        assert.ok(
            createdFacultyId,
            "Temporary Faculty ID was not generated"
        );

        // Store Faculty ID
        this.createdFacultyId =
            createdFacultyId;

        console.log(
            `Temporary Faculty ID: ${this.createdFacultyId}`
        );
    }
);


// ============================================================
// FAC019
// DELETE CREATED FACULTY
// ============================================================

When(
    "I delete the created faculty",
    async function (this: CustomWorld) {

        // Verify Faculty ID exists
        assert.ok(
            this.createdFacultyId,
            "Created Faculty ID is not available"
        );

        console.log(
            `\nDeleting Faculty ID: ${this.createdFacultyId}`
        );

        // --------------------------------------------------------
        // Send DELETE request
        // --------------------------------------------------------

        this.response =
            await facultyApi.deleteFaculty(
                this.createdFacultyId!
            );

        // --------------------------------------------------------
        // Print response
        // --------------------------------------------------------

        console.log(
            "\nDELETE Faculty Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );
    }
);


// ============================================================
// FAC019
// VERIFY DELETE HTTP STATUS FROM EXCEL
// ============================================================

Then(
    "the delete faculty response status code should match Excel",
    function (this: CustomWorld) {

        const testCase =
            this.excelTestCase;

        assert.ok(
            testCase,
            "Excel test case data is not available"
        );

        // Extract expected status
        const expectedStatusCode =
            extractExpectedStatusCode(
                testCase.expectedStatusCode
            );

        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatusCode}`
        );

        console.log(
            `Actual HTTP Status Code: ${this.response.status}`
        );

        assert.strictEqual(
            this.response.status,
            expectedStatusCode
        );
    }
);


// ============================================================
// FAC019
// VERIFY DELETE STATUS
// ============================================================

Then(
    "the delete faculty response status should be success",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.status,
            "success"
        );
    }
);


// ============================================================
// FAC019
// VERIFY DELETE ERROR
// ============================================================

Then(
    "the delete faculty response error should be null",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.error,
            null
        );
    }
);


// ============================================================
// FAC019
// VERIFY DELETE ERROR CODE
// ============================================================

Then(
    "the delete faculty response errorCode should be 0",
    function (this: CustomWorld) {

        assert.strictEqual(
            this.response.data.errorCode,
            0
        );
    }
);


// ============================================================
// FAC019
// VERIFY DELETE MESSAGE
// ============================================================

Then(
    "the delete faculty message should be {string}",
    function (
        this: CustomWorld,
        expectedMessage: string
    ) {

        assert.strictEqual(
            this.response.data.data.msg,
            expectedMessage
        );
    }
);


// ============================================================
// FAC019
// GET DELETED FACULTY
// ============================================================

When(
    "I try to get the deleted faculty",
    async function (this: CustomWorld) {

        // Verify deleted Faculty ID exists
        assert.ok(
            this.createdFacultyId,
            "Deleted Faculty ID is not available"
        );

        console.log(
            `\nGetting deleted Faculty ID: ${this.createdFacultyId}`
        );

        // --------------------------------------------------------
        // GET deleted Faculty
        // --------------------------------------------------------

        this.response =
            await facultyApi.getFaculty(
                this.createdFacultyId!
            );

        console.log(
            "\nGET Deleted Faculty Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );
    }
);


// ============================================================
// FAC019
// VERIFY FACULTY IS DELETED
// ============================================================

Then(
    "the deleted faculty should not be available",
    function (this: CustomWorld) {

        const faculties =
            this.response.data.data;

        // --------------------------------------------------------
        // API returns an array
        // --------------------------------------------------------

        if (Array.isArray(faculties)) {

            const deletedFacultyExists =
                faculties.some(
                    (faculty: any) =>
                        faculty.id ===
                        this.createdFacultyId
                );

            // Faculty should not exist
            assert.strictEqual(
                deletedFacultyExists,
                false,
                `Deleted Faculty ID ${this.createdFacultyId} ` +
                `is still available`
            );

        } else {

            console.log(
                "Deleted Faculty is not returned as an array."
            );
        }
    }
);