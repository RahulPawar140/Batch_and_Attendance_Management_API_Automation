import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../utils/world";
import assert from "assert";
import { CourseApi } from "../api/courseApi";
import { getTestCase } from "../utils/excelReader";

const courseApi = new CourseApi();


// ====================================================
// Helper Function
// Extract Course ID from Excel Endpoint
// ====================================================

function extractCourseId(endpointUrl: string): number {

    // ------------------------------------------------
    // Case 1:
    // Endpoint contains actual Course ID
    //
    // Example:
    // /courses/get_course/2
    // ------------------------------------------------

    const actualIdMatch =
        endpointUrl.match(
            /\/get_course\/(\d+)/
        );

    if (actualIdMatch) {

        return Number(
            actualIdMatch[1]
        );
    }


    // ------------------------------------------------
    // Case 2:
    // Excel contains placeholder
    //
    // Example:
    // /courses/get_course/[course_id] eg: 2
    // ------------------------------------------------

    const exampleIdMatch =
        endpointUrl.match(
            /eg:\s*(\d+)/
        );

    if (exampleIdMatch) {

        return Number(
            exampleIdMatch[1]
        );
    }


    // ------------------------------------------------
    // Course ID could not be extracted
    // ------------------------------------------------

    throw new Error(
        `Course ID could not be extracted from endpoint: ${endpointUrl}`
    );
}


// ====================================================
// Background
// ====================================================

Given(
    "the Course API service is available",
    async function () {

        console.log(
            "========================================"
        );

        console.log(
            "Course API Test Started"
        );

        console.log(
            "========================================"
        );
    }
);


// ====================================================
// COU011 - GET COURSE BY ID
// ====================================================

When(
    'I send a GET course request for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase =
            getTestCase(testCaseId);


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


        // Extract Course ID from Excel
        const courseId =
            extractCourseId(
                testCase.endpointUrl
            );


        console.log(
            `Course ID extracted from Excel: ${courseId}`
        );


        // Send GET request
        this.response =
            await courseApi.getCourse(
                courseId
            );


        console.log(
            "\nGET Course Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );


        // Store Excel test case in World
        this.testCase = testCase;
    }
);


// ====================================================
// COU012 - GET COURSE LIST
// ====================================================

When(
    'I send a GET course list request for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase =
            getTestCase(testCaseId);


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


        // ------------------------------------------------
        // Extract query parameters from Excel URL
        // ------------------------------------------------

        const url =
            new URL(
                testCase.endpointUrl
            );


        const params = {

            page_size:
                Number(
                    url.searchParams.get(
                        "page_size"
                    )
                ),

            sort_order:
                url.searchParams.get(
                    "sort_order"
                ) || "",

            page_index:
                Number(
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


        // Send GET request
        this.response =
            await courseApi.getCourseList(
                params
            );


        console.log(
            "\nGET Course List Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );


        // Store test case
        this.testCase = testCase;
    }
);


// ====================================================
// COU013 - CREATE COURSE
// ====================================================

When(
    'I send a POST course request for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase =
            getTestCase(testCaseId);


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


        // ------------------------------------------------
        // Read Request Body from Excel
        // ------------------------------------------------

        const requestBody =
            JSON.parse(
                testCase.requestBodyParams
            );


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


        // Send POST request
        this.response =
            await courseApi.createCourse(
                requestBody
            );


        console.log(
            "\nCREATE Course Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );


        // Store test case
        this.testCase = testCase;
    }
);


// ====================================================
// COU014 - UPDATE COURSE
// ====================================================

When(
    'I send a PUT course request for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase =
            getTestCase(testCaseId);


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


        // ------------------------------------------------
        // Read Update Request Body from Excel
        // ------------------------------------------------

        const requestBody =
            JSON.parse(
                testCase.requestBodyParams
            );


        console.log(
            "\nUpdate Request Body read from Excel:"
        );

        console.log(
            JSON.stringify(
                requestBody,
                null,
                2
            )
        );


        // Send PUT request
        this.response =
            await courseApi.updateCourse(
                requestBody
            );


        console.log(
            "\nUPDATE Course Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );


        // Store test case
        this.testCase = testCase;
    }
);


// ====================================================
// COU015 - DELETE COURSE
// ====================================================

When(
    'I create a temporary course for Excel test case {string}',
    async function (
        this: CustomWorld,
        testCaseId: string
    ) {

        const testCase =
            getTestCase(testCaseId);


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


        // ------------------------------------------------
        // Create temporary course
        //
        // Delete test case does not contain a request
        // body, therefore we use temporary data only
        // for preparing the DELETE test.
        // ------------------------------------------------

        const temporaryCourse = {

            name:
                "API Automation Delete Test Course",

            description:
                "Temporary course created for DELETE API automation testing"
        };


        console.log(
            "\nTemporary Course Request Body:"
        );

        console.log(
            JSON.stringify(
                temporaryCourse,
                null,
                2
            )
        );


        // Create temporary course
        this.response =
            await courseApi.createCourse(
                temporaryCourse
            );


        console.log(
            "\nCREATE Temporary Course Response:"
        );

        console.log(
            JSON.stringify(
                this.response.data,
                null,
                2
            )
        );


        // Get generated Course ID
        const createdCourseId =
            this.response.data.data.id;


        assert.ok(
            createdCourseId,
            "Temporary course ID was not generated"
        );


        this.createdCourseId =
            createdCourseId;


        console.log(
            `Temporary Course ID: ${this.createdCourseId}`
        );


        // Store Excel test case
        this.testCase = testCase;
    }
);


// ----------------------------------------------------
// Delete created Course
// ----------------------------------------------------

When(
    "I delete the created course",
    async function (
        this: CustomWorld
    ) {

        assert.ok(
            this.createdCourseId,
            "Created course ID is not available"
        );


        console.log(
            `\nDeleting Course ID: ${this.createdCourseId}`
        );


        // Send DELETE request
        this.response =
            await courseApi.deleteCourse(
                this.createdCourseId!
            );


        console.log(
            "\nDELETE Course Response:"
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


// ====================================================
// COMMON HTTP STATUS CODE VALIDATION
// ====================================================

Then(
    "the Course response HTTP status code should match Excel",
    function (
        this: CustomWorld
    ) {

        const expectedStatus =
            parseInt(
                this.testCase.expectedStatusCode
            );


        console.log(
            `Expected HTTP Status Code from Excel: ${expectedStatus}`
        );

        console.log(
            `Actual HTTP Status Code: ${this.response.status}`
        );


        assert.strictEqual(
            this.response.status,
            expectedStatus
        );
    }
);


// ====================================================
// RESPONSE STATUS VALIDATION
// ====================================================

Then(
    'the Course response status should be {string}',
    function (
        this: CustomWorld,
        expectedStatus: string
    ) {

        assert.strictEqual(
            this.response.data.status,
            expectedStatus
        );
    }
);


// ====================================================
// ERROR VALIDATION
// ====================================================

Then(
    "the Course response error should be null",
    function (
        this: CustomWorld
    ) {

        assert.strictEqual(
            this.response.data.error,
            null
        );
    }
);


// ====================================================
// ERROR CODE VALIDATION
// ====================================================

Then(
    "the Course response errorCode should be {int}",
    function (
        this: CustomWorld,
        expectedErrorCode: number
    ) {

        assert.strictEqual(
            this.response.data.errorCode,
            expectedErrorCode
        );
    }
);


// ====================================================
// COU011 - VERIFY COURSE ID
// ====================================================

Then(
    'the Course response should contain course ID {int}',
    function (
        this: CustomWorld,
        expectedCourseId: number
    ) {

        const courses =
            this.response.data.data;


        assert.ok(
            Array.isArray(courses),
            "Expected data to be an array"
        );


        const courseExists =
            courses.some(
                (course: any) =>
                    course.id === expectedCourseId
            );


        assert.ok(
            courseExists,
            `Course ID ${expectedCourseId} was not found in response`
        );
    }
);


// ====================================================
// COU012 - VERIFY COURSE NAME
// ====================================================

Then(
    'the Course list response should contain course {string}',
    function (
        this: CustomWorld,
        expectedCourseName: string
    ) {

        const courses =
            this.response.data.data;


        assert.ok(
            Array.isArray(courses),
            "Expected data to be an array"
        );


        const courseExists =
            courses.some(
                (course: any) =>
                    course.name === expectedCourseName
            );


        assert.ok(
            courseExists,
            `Course "${expectedCourseName}" was not found in response`
        );
    }
);


// ====================================================
// COU013 - VERIFY CREATED COURSE ID
// ====================================================

Then(
    "the created Course ID should be generated",
    function (
        this: CustomWorld
    ) {

        const createdCourseId =
            this.response.data.data.id;


        assert.ok(
            createdCourseId,
            "Created Course ID was not generated"
        );


        assert.strictEqual(
            typeof createdCourseId,
            "number",
            "Created Course ID should be a number"
        );


        this.createdCourseId =
            createdCourseId;


        console.log(
            `Created Course ID: ${this.createdCourseId}`
        );
    }
);


// ====================================================
// COU013 - VERIFY CREATED COURSE NAME
// ====================================================

Then(
    'the created Course name should be {string}',
    function (
        this: CustomWorld,
        expectedCourseName: string
    ) {

        assert.strictEqual(
            this.response.data.data.name,
            expectedCourseName
        );
    }
);


// ====================================================
// COU014 - VERIFY UPDATED COURSE
// ====================================================

Then(
    'the updated Course name should be {string}',
    function (
        this: CustomWorld,
        expectedCourseName: string
    ) {

        assert.strictEqual(
            this.response.data.data.name,
            expectedCourseName
        );
    }
);


// ====================================================
// COU015 - DELETE RESPONSE MESSAGE
// ====================================================

Then(
    'the delete Course message should be {string}',
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


// ====================================================
// COU015 - GET DELETED COURSE
// ====================================================

When(
    "I try to get the deleted course",
    async function (
        this: CustomWorld
    ) {

        assert.ok(
            this.createdCourseId,
            "Deleted course ID is not available"
        );


        this.response =
            await courseApi.getCourse(
                this.createdCourseId!
            );


        console.log(
            "\nGET Deleted Course Response:"
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


// ====================================================
// COU015 - VERIFY DELETED COURSE
// ====================================================

Then(
    "the deleted Course should not be available",
    function (
        this: CustomWorld
    ) {

        const courses =
            this.response.data.data;


        if (Array.isArray(courses)) {

            const deletedCourseExists =
                courses.some(
                    (course: any) =>
                        course.id === this.createdCourseId
                );


            assert.strictEqual(
                deletedCourseExists,
                false,
                `Deleted Course ID ${this.createdCourseId} is still available`
            );

        } else {

            console.log(
                "Deleted Course is not returned as an array."
            );
        }
    }
);