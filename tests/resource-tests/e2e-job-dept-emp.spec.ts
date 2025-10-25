import { test } from "../fixtures/api-fixtures";
import { expect } from "@playwright/test";
import { CommonUtils } from "../utils/CommonUtils";

test.describe("E2E Test Flow Including Jobs", ()=>{
    test("Job → Department → Employee", 
        async ({ employees, departments, jobs}) =>{
            const jobPayload = CommonUtils.createJobsPayload();
            const payloadJobID = jobPayload.job_id;

            const jobCreateResp = await jobs.create(jobPayload, 201);
            expect(jobCreateResp.job_id).toBe(payloadJobID);

        // A new job with job id (payloadJobID) is created.

        // Following this we are going to create a new department

        const depPayload = CommonUtils.createDepPayload();
        const payloadDepID = depPayload.department_id;

        const depCreateResp = await departments.create(depPayload,201);
        expect(depCreateResp.department_id).toBe(payloadDepID);

        // A new department with payloadDepID is created


        // Following, we have to create a new employee within the new department and 
        // new job. 

        const empPayload = CommonUtils.createEmpPayload(
            undefined, payloadDepID, undefined,undefined,payloadJobID
        );
        const empCreateResp = await employees.create(empPayload,201);
        expect(empCreateResp.department_id).toBe(payloadDepID);
        expect(empCreateResp.job_id).toBe(payloadJobID);

        await employees.deleteResource(empCreateResp.employee_id, 200);
        await departments.deleteResource(payloadDepID,200);
        await jobs.deleteResource(payloadJobID,200);


            
        }
)
})