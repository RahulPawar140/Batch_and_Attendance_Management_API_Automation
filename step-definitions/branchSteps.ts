import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../utils/world";
import assert from "assert";
import { BranchApi } from "../api/branchApi";
import {
    getTestCase,
    ApiTestCase
} from "../utils/excelReader";

const branchApi = new BranchApi();


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get Branch test case data from Excel.
 *
 * Example:
 *
 * getBranchTestCase("TC_BRA_006")
 */
function getBranchTestCase(
    testCaseId: string
): ApiTestCase {

    return getTestCase(testCaseId);
}


/**
 * Extract Branch ID from Excel endpoint.
 *
 * Example:
 *
 * http://localhost:9998/branch/get_branch/4
 *
 * Returns:
 *
 * 4
 */
function extractBranchId(
    endpointUrl: string
): number {

    // ----------------------------------------------------
    // Case 1:
    // Endpoint contains actual ID
    //
    // Example:
    // /branch/get_branch/4
    // ----------------------------------------------------

    const actualIdMatch =
        endpointUrl.match(
            /\/get_branch\/(\d+)/
        );

    if (actualIdMatch) {

        return Number(
            actualIdMatch[1]
        );
    }


    // ----------------------------------------------------
    // Case 2:
    // Excel contains placeholder with example ID
    //
    // Example:
    // /branch/get_branch/[branch_id] eg: 4
    // ----------------------------------------------------

    const exampleIdMatch =
        endpointUrl.match(
            /eg:\s*(\d+)/
        );

    if (exampleIdMatch) {

        return Number(
            exampleIdMatch[1]
        );
    }


    // ----------------------------------------------------
    // If ID cannot be found
    // ----------------------------------------------------

    throw new Error(
        `Branch ID could not be extracted from endpoint: ${endpointUrl}`
    );
}


/**
 * Extract expected HTTP status code from Excel.
 *
 * Example:
 *
 * "200 OK"
 *
 * Returns:
 *
 * 200
 */
function getExpectedStatusCode(
    expectedStatusCode: string
): number {

    const match =
        expectedStatusCode.match(/\d+/);

    if (!match) {

        throw new Error(
            `Invalid expected status code in Excel: ${expectedStatusCode}`
        );
    }

    return Number(match[0]);
}


/**
 * Convert JSON request body from Excel
 * into a JavaScript object.
 */
function parseRequestBody(
    requestBody: string
): any {

    if (
        !requestBody ||
        requestBody.trim() === ""
    ) {

        return {};
    }

    try {

        return JSON.parse(requestBody);

    } catch (error) {

        throw new Error(
            `Invalid JSON in Excel Request Body / Params column:\n${requestBody}`
        );
    }
}


// ============================================================
// BACKGROUND
// ============================================================

Given(
    "the Branch API service is available",
    async function (this: CustomWorld) {

        console.log("\n========================================");
        console.log("Branch API Test Started");
        console.log("========================================");
    }
);


// ============================================================
// BRA006 - GET BRANCH BY ID
// ============================================================

When(
    "I send a GET branch request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase =
            getBranchTestCase(testCaseId);

        this.testCase = testCase;

        console.log("\n========================================");
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
        console.log("========================================");

        // ----------------------------------------------------
        // Extract Branch ID from Excel endpoint
        // ----------------------------------------------------

        const branchId =
            extractBranchId(
                testCase.endpointUrl
            );

        console.log(
            `Branch ID extracted from Excel: ${branchId}`
        );

        // ----------------------------------------------------
        // Send GET request
        // ----------------------------------------------------

        this.response =
            await branchApi.getBranch(
                branchId
            );

        console.log("\nGET Branch Response:");

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
// BRA007 - GET BRANCH LIST
// ============================================================

When(
    "I send a GET branch list request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase =
            getBranchTestCase(testCaseId);

        this.testCase = testCase;

        console.log("\n========================================");
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
        console.log("========================================");

        // ----------------------------------------------------
        // Extract query parameters from Excel URL
        // ----------------------------------------------------

        const url =
            new URL(
                testCase.endpointUrl
            );

        const params = {

            page_size: Number(
                url.searchParams.get(
                    "page_size"
                )
            ),

            sort_order:
                url.searchParams.get(
                    "sort_order"
                ) || "",

            page_index: Number(
                url.searchParams.get(
                    "page_index"
                )
            ),

            sort_by:
                url.searchParams.get(
                    "sort_by"
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

        // ----------------------------------------------------
        // Send GET list request
        // ----------------------------------------------------

        this.response =
            await branchApi.getBranchList(
                params
            );

        console.log(
            "\nGET Branch List Response:"
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
// BRA008 - CREATE BRANCH
// ============================================================

When(
    "I send a POST create branch request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase =
            getBranchTestCase(testCaseId);

        this.testCase = testCase;

        console.log("\n========================================");
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
        console.log("========================================");

        // ----------------------------------------------------
        // Read request body from Excel
        // ----------------------------------------------------

        const branchData =
            parseRequestBody(
                testCase.requestBodyParams
            );

        console.log(
            "\nRequest Body read from Excel:"
        );

        console.log(
            JSON.stringify(
                branchData,
                null,
                2
            )
        );

        // ----------------------------------------------------
        // Send POST request
        // ----------------------------------------------------

        this.response =
            await branchApi.createBranch(
                branchData
            );

        console.log(
            "\nCREATE Branch Response:"
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
// BRA009 - UPDATE BRANCH
// ============================================================

When(
    "I send a PUT update branch request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase =
            getBranchTestCase(testCaseId);

        this.testCase = testCase;

        console.log("\n========================================");
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
        console.log("========================================");

        // ----------------------------------------------------
        // Read request body from Excel
        // ----------------------------------------------------

        const branchData =
            parseRequestBody(
                testCase.requestBodyParams
            );

        console.log(
            "\nUpdate Request Body read from Excel:"
        );

        console.log(
            JSON.stringify(
                branchData,
                null,
                2
            )
        );

        // ----------------------------------------------------
        // Send PUT request
        // ----------------------------------------------------

        this.response =
            await branchApi.updateBranch(
                branchData
            );

        console.log(
            "\nUPDATE Branch Response:"
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
// BRA010 - CREATE TEMPORARY BRANCH
// ============================================================

When(
    "I create a temporary branch for deletion using Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read DELETE test case from Excel
        // ----------------------------------------------------

        const testCase =
            getBranchTestCase(testCaseId);

        this.testCase = testCase;

        console.log("\n========================================");
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
        console.log("========================================");

        // ----------------------------------------------------
        // Create temporary branch
        //
        // TC_BRA_010 does not have a request body in Excel.
        // Therefore we create a temporary branch to obtain
        // a real branch ID for deletion.
        // ----------------------------------------------------

        const temporaryBranchData = {

            name:
                "API Automation Delete Test Branch",

            location:
                "Bhandup",

            landmark:
                "Jungle Mungle Road",

            remarks:
                "Temporary branch created for DELETE API automation testing"
        };

        this.response =
            await branchApi.createBranch(
                temporaryBranchData
            );

        console.log(
            "\nCREATE Temporary Branch Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );

        // ----------------------------------------------------
        // Get generated branch ID
        // ----------------------------------------------------

        const createdBranchId =
            this.response.data.data.id;

        assert.ok(
            createdBranchId,
            "Temporary branch ID was not generated"
        );

        this.createdBranchId =
            createdBranchId;

        console.log(
            `Temporary Branch ID: ${this.createdBranchId}`
        );
    }
);


// ============================================================
// DELETE CREATED BRANCH
// ============================================================

When(
    "I delete the created branch using Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase =
            getBranchTestCase(testCaseId);

        this.testCase = testCase;

        // ----------------------------------------------------
        // Make sure branch ID exists
        // ----------------------------------------------------

        assert.ok(
            this.createdBranchId,
            "Created branch ID is not available"
        );

        console.log(
            `\nDeleting Branch ID: ${this.createdBranchId}`
        );

        // ----------------------------------------------------
        // Send DELETE request
        // ----------------------------------------------------

        this.response =
            await branchApi.deleteBranch(
                this.createdBranchId!
            );

        console.log(
            "\nDELETE Branch Response:"
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
// COMMON RESPONSE STATUS CODE
// ============================================================

Then(
    "the branch response status code should match Excel",
    function (
        this: CustomWorld
    ) {

        const expectedStatusCode =
            getExpectedStatusCode(
                this.testCase.expectedStatusCode
            );

        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatusCode}`
        );

        console.log(
            `Actual HTTP Status Code: ${this.response.status}`
        );

        assert.strictEqual(
            this.response.status,
            expectedStatusCode,
            `Expected HTTP status ${expectedStatusCode}, but received ${this.response.status}`
        );
    }
);


// ============================================================
// RESPONSE STATUS SHOULD BE SUCCESS
// ============================================================

Then(
    "the branch response status should be success",
    function (
        this: CustomWorld
    ) {

        assert.strictEqual(
            this.response.data.status,
            "success"
        );
    }
);


// ============================================================
// RESPONSE ERROR SHOULD BE NULL
// ============================================================

Then(
    "the branch response error should be null",
    function (
        this: CustomWorld
    ) {

        assert.strictEqual(
            this.response.data.error,
            null
        );
    }
);


// ============================================================
// RESPONSE ERROR CODE SHOULD BE 0
// ============================================================

Then(
    "the branch response errorCode should be 0",
    function (
        this: CustomWorld
    ) {

        assert.strictEqual(
            this.response.data.errorCode,
            0
        );
    }
);


// ============================================================
// BRA006 - VERIFY BRANCH ID
// ============================================================

Then(
    "the response should contain the branch ID from Excel",
    function (
        this: CustomWorld
    ) {

        const expectedBranchId =
            extractBranchId(
                this.testCase.endpointUrl
            );

        const branches =
            this.response.data.data;

        assert.ok(
            Array.isArray(branches),
            "Expected data to be an array"
        );

        const branchExists =
            branches.some(
                (branch: any) =>
                    branch.id === expectedBranchId
            );

        assert.ok(
            branchExists,
            `Branch ID ${expectedBranchId} was not found in response`
        );
    }
);


// ============================================================
// BRA007 - VERIFY BRANCH LIST
// ============================================================

Then(
    "the branch list should contain the expected branch",
    function (
        this: CustomWorld
    ) {

        const branches =
            this.response.data.data;

        assert.ok(
            Array.isArray(branches),
            "Expected data to be an array"
        );

        // ----------------------------------------------------
        // Read search text from Excel endpoint
        // ----------------------------------------------------

        const url =
            new URL(
                this.testCase.endpointUrl
            );

        const searchText =
            url.searchParams.get(
                "search_text"
            );

        assert.ok(
            searchText,
            "Search text was not found in Excel endpoint"
        );

        // ----------------------------------------------------
        // Check whether branch matching the
        // Excel search text exists
        // ----------------------------------------------------

        const branchExists =
            branches.some(
                (branch: any) =>
                    String(
                        branch.name
                    ).toLowerCase()
                    .includes(
                        searchText!.toLowerCase()
                    )
            );

        assert.ok(
            branchExists,
            `Branch containing "${searchText}" was not found in response`
        );
    }
);


// ============================================================
// BRA008 - VERIFY CREATED BRANCH ID
// ============================================================

Then(
    "the created branch ID should be generated",
    function (
        this: CustomWorld
    ) {

        const createdBranchId =
            this.response.data.data.id;

        assert.ok(
            createdBranchId,
            "Created branch ID was not generated"
        );

        assert.strictEqual(
            typeof createdBranchId,
            "number",
            "Created branch ID should be a number"
        );

        this.createdBranchId =
            createdBranchId;

        console.log(
            `Created Branch ID: ${this.createdBranchId}`
        );
    }
);


// ============================================================
// BRA008 - VERIFY CREATED BRANCH NAME
// ============================================================

Then(
    "the created branch name should match Excel",
    function (
        this: CustomWorld
    ) {

        const requestBody =
            parseRequestBody(
                this.testCase.requestBodyParams
            );

        assert.strictEqual(
            this.response.data.data.name,
            requestBody.name,
            "Created branch name does not match Excel request body"
        );
    }
);


// ============================================================
// BRA010 - VERIFY DELETE MESSAGE
// ============================================================

Then(
    "the delete branch message should match Excel",
    function (
        this: CustomWorld
    ) {

        const actualMessage =
            this.response.data.data.msg;

        assert.ok(
            actualMessage,
            "Delete branch message was not returned"
        );

        assert.strictEqual(
            actualMessage,
            "Branch Deleted Successfully"
        );
    }
);


// ============================================================
// VERIFY DELETED BRANCH
// ============================================================

When(
    "I try to get the deleted branch",
    async function (
        this: CustomWorld
    ) {

        assert.ok(
            this.createdBranchId,
            "Deleted branch ID is not available"
        );

        this.response =
            await branchApi.getBranch(
                this.createdBranchId!
            );

        console.log(
            "\nGET Deleted Branch Response:"
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


Then(
    "the deleted branch should not be available",
    function (
        this: CustomWorld
    ) {

        const branches =
            this.response.data.data;

        if (Array.isArray(branches)) {

            const deletedBranchExists =
                branches.some(
                    (branch: any) =>
                        branch.id ===
                        this.createdBranchId
                );

            assert.strictEqual(
                deletedBranchExists,
                false,
                `Deleted branch ID ${this.createdBranchId} is still available`
            );

        } else {

            console.log(
                "Deleted branch is not returned as an array."
            );
        }
    }
);