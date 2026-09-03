import {
    Before,
    After
} from "@cucumber/cucumber";

/*
|--------------------------------------------------------------------------
| Before Hook
|--------------------------------------------------------------------------
| Runs before every Cucumber scenario.
|--------------------------------------------------------------------------
*/

Before(async function () {

    console.log("\n----------------------------------------");
    console.log("Starting API Test");
    console.log("----------------------------------------");
});


/*
|--------------------------------------------------------------------------
| After Hook
|--------------------------------------------------------------------------
| Runs after every Cucumber scenario.
| Displays the scenario name and execution status.
|--------------------------------------------------------------------------
*/

After(async function (scenario) {

    console.log("----------------------------------------");

    console.log(
        `Scenario: ${scenario.pickle.name}`
    );

    console.log(
        `Status: ${scenario.result?.status}`
    );

    console.log("----------------------------------------\n");
});