import {
    Given,
    When,
    Then
} from "@cucumber/cucumber";

import assert from "assert";

import {
    getTestCase,
    ApiTestCase
} from "../utils/excelReader";

import {
    getUserById,
    createUser
} from "../api/userAPI";

import { CustomWorld } from "../utils/world";


// ============================================================
// LOAD USER TEST CASE FROM EXCEL
// ============================================================

Given(
    'the User API test case {string} is loaded from Excel',
    function (
        this: CustomWorld,
        testCaseId: string
    ) {

        console.log("========================================");
        console.log("User API Test Started");
        console.log("========================================");

        // --------------------------------------------------------
        // Read test case from Excel
        // --------------------------------------------------------

        const testCase: ApiTestCase =
            getTestCase(testCaseId);

        // --------------------------------------------------------
        // Store test case in Cucumber World
        // --------------------------------------------------------

        this.userTestCase = testCase;

        // --------------------------------------------------------
        // Print Excel test case details
        // --------------------------------------------------------

        console.log("----------------------------------------");
        console.log(
            "Test Case ID:",
            testCase.testCaseId
        );

        console.log(
            "Scenario:",
            testCase.scenario
        );

        console.log(
            "Method:",
            testCase.method
        );

        console.log(
            "Endpoint:",
            testCase.endpointUrl
        );

        console.log(
            "Request Body:",
            testCase.requestBodyParams
        );

        console.log(
            "Expected Status:",
            testCase.expectedStatusCode
        );

        console.log(
            "Expected Result:",
            testCase.expectedResult
        );

        console.log("----------------------------------------");
    }
);


// ============================================================
// GET USER BY ID
// TC_USE_027
// ============================================================

When(
    "I send a GET request for the User",
    async function (
        this: CustomWorld
    ) {

        // --------------------------------------------------------
        // Make sure Excel test case is loaded
        // --------------------------------------------------------

        assert.ok(
            this.userTestCase,
            "User test case was not loaded from Excel"
        );

        // --------------------------------------------------------
        // Get endpoint from Excel
        // --------------------------------------------------------

        let endpoint =
            this.userTestCase!.endpointUrl;

        // --------------------------------------------------------
        // User ID
        //
        // Excel endpoint:
        // /users/get_user/[user_id]
        //
        // We are using user ID 7 as mentioned in Excel.
        // --------------------------------------------------------

        this.userId = 7;

        // --------------------------------------------------------
        // Replace [user_id] with actual ID
        // --------------------------------------------------------

        endpoint = endpoint.replace(
            "[user_id]",
            String(this.userId)
        );

        console.log("\nAPI GET:", endpoint);

        // --------------------------------------------------------
        // Send GET request
        // --------------------------------------------------------

        this.response =
            await getUserById(endpoint);
    }
);


// ============================================================
// CREATE USER
// TC_USE_028
// ============================================================

When(
    "I send a POST request to create the User",
    async function (
        this: CustomWorld
    ) {

        // --------------------------------------------------------
        // Make sure Excel test case is loaded
        // --------------------------------------------------------

        assert.ok(
            this.userTestCase,
            "User test case was not loaded from Excel"
        );

        // --------------------------------------------------------
        // Get endpoint from Excel
        // --------------------------------------------------------

        const endpoint =
            this.userTestCase!.endpointUrl;

        // --------------------------------------------------------
        // Get request body from Excel
        // --------------------------------------------------------

        const requestBodyString =
            this.userTestCase!.requestBodyParams;

        // --------------------------------------------------------
        // Convert Excel JSON string into JavaScript object
        // --------------------------------------------------------

        let requestBody: any;

        try {

            requestBody =
                JSON.parse(requestBodyString);

        } catch (error) {

            throw new Error(
                `Invalid JSON in Excel Request Body / Params: ${requestBodyString}`
            );
        }

        // --------------------------------------------------------
        // Print request body
        // --------------------------------------------------------

        console.log("\nRequest Body read from Excel:");

        console.log(
            JSON.stringify(
                requestBody,
                null,
                2
            )
        );

        // --------------------------------------------------------
        // Send POST request
        // --------------------------------------------------------

        this.response =
            await createUser(
                endpoint,
                requestBody
            );
    }
);


// ============================================================
// VALIDATE HTTP STATUS CODE
// ============================================================

Then(
    "the User HTTP status code should match the expected status",
    function (
        this: CustomWorld
    ) {

        // --------------------------------------------------------
        // Make sure response exists
        // --------------------------------------------------------

        assert.ok(
            this.response,
            "API response was not received"
        );

        // --------------------------------------------------------
        // Read expected status from Excel
        //
        // Example:
        // "200 OK"
        //
        // We extract:
        // 200
        // --------------------------------------------------------

        const expectedStatusMatch =
            this.userTestCase!.expectedStatusCode
                .match(/\d+/);

        assert.ok(
            expectedStatusMatch,
            `Invalid expected status code in Excel: ${this.userTestCase!.expectedStatusCode}`
        );

        const expectedStatus =
            Number(expectedStatusMatch[0]);

        // --------------------------------------------------------
        // Actual HTTP status
        // --------------------------------------------------------

        const actualStatus =
            this.response.status;

        // --------------------------------------------------------
        // Print status
        // --------------------------------------------------------

        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatus}`
        );

        console.log(
            `Actual HTTP Status Code: ${actualStatus}`
        );

        // --------------------------------------------------------
        // Validate status
        // --------------------------------------------------------

        assert.strictEqual(
            actualStatus,
            expectedStatus,
            `Expected HTTP ${expectedStatus}, but received HTTP ${actualStatus}`
        );
    }
);


// ============================================================
// VALIDATE GET USER RESPONSE
// TC_USE_027
// ============================================================

Then(
    "the User details should be returned successfully",
    function (
        this: CustomWorld
    ) {

        // --------------------------------------------------------
        // Make sure response exists
        // --------------------------------------------------------

        assert.ok(
            this.response,
            "API response was not received"
        );

        // --------------------------------------------------------
        // Get response body
        // --------------------------------------------------------

        const responseData =
            this.response.data;

        console.log("\nGET USER RESPONSE:");

        console.log(
            JSON.stringify(
                responseData,
                null,
                2
            )
        );

        // --------------------------------------------------------
        // Validate response body
        // --------------------------------------------------------

        assert.ok(
            responseData,
            "User response body is empty"
        );

        console.log(
            "User details returned successfully."
        );
    }
);


// ============================================================
// VALIDATE CREATE USER RESPONSE
// TC_USE_028
// ============================================================

Then(
    "the User should be created successfully",
    function (
        this: CustomWorld
    ) {

        // --------------------------------------------------------
        // Make sure response exists
        // --------------------------------------------------------

        assert.ok(
            this.response,
            "API response was not received"
        );

        // --------------------------------------------------------
        // Get response body
        // --------------------------------------------------------

        const responseData =
            this.response.data;

        console.log("\nCREATE USER RESPONSE:");

        console.log(
            JSON.stringify(
                responseData,
                null,
                2
            )
        );

        // --------------------------------------------------------
        // Validate response body
        // --------------------------------------------------------

        assert.ok(
            responseData,
            "Create User response body is empty"
        );

        // --------------------------------------------------------
        // Validate that response contains data
        // --------------------------------------------------------

        assert.ok(
            responseData.data,
            "Create User response does not contain data"
        );

        // --------------------------------------------------------
        // Print success
        // --------------------------------------------------------

        console.log(
            "User created successfully."
        );

        console.log(
            "Generated User ID:",
            responseData.data.id
        );

        console.log(
            "Generated User Name:",
            responseData.data.user_name
        );
    }
);