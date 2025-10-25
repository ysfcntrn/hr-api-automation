import { BaseEndpoint } from "./BaseEndpoint";

export interface Employee{
    // Optional values for the employees are written with question mark which shows
    // they could be empty(null)
    employee_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    hire_date: string;
    job_id: string | null;
    commission_pct?: number | null;
    manager_id?: number | null;
    department_id?: number | null;
    salary: number
}

export class EmployeesEndpoint extends BaseEndpoint<Employee>{
    // Base path for all employees
    protected basePath = '/api/employees';
    // List of required values in employee response
    protected requiredFields = [
        'employee_id',
        'first_name',
        'last_name',
        'email',
        'hire_date',
        'job_id',
        'salary'
    ];

}