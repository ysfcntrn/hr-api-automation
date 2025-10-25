export class CommonUtils{

    static makeUniqueEmpId = () => `${Date.now().toString().slice(-6)}${Math.floor(Math.random()*900).toString().padStart(3,'0')}`;
    static makeUniqueDepId = () => Math.floor(Math.random() * 10000).toString().padStart(3, '0');

    static createEmpPayload(
          first_name?: string,
          department_id?:number,
          last_name?:string,
          email?:string, 
          job_id?: string, 
          salary?: number, 
          commission_pct?: number,
          hire_date?: string
        ){
            const unique = CommonUtils.makeUniqueEmpId();
            return {
                employee_id: Number(`9${unique}`.slice(0,6)),
                first_name: first_name ?? "Auto",
                last_name: last_name ?? "Tester",
                email: email ?? `${unique}@example.com`,
                job_id: job_id ?? "IT_PROG",
                salary: salary ?? 5000,
                commission_pct: commission_pct ?? null,
                department_id: department_id ?? null,
                hire_date: hire_date ?? new Date().toISOString().slice(0, 10)
            }

    }

    static createDepPayload(
        department_id?: number,
        manager_id?: number,
        location_id?: number, 
        department_name?: string
    ){
            const unique = CommonUtils.makeUniqueDepId();


        return {
            department_id: department_id ?? Number(unique),
            department_name: department_name ?? `QA${unique}`,
            manager_id: manager_id ?? null, 
            location_id: location_id ?? null
        }
    }

    static createLocPayload(
        location_id?: number, 
        street_address?: string,
        postal_code?: string, 
        city?: string,
        state_province?: string, 
        country_id?: string
    ){
        const unique = CommonUtils.makeUniqueDepId();
        return{
            location_id: location_id ?? Number(unique),
            street_address: street_address ?? `Main St ${unique}`,
            postal_code:postal_code ?? `ZIP${unique}`,
            city: city ?? `City${unique}`,
            state_province: state_province ?? null,
            country_id: country_id ?? null
        }
    }

    static createJobsPayload(
        job_id?: string,
        job_title?: string,
        min_salary?: number | null,
        max_salary?: number | null
    ){
        const defaultJobID = `JB_${CommonUtils.makeUniqueDepId()}`;
        const defaultJobTitle = `JBTitle_${defaultJobID}`;
        return {
            job_id: job_id ?? defaultJobID,
            job_title: job_title ?? defaultJobTitle,
            min_salary: min_salary ?? 0,
            max_salary: max_salary ?? 0
        }

    }

}