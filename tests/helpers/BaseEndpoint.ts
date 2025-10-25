import { ApiHelper } from "./ApiHelper";

export abstract class BaseEndpoint<T>{ 
    protected abstract basePath: string;
    protected abstract requiredFields: string[];

    constructor(protected apiHelper: ApiHelper){}

    async create(payload:Partial<T>, expectedStatus:number)
    :Promise<T>{
        const resp = await this.apiHelper.post(this.basePath,payload);
        console.log("Response Created: " + (await this.apiHelper.getJSON(resp)));
        await this.apiHelper.validateStatus(resp,expectedStatus);
        const body= (await this.apiHelper.getJSON(resp))['resource'];
        this.apiHelper.containsKey(body,this.requiredFields);
        return body as T;
    }

    async getResource(ID: number, expectedStatus: number): Promise<T> {
        const resp = await this.apiHelper.get(`${this.basePath}/${ID}`);
        await this.apiHelper.validateStatus(resp,expectedStatus);
        const body = (await this.apiHelper.getJSON(resp));
        this.apiHelper.containsKey(body,this.requiredFields);
        return body as T;
    }


    async update(
        ID:number, 
        payload:Partial<T>,
        fullUpdate: boolean,
        expectedStatus: number
    ): Promise<T>{
        const endpoint = `${this.basePath}/${ID}`;
        const resp = 
        fullUpdate ? 
        await this.apiHelper.put(endpoint,payload):
        await this.apiHelper.patch(endpoint,payload);
        await this.apiHelper.validateStatus(resp,expectedStatus);
        return await this.apiHelper.getJSON(resp) as T;
    }

        async deleteResource(ID: number | string, expectedStatus: number):Promise<any>{
        const resp = await this.apiHelper.delete(`${this.basePath}/${ID}`);
        await this.apiHelper.validateStatus(resp,expectedStatus);
        return await this.apiHelper.getJSON(resp);
    }






}