import { BaseEndpoint } from "./BaseEndpoint";

export interface Department{
            department_id: number,
            department_name: string,
            location_id?:number | null,
            manager_id?:number  | null
}

export class DepartmentsEndpoint extends BaseEndpoint<Department>{
    protected basePath= '/api/departments';
    
    protected requiredFields =[
          "department_id",
            "department_name"
    ];

}