# Test Data Management
- When we test APIs, we often create new records during tests. 
However, if we don't delete them after the test execution we end up polluting our database with test data. To avoid this situation, we can create clean up data automatically before or after we run tests. 

# Playwright Test Lifecycle Hooks
- Playwright uses lifecyle hooks to run code at specific time of the test execution: 
    * `test. beforeAll()` -> Runs once before all tests in the suite. Commonly used
    for setting up global test data. 
    * `test.afterAll()` -> Runs once after all tests in the suite. Commonly used for 
    clenup task after the tests. 
    * `test.beforeEach()` -> Runs before every individual tests. Reset data or authenticate if needed. 
    * `test.afterEach()` -> Runs after every test, cleans temporary data. 

- Syntax 
```js
import {test} from "@playwright/test"

test.describe("Example Suite", () =>{
test.beforeAll(async () => {
    // Code here runs before all tests. 
});
test.beforeEach(async () => {
    // Code here runs before every tests. 
});test.afterAll(async () => {
    // Code here runs after all tests. 
});
test.afterEach async () => {
    // Code here runs after each tests. 
});
})
```

## Understand Scope in Playwright
* Every `test.describe()` block has its own lifecycle hooks:
    - `beforeAll`, `afterAll`, `beforeEach`, `afterEach` these only apply 
    within that describe block or within that single test file if used outside of describe. 
* These don't share state or hooks between files automatically.
* So if you have: 
```ts
//file1.spec.ts
test.describe("Employees Suite", () => {
    test.beforeAll(() => { // your code 
    });
})
//file2.spec.ts
test.describe("Departments Suite", () => {
    test.beforeAll(() => { // your code to setup departments
    });
})
```
- Playwright runs the before all methods above independently for each test suite. 

## Managing Hooks Across Multiple Files
- If you want shared setup/teardown logic across multiple files, there is 
3 patterns to choose from. 

* **Option 1 -- Use a Playwrigth Fixture**
    - Fixtures are the PLaywright-approved way to share setup across multiple files. 
    * **Example: shared `test` fixture**
    * // my-fixture.ts
    ```ts 
    import { test as base } from "@playwright/test" 

    // Define extra data or objects you want available in all test files. 
    type MyFixtures = {
        someData: string
    };

    // Extend the base test
    export const test = base.extend<MyFixtures>(
        {
            // Fixture definition
            someData: async({}, use) =>{
                console.log("Setup Runs");
                await use("THis is shared data"); // makes it available in tests. 
                console.log("cleanup");
            }
        }
    );
    ```
    * TO use the fixture
    ```ts
    import {test } from "./my-fixture"
    test("use shared data", async({someData})=>{
        // Regular test code
        console.log(someData); // -> Shared data
    })
    ```

* *Option 2 -- Global Setup & Teardown*
- Used when you need something to happen once for the entire test run, before and after
all tests. 

- Basic Syntax
```ts
// global-setup.ts
async function globalSetup(){
    //. your setup code to run before all tests
};

export default globalSetup;

// Another file
// global-teardown.ts
async function globalTeardown(){
    // your after all implementation.
}

export default globalTeardown;

```
     * Link These setup and teardown files in the playwright config file. 
```ts
     // const config = {
        globalSetup: "./global-setup.ts"
        globalTeardown: ".global-teardown.ts"
     }
```

## Implementation
* Let's see how we can implement these additional managements in our framework and improve

In every file/test we use the code below repeatedly
```ts
     const apiHelper = new ApiHelper(request);
            const departments = new DepartmentsEndpoint(apiHelper);
            const employees = new EmployeesEndpoint(apiHelper);
            const locations = new LocationsEndpoint(apiHelper);
```

### The **Problem**
When multiple test files do the same setup: 
    * Code duplication -> more lines to maintain
    * Longer test runtime -> each file creates new data even if same setup
    * Hard to debug -> Every file handles cleanup separately. 
    * More api call -> extra loads on the backedn. 
    * MOre prone to inconsistent setups. 
### The **Goal**
Centralize setup and clean up logic so that tests focus only on business logic 
not the setups. 

#### Method 1: Fixtures
What we want: 
    * Reusable, automatically provided test objects(`apiHelper`, `departments`, `employees`). 
    * Automatic cleanup after all tests in that worker to finish. 


# Task 
* Extend our existing Playwright API automation framework by adding a new JobsEndpoint, a corresponding fixture in api-fixtures.ts, and an E2E test that performs the following flow:
    - Create a Job → Create a Department → Create an Employee under that Department & Job → Validate all relationships → Clean up created data.

