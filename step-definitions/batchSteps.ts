import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../utils/world";
import assert from "assert";
import { BatchApi } from "../api/batchApi";
import { getTestCase, ApiTestCase } from "../utils/excelReader";

const batchApi = new BatchApi();


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get test case data from Excel.
 *
 * This function reads the test case using the
 * Test Case ID provided in the feature file.
 */
function getBatchTestCase(testCaseId: string): ApiTestCase {

    return getTestCase(testCaseId);
}


/**
 * Extract batch ID from endpoint URL.
 *
 * Example:
 *
 * http://localhost:9998/batches/get_batch/3
 *
 * Returns:
 *
 * 3
 */
function extractBatchId(endpointUrl: string): number {

    const match = endpointUrl.match(
        /\/get_batch\/(\d+)/
    );

    if (!match) {

        throw new Error(
            `Batch ID could not be extracted from endpoint: ${endpointUrl}`
        );
    }

    return Number(match[1]);
}


/**
 * Convert expected status code from Excel.
 *
 * Excel may contain:
 *
 * 200 OK
 *
 * This function extracts:
 *
 * 200
 */
function getExpectedStatusCode(
    expectedStatusCode: string
): number {

    const match = expectedStatusCode.match(/\d+/);

    if (!match) {

        throw new Error(
            `Invalid expected status code in Excel: ${expectedStatusCode}`
        );
    }

    return Number(match[0]);
}


/**
 * Convert Request Body / Params JSON from Excel
 * into a JavaScript object.
 */
function parseRequestBody(
    requestBody: string
): any {

    if (!requestBody || requestBody.trim() === "") {

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
    "the Batch API service is available",
    async function (this: CustomWorld) {

        console.log("\n========================================");
        console.log("Batch API Test Started");
        console.log("========================================");
    }
);


// ============================================================
// B01 - GET BATCH BY ID
// ============================================================

When(
    "I send a GET request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase = getBatchTestCase(
            testCaseId
        );

        // Store test case in World
        this.testCase = testCase;

        console.log("\n========================================");
        console.log(`Test Case ID: ${testCase.testCaseId}`);
        console.log(`Scenario: ${testCase.scenario}`);
        console.log(`Method: ${testCase.method}`);
        console.log(`Endpoint: ${testCase.endpointUrl}`);
        console.log("========================================");

        // ----------------------------------------------------
        // Extract Batch ID from Excel endpoint
        // ----------------------------------------------------

        const batchId = extractBatchId(
            testCase.endpointUrl
        );

        console.log(
            `Batch ID extracted from Excel: ${batchId}`
        );

        // ----------------------------------------------------
        // Send API request
        // ----------------------------------------------------

        this.response = await batchApi.getBatch(
            batchId
        );

        console.log("\nGET Batch Response:");

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
// B02 - GET BATCHES LIST
// ============================================================

When(
    "I send a GET batches list request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase = getBatchTestCase(
            testCaseId
        );

        this.testCase = testCase;

        console.log("\n========================================");
        console.log(`Test Case ID: ${testCase.testCaseId}`);
        console.log(`Scenario: ${testCase.scenario}`);
        console.log(`Method: ${testCase.method}`);
        console.log(`Endpoint: ${testCase.endpointUrl}`);
        console.log("========================================");

        // ----------------------------------------------------
        // Extract query parameters from Excel endpoint
        // ----------------------------------------------------

        const url = new URL(
            testCase.endpointUrl
        );

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

        console.log("\nParameters read from Excel:");

        console.log(
            JSON.stringify(
                params,
                null,
                2
            )
        );

        // ----------------------------------------------------
        // Send API request
        // ----------------------------------------------------

        this.response =
            await batchApi.getBatchesList(
                params
            );

        console.log("\nGET Batches List Response:");

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
// B03 - CREATE BATCH
// ============================================================

When(
    "I send a POST create batch request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase = getBatchTestCase(
            testCaseId
        );

        this.testCase = testCase;

        console.log("\n========================================");
        console.log(`Test Case ID: ${testCase.testCaseId}`);
        console.log(`Scenario: ${testCase.scenario}`);
        console.log(`Method: ${testCase.method}`);
        console.log(`Endpoint: ${testCase.endpointUrl}`);
        console.log("========================================");

        // ----------------------------------------------------
        // Read request body from Excel
        // ----------------------------------------------------

        const batchData = parseRequestBody(
            testCase.requestBodyParams
        );

        console.log("\nRequest Body read from Excel:");

        console.log(
            JSON.stringify(
                batchData,
                null,
                2
            )
        );

        // ----------------------------------------------------
        // Send POST request
        // ----------------------------------------------------

        this.response =
            await batchApi.createBatch(
                batchData
            );

        console.log("\nCREATE Batch Response:");

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
// B04 - UPDATE BATCH
// ============================================================

When(
    "I send a PUT update batch request for Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase = getBatchTestCase(
            testCaseId
        );

        this.testCase = testCase;

        console.log("\n========================================");
        console.log(`Test Case ID: ${testCase.testCaseId}`);
        console.log(`Scenario: ${testCase.scenario}`);
        console.log(`Method: ${testCase.method}`);
        console.log(`Endpoint: ${testCase.endpointUrl}`);
        console.log("========================================");

        // ----------------------------------------------------
        // Read request body from Excel
        // ----------------------------------------------------

        const batchData = parseRequestBody(
            testCase.requestBodyParams
        );

        console.log("\nUpdate Request Body read from Excel:");

        console.log(
            JSON.stringify(
                batchData,
                null,
                2
            )
        );

        // ----------------------------------------------------
        // Send PUT request
        // ----------------------------------------------------

        this.response =
            await batchApi.updateBatch(
                batchData
            );

        console.log("\nUPDATE Batch Response:");

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
// B05 - CREATE TEMPORARY BATCH FOR DELETE
// ============================================================

When(
    "I create a temporary batch for deletion using Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read delete test case from Excel
        // ----------------------------------------------------

        const testCase = getBatchTestCase(
            testCaseId
        );

        this.testCase = testCase;

        console.log("\n========================================");
        console.log(`Test Case ID: ${testCase.testCaseId}`);
        console.log(`Scenario: ${testCase.scenario}`);
        console.log(`Method: ${testCase.method}`);
        console.log(`Endpoint: ${testCase.endpointUrl}`);
        console.log("========================================");

        // ----------------------------------------------------
        // Create temporary batch
        //
        // DELETE Excel row does not contain a request body.
        // Therefore we create a temporary batch only to obtain
        // an ID which can safely be deleted.
        // ----------------------------------------------------

        const temporaryBatchData = {

            name: "API Automation Delete Test Batch",

            manager_id: 1,

            faculty_id: 1,

            course_id: 2,

            description:
                "Temporary batch created for DELETE API automation testing",

            batch_status: "ongoing",

            batch_category: "weekend",

            batch_mode: "offline",

            batch_time: "2:00 PM - 5:00 PM",

            start_date: "2026-03-15",

            end_date: "2026-06-15"
        };

        this.response =
            await batchApi.createBatch(
                temporaryBatchData
            );

        console.log(
            "\nCREATE Temporary Batch Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );

        // ----------------------------------------------------
        // Get generated batch ID
        // ----------------------------------------------------

        const createdBatchId =
            this.response.data.data.id;

        assert.ok(
            createdBatchId,
            "Temporary batch ID was not generated"
        );

        this.createdBatchId =
            createdBatchId;

        console.log(
            `Temporary Batch ID: ${this.createdBatchId}`
        );
    }
);


// ============================================================
// DELETE CREATED BATCH
// ============================================================

When(
    "I delete the created batch using Excel test case {string}",
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        // ----------------------------------------------------
        // Read test case from Excel
        // ----------------------------------------------------

        const testCase = getBatchTestCase(
            testCaseId
        );

        this.testCase = testCase;

        // ----------------------------------------------------
        // Make sure temporary batch ID exists
        // ----------------------------------------------------

        assert.ok(
            this.createdBatchId,
            "Created batch ID is not available"
        );

        console.log(
            `\nDeleting Batch ID: ${this.createdBatchId}`
        );

        // ----------------------------------------------------
        // Send DELETE request
        // ----------------------------------------------------

        this.response =
            await batchApi.deleteBatch(
                this.createdBatchId!
            );

        console.log("\nDELETE Batch Response:");

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
    "the response status code should match Excel",
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
    "the batch response status should be success",
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
    "the batch response error should be null",
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
    "the batch response errorCode should be 0",
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
// B01 - VERIFY BATCH ID
// ============================================================

Then(
    "the response should contain the batch ID from Excel",
    function (
        this: CustomWorld
    ) {

        const expectedBatchId =
            extractBatchId(
                this.testCase.endpointUrl
            );

        const batches =
            this.response.data.data;

        assert.ok(
            Array.isArray(batches),
            "Expected data to be an array"
        );

        const batchExists =
            batches.some(
                (batch: any) =>
                    batch.id === expectedBatchId
            );

        assert.ok(
            batchExists,
            `Batch ID ${expectedBatchId} was not found in response`
        );
    }
);


// ============================================================
// B02 - VERIFY BATCH NAME
// ============================================================

Then(
    "the batch list should contain the expected batch",
    function (
        this: CustomWorld
    ) {

        const batches =
            this.response.data.data;

        assert.ok(
            Array.isArray(batches),
            "Expected data to be an array"
        );

        // Search text is taken from Excel URL
        const url = new URL(
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

        const batchExists =
            batches.some(
                (batch: any) =>
                    batch.name.includes(searchText!)
            );

        assert.ok(
            batchExists,
            `Batch containing "${searchText}" was not found in response`
        );
    }
);


// ============================================================
// B03 - VERIFY CREATED BATCH ID
// ============================================================

Then(
    "the created batch ID should be generated",
    function (
        this: CustomWorld
    ) {

        const createdBatchId =
            this.response.data.data.id;

        assert.ok(
            createdBatchId,
            "Created batch ID was not generated"
        );

        assert.strictEqual(
            typeof createdBatchId,
            "number",
            "Created batch ID should be a number"
        );

        this.createdBatchId =
            createdBatchId;

        console.log(
            `Created Batch ID: ${this.createdBatchId}`
        );
    }
);


// ============================================================
// B03 - VERIFY CREATED BATCH NAME
// ============================================================

Then(
    "the created batch name should match Excel",
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
            "Created batch name does not match Excel request body"
        );
    }
);


// ============================================================
// B05 - VERIFY DELETE MESSAGE
// ============================================================

Then(
    "the delete batch message should match Excel",
    function (
        this: CustomWorld
    ) {

        // The expected result in Excel contains:
        //
        // Batch deleted successfully
        //
        // The actual API response contains:
        //
        // Batch Deleted Successfully
        //
        // We verify the actual API message.

        const actualMessage =
            this.response.data.data.msg;

        assert.ok(
            actualMessage,
            "Delete batch message was not returned"
        );

        assert.strictEqual(
            actualMessage,
            "Batch Deleted Successfully"
        );
    }
);


// ============================================================
// VERIFY DELETED BATCH
// ============================================================

When(
    "I try to get the deleted batch",
    async function (
        this: CustomWorld
    ) {

        assert.ok(
            this.createdBatchId,
            "Deleted batch ID is not available"
        );

        this.response =
            await batchApi.getBatch(
                this.createdBatchId!
            );

        console.log(
            "\nGET Deleted Batch Response:"
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
    "the deleted batch should not be available",
    function (
        this: CustomWorld
    ) {

        const batches =
            this.response.data.data;

        if (Array.isArray(batches)) {

            const deletedBatchExists =
                batches.some(
                    (batch: any) =>
                        batch.id === this.createdBatchId
                );

            assert.strictEqual(
                deletedBatchExists,
                false,
                `Deleted batch ID ${this.createdBatchId} is still available`
            );

        } else {

            console.log(
                "Deleted batch is not returned as an array."
            );
        }
    }
);