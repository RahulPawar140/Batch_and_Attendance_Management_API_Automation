import {
    Given,
    When,
    Then
} from "@cucumber/cucumber";

import assert from "assert";

import { CustomWorld } from "../utils/world";
import { getTestCase, ApiTestCase } from "../utils/excelReader";
import { ManagerApi } from "../api/managerApi";


// ============================================================
// MANAGER API OBJECT
// ============================================================

const managerApi = new ManagerApi();


// ============================================================
// HELPER FUNCTION
// ============================================================

function parseExpectedStatus(status: string): number {

    const match = status.match(/\d+/);

    if (!match) {
        throw new Error(
            `Invalid expected status code in Excel: ${status}`
        );
    }

    return Number(match[0]);
}


// ============================================================
// START MANAGER API TEST
// ============================================================

Given(
    "the Manager API test is started",
    function (this: CustomWorld) {

        console.log(
            "========================================"
        );

        console.log(
            "Manager API Test Started"
        );

        console.log(
            "========================================"
        );
    }
);


// ============================================================
// TC_MAN_020
// GET MANAGER BY ID
// ============================================================

When(
    'I send a GET Manager request for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase: ApiTestCase =
            getTestCase(testCaseId);

        this.managerTestCase = testCase;

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
        // Extract Manager ID
        // --------------------------------------------------------

        const idMatch =
            testCase.endpointUrl.match(
                /get_manager\/(\d+)/
            );

        if (!idMatch) {

            throw new Error(
                `Manager ID could not be extracted from endpoint: ${testCase.endpointUrl}`
            );
        }

        const managerId =
            Number(idMatch[1]);

        console.log(
            `Manager ID extracted from Excel: ${managerId}`
        );


        // --------------------------------------------------------
        // Send GET request
        // --------------------------------------------------------

        this.response =
            await managerApi.getManagerById(managerId);


        console.log(
            "\nGET Manager Response:"
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
// TC_MAN_021
// GET MANAGER LIST
// ============================================================

When(
    'I send a GET Manager List request for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase: ApiTestCase =
            getTestCase(testCaseId);

        this.managerTestCase = testCase;

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
        // Parse query parameters from Excel URL
        // --------------------------------------------------------

        const url =
            new URL(testCase.endpointUrl);

        const params: Record<string, any> = {};

        url.searchParams.forEach(
            (value, key) => {

                params[key] =
                    /^\d+$/.test(value)
                        ? Number(value)
                        : value;
            }
        );


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
        // Send GET request
        // --------------------------------------------------------

        this.response =
            await managerApi.getManagerList(params);


        console.log(
            "\nGET Manager List Response:"
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
// TC_MAN_022
// DELETE MANAGER
// ============================================================

When(
    'I send a DELETE Manager request for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase: ApiTestCase =
            getTestCase(testCaseId);

        this.managerTestCase = testCase;

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
        // IMPORTANT
        // --------------------------------------------------------
        // Before running TC_MAN_022:
        //
        // Create a temporary manager manually in DB.
        //
        // Put that manager ID in:
        //
        // MANAGER_DELETE_ID
        //
        // Example:
        //
        // MANAGER_DELETE_ID=5
        //
        // in your .env file.
        // --------------------------------------------------------

        const managerId =
            Number(process.env.MANAGER_DELETE_ID);


        if (!managerId) {

            throw new Error(
                "MANAGER_DELETE_ID is not configured in .env. Create a temporary manager in the database and add its ID."
            );
        }


        this.deletedManagerId =
            managerId;


        console.log(
            `Manager ID selected for DELETE: ${managerId}`
        );


        // --------------------------------------------------------
        // DELETE MANAGER
        // --------------------------------------------------------

        this.response =
            await managerApi.deleteManager(
                managerId
            );


        console.log(
            "\nDELETE Manager Response:"
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
// STATUS CODE VALIDATION
// ============================================================

Then(
    "the manager response status code should match Excel",
    function (this: CustomWorld) {

        if (!this.managerTestCase) {

            throw new Error(
                "Manager Excel test case data is not available"
            );
        }

        const expectedStatus =
            parseExpectedStatus(
                this.managerTestCase.expectedStatusCode
            );

        const actualStatus =
            this.response.status;


        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatus}`
        );

        console.log(
            `Actual HTTP Status Code: ${actualStatus}`
        );


        assert.strictEqual(
            actualStatus,
            expectedStatus,
            `Expected HTTP status ${expectedStatus}, but received ${actualStatus}`
        );
    }
);


// ============================================================
// MANAGER LIST STATUS CODE VALIDATION
// ============================================================

Then(
    "the manager list response status code should match Excel",
    function (this: CustomWorld) {

        if (!this.managerTestCase) {

            throw new Error(
                "Manager Excel test case data is not available"
            );
        }

        const expectedStatus =
            parseExpectedStatus(
                this.managerTestCase.expectedStatusCode
            );

        const actualStatus =
            this.response.status;


        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatus}`
        );

        console.log(
            `Actual HTTP Status Code: ${actualStatus}`
        );


        assert.strictEqual(
            actualStatus,
            expectedStatus,
            `Expected HTTP status ${expectedStatus}, but received ${actualStatus}`
        );
    }
);


// ============================================================
// DELETE STATUS CODE VALIDATION
// ============================================================

Then(
    "the manager delete response status code should match Excel",
    function (this: CustomWorld) {

        if (!this.managerTestCase) {

            throw new Error(
                "Manager Excel test case data is not available"
            );
        }

        const expectedStatus =
            parseExpectedStatus(
                this.managerTestCase.expectedStatusCode
            );

        const actualStatus =
            this.response.status;


        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatus}`
        );

        console.log(
            `Actual HTTP Status Code: ${actualStatus}`
        );


        assert.strictEqual(
            actualStatus,
            expectedStatus,
            `Expected HTTP status ${expectedStatus}, but received ${actualStatus}`
        );
    }
);


// ============================================================
// VERIFY MANAGER DETAILS
// ============================================================

Then(
    "the manager response should contain manager details",
    function (this: CustomWorld) {

        const responseBody =
            this.response.data;

        assert.ok(
            responseBody,
            "Manager response body is empty"
        );


        assert.strictEqual(
            responseBody.status,
            "success",
            "Manager API did not return success"
        );


        assert.ok(
            Array.isArray(responseBody.data),
            "Manager data should be an array"
        );


        assert.ok(
            responseBody.data.length > 0,
            "Manager details were not returned"
        );


        console.log(
            "Manager details verified successfully."
        );
    }
);


// ============================================================
// VERIFY MANAGER LIST
// ============================================================

Then(
    "the manager list response should contain manager data",
    function (this: CustomWorld) {

        const responseBody =
            this.response.data;

        assert.ok(
            responseBody,
            "Manager list response body is empty"
        );


        assert.strictEqual(
            responseBody.status,
            "success",
            "Manager List API did not return success"
        );


        assert.ok(
            Array.isArray(responseBody.data),
            "Manager list data should be an array"
        );


        console.log(
            `Manager list contains ${responseBody.data.length} record(s).`
        );
    }
);


// ============================================================
// VERIFY DELETE SUCCESS
// ============================================================

Then(
    "the manager should be deleted successfully",
    function (this: CustomWorld) {

        const responseBody =
            this.response.data;


        assert.ok(
            responseBody,
            "Delete Manager response body is empty"
        );


        assert.strictEqual(
            responseBody.status,
            "success",
            "Delete Manager API did not return success"
        );


        const message =
            responseBody.data?.msg;


        assert.strictEqual(
            message,
            "Manager Deleted Successfully",
            `Unexpected delete message: ${message}`
        );


        console.log(
            "Manager deleted successfully."
        );
    }
);


// ============================================================
// VERIFY DELETED MANAGER
// ============================================================

Then(
    "the deleted manager should not be available",
    async function (this: CustomWorld) {

        if (!this.deletedManagerId) {

            throw new Error(
                "Deleted Manager ID is not available"
            );
        }


        console.log(
            `\nGetting deleted Manager ID: ${this.deletedManagerId}`
        );


        const getResponse =
            await managerApi.getDeletedManager(
                this.deletedManagerId
            );


        console.log(
            "\nGET Deleted Manager Response:"
        );

        console.log(
            JSON.stringify(
                getResponse.data,
                null,
                2
            )
        );


        const responseBody =
            getResponse.data;


        assert.strictEqual(
            responseBody.status,
            "success",
            "GET deleted Manager API did not return success"
        );


        assert.ok(
            Array.isArray(responseBody.data),
            "Deleted Manager data should be an array"
        );


        assert.strictEqual(
            responseBody.data.length,
            0,
            "Deleted Manager is still available"
        );


        console.log(
            "Deleted Manager verification passed."
        );
    }
);