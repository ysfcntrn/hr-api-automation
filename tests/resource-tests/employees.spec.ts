import {test} from "../fixtures/api-fixtures"
import { expect} from "@playwright/test";
import { Employee} from "../helpers/EmployeesEndpoint";
/*
create the employee -> get the created employee -> update the same employee -> delete it 
full workflow on the employee is executed 
*/

const makeUnique = () => `${Date.now().toString().slice(-6)}${Math.floor(Math.random()*900).toString().padStart(3,'0')}`;

test.describe('Employees API E2E', () =>{
    test('Create -> Get -> Patch -> Put -> Delete Employee Flow', async({employees})=>{
        // First initialize our helpers/utils
    
        // Build a payload with required field 
        const unique = makeUnique();
        const employeeID = Number(`9${unique}`.slice(0,6));
        const payload: Partial<Employee> = {
            employee_id: employeeID,
            first_name: 'PW',
            last_name: `Tester${unique}`,
            email: `${unique}`,
            hire_date: new Date().toISOString().slice(0,10), // YYYY-MM-DD
            job_id: 'IT_PROG',
            salary: 4500
        }

        // Just to track E2E process
        let createdEmployeeID: number;

        const created = await employees.create(payload,201);
        createdEmployeeID = created.employee_id;

        // Get The Created Employee Resource
        const fetched = await employees.getResource(createdEmployeeID,200);

        // Patch (partial Update) 
        const patchPayload = {salary: 5000, phone_number: '555-555-5555'};
        const patched = await employees.update(createdEmployeeID,patchPayload, false,200);

        // After the patch we want to make sure that employee has the updated values
        const afterPatch = await employees.getResource(createdEmployeeID,200);
        expect(afterPatch.salary).toBe(patchPayload.salary);
        expect(afterPatch.phone_number).toBe(patchPayload.phone_number);

        // PUT(full update) 
        const putPayload: Partial<Employee> = {
            employee_id: createdEmployeeID,
            first_name: 'PW-FUll',
            last_name: afterPatch.last_name,
            email: afterPatch.email,
            hire_date: afterPatch.hire_date,
            job_id: afterPatch.job_id,
            salary: 6000,
            phone_number: afterPatch.phone_number
        };
        const fullyUpdated = await employees.update(createdEmployeeID,putPayload,true,200);
        const verifyPut = await employees.getResource(createdEmployeeID,200);

        expect(verifyPut.salary).toBe(putPayload.salary);
        expect(putPayload.first_name).toBe(verifyPut.first_name);
  

        // Delete
        await employees.deleteResource(createdEmployeeID,200);


        



    })
})
