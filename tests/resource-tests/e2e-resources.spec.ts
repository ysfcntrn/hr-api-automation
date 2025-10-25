import {expect} from "@playwright/test";
import { Department } from "../helpers/DepartmentsEndpoint";
import { Employee} from "../helpers/EmployeesEndpoint";
import { Location } from "../helpers/LocationsEndpoint";
import { CommonUtils } from "../utils/CommonUtils";
import {test } from "../fixtures/api-fixtures"

const makeUniqueEmpId = () => `${Date.now().toString().slice(-6)}${Math.floor(Math.random()*900).toString().padStart(3,'0')}`;
const makeUniqueDepId = () => Math.floor(Math.random() * 10000).toString().padStart(3, '0');

test.describe("E2E Department & Employee Relation Scenarios",()=>{
    test("Create Department -> Create Emp -> Delete Emp", 
        async({departments,apiHelper,employees})=>{
        
            // Create a department
            const unique = makeUniqueDepId();
                        const Department_id = Number(`${unique}`);
                        console.log(Department_id);
                        const depPayload = {
                            department_id: Department_id,
                            department_name: `QA${unique}`
                        }
            
                        const createdDep = await departments.create(depPayload,201);
                        expect(Department_id).toEqual(createdDep.department_id);

            const uniqueEmp = makeUniqueEmpId();
                    const employeeID = Number(`9${uniqueEmp}`.slice(0,6));
                    const empPayload: Partial<Employee> = {
                        employee_id: employeeID,
                        first_name: 'PW',
                        last_name: `Tester${unique}`,
                        email: `${uniqueEmp}`,
                        hire_date: new Date().toISOString().slice(0,10), // YYYY-MM-DD
                        job_id: 'IT_PROG',
                        salary: 4500,
                        department_id: Department_id
                    };
        
            
                    const createdEmp = await employees.create(empPayload,201);
                    await apiHelper.containsKey(createdEmp,'employee_id',employeeID);

                    const delResp = await apiHelper.delete(`/api/employees/${employeeID}`);

                    expect(delResp.status()).toBe(200);
                    expect(await apiHelper.getJSON(delResp)).toHaveProperty('message');

        }),
        test("Create Department -> Create Emp -> Delete Dep - Neg", 
        async({departments,employees,apiHelper})=>{
            // Initialize the helpers
        
            // Create a department
            const unique = makeUniqueDepId();
                        const Department_id = Number(`${unique}`);
                        console.log(Department_id);
                        const depPayload = {
                            department_id: Department_id,
                            department_name: `QA${unique}`
                        }
            
                        const createdDep = await departments.create(depPayload,201);
                        expect(Department_id).toEqual(createdDep.department_id);

            const uniqueEmp = makeUniqueEmpId();
                    const employeeID = Number(`9${uniqueEmp}`.slice(0,6));
                    const empPayload: Partial<Employee> = {
                        employee_id: employeeID,
                        first_name: 'PW',
                        last_name: `Tester${unique}`,
                        email: `${uniqueEmp}`,
                        hire_date: new Date().toISOString().slice(0,10), // YYYY-MM-DD
                        job_id: 'IT_PROG',
                        salary: 4500,
                        department_id: Department_id
                    };
        
            
                    const createdEmp = await employees.create(empPayload,201);
                    await apiHelper.containsKey(createdEmp,'employee_id',employeeID);

                    const delResp = await apiHelper.delete(`/api/departments/${Department_id}`);
                    expect(delResp.status()).toBe(400);
                    const delRespJson= await apiHelper.getJSON(delResp);
                    console.log("DEL RESP")
                    console.log(delRespJson);
                    expect(delRespJson.detail.message).
                    toBe("Cannot delete department: employees belong to this department.");


        })
        test('Validate Location Deletion Dependency Chain',
            async({locations,departments,employees,apiHelper}) =>{
                // Initialize the helpers

            // Step 1 create a new location
            const locPayload = CommonUtils.createLocPayload();
            const createdLocID = locPayload.location_id;
            const createdCityName = locPayload.city;
            console.log(locPayload);
            const locRespPayload = await locations.create(locPayload,201);
            expect(locRespPayload.location_id).toEqual(createdLocID);

            // Step 2 create a Dep. Under the location
            const depPayload = CommonUtils.createDepPayload(
                undefined,undefined,createdLocID,undefined);
            const createdDepID = depPayload.department_id;
            
            const depRespPayload = await departments.create(depPayload,201);
            expect(depRespPayload.location_id).toEqual(createdLocID);
            console.log(depRespPayload);
            // Step 3 create an employee under the department
            const empPayload = CommonUtils.createEmpPayload(undefined,createdDepID);
            console.log(empPayload);
            const createdEmpID = empPayload.employee_id;
            const empRespPayload = await employees.create(empPayload,201);
            console.log(empRespPayload);
            expect(empRespPayload.department_id).toEqual(createdDepID);

            // Step 4 Try deleting the lcoation (should fail)
            const delLoc = await apiHelper.delete(`/api/locations/${createdLocID}`);

            expect(delLoc.status()).toBe(400);

            const errorBody = await apiHelper.getJSON(delLoc);
            expect(errorBody.detail.message).
            toBe("Cannot delete location: departments exist at this location.");

            
            
            }
        )

})
;

// Create department, create an employee within the new department
// then delete the employee

// Create a department, create an employee within the new department
// then validate that trying to remove the department will result in error
// Validate that error message will contain detail section
// within the detail it should contain a message field with 
// "Cannot delete department: employees belong to this department."
// Status code is 400, '



/* Task
Check the e2e-resources.spec, employees.spec.ts, departments.spec.ts
and find what are the re-used codes, come up with a way to shorten the code
and create re-usable util methods. 

EmployeesEndpoint, DepartmentsEndpoint check what are commonly used in these two 
files and come up with a way to shorten each code. 
*/

/* Create another test using available common methods and if needs to be created new
Create a location, create a department under the location, 
create an employee under the department.
validate that you cannot delete location without deleting the department,]
then delete the employee and delete the department and validate that you can delete the 
locations.
*/