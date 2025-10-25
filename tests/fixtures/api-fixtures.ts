import { test as base} from "@playwright/test";
import { ApiHelper } from "../helpers/ApiHelper";
import { DepartmentsEndpoint } from "../helpers/DepartmentsEndpoint";
import { EmployeesEndpoint } from "../helpers/EmployeesEndpoint";
import { LocationsEndpoint } from "../helpers/LocationsEndpoint";
import { JobsEndpoint } from "../helpers/JobsEndpoint";

type ApiFixtures = {
    apiHelper: ApiHelper;
    departments: DepartmentsEndpoint;
    employees: EmployeesEndpoint;
    locations: LocationsEndpoint;
    jobs: JobsEndpoint;
};

// Extend Playwright's test
export const test = base.extend<ApiFixtures>(
    {
        apiHelper: async({request},use) => {
            const helper = new ApiHelper(request);
            await use(helper);
        },
        departments: async ({apiHelper}, use) =>{
            const depts = new DepartmentsEndpoint(apiHelper);
            await use(depts);
        },        
        employees: async ({apiHelper}, use) =>{
            const emps = new EmployeesEndpoint(apiHelper);
            await use(emps);
        },
        locations: async ({apiHelper}, use) =>{
            const locs = new LocationsEndpoint(apiHelper);
            await use(locs);
        },
        jobs: async ({ apiHelper }, use ) =>{
            const jobs = new JobsEndpoint(apiHelper);
            await use(jobs);
        }
        
    }

)