/*
API HELPER CLASS 
Making API testing easier by providing simple, reusable methods for common API operations. 

Why Do We Need it? 
WIthout this class, we would have to writ ethe same vcode over and over in every test, with this helper, 
we will write it once and use it everywhere in the project. 

What you will learn? 
    - How to make API calls GET, POST, PUT, PATCH, DELETE
    - How to handle API responses. 
    - How to validate API Responses
*/
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

/*
Class Definition
Think of this class as the toolbox of API testing in this framework. 
Each method will be a tool for us to use through out the project. 
*/ 

export class ApiHelper{
    /*
     CONSTRUCTOR
    It runs when you create a new ApiHelper instance.

    WHAT IT DOES? 
    It will receive Playwright's request object (the thing that will make the API call)
    Stores the object so all methods can use it. 

    HOW YOU WILL USE IT IN TESTS? 
        const apiHelper = new ApiHelper(request);
        // now apiHelper is ready to make API calls. 
    */
   constructor( private request: APIRequestContext){}    

   /* 
   GET
   Get Method -> Retrieve the object from server
   What it does? 
    1. Makes a get request to the endpoint
    2. Waits for server's response
    3. Returns the response so we can check it. 

   PARAMETERS
    - endpoint
    - options: Optional settings like headers, query parameters, etc. 

    Syntax: 
    */
   async get(endpoint: string, options = {}){
    const response = await this.request.get(endpoint,options);
    return response;
   }

   /*
   POST METHOD
   - Use this when new data needs to be created in API endpoint/resource. 

   WHAT IT DOES? 
   1. Packages your data into a request.
   2. Sends it to the server to create a new resource. 
   3. Returns the servers's response(usually includes the created item. )

   PARAMETERS
   - endpoint
   - data: The information you want to create(json body)
   - options: Optional settings like headers, query parameters, etc. 
*/
   async post (endpoint: string, data: any, options= {}){
    const response = await this.request.post(endpoint,{
        data,
        ...options
    });
    return response;
   }

      /*
   PUT METHOD
   - Use this when existing data needs to be completely updated in API endpoint/resource. 

   WHAT IT DOES? 
   1. Packages your data into a request.
   2. Replaces the entire existing resource with your new data.
   3. Returns the servers's response(usually includes the updated item. )

   PARAMETERS
   - endpoint
   - data: The information you want to create(json body)
   - options: Optional settings like headers, query parameters, etc. 
*/
   async put (endpoint: string, data: any, options= {}){
    const response = await this.request.put(endpoint,{
        data,
        ...options
    });
    return response;
   }
      /*
   PATCH METHOD
   - Use this when existing data needs to be updated in API endpoint/resource. 

   WHAT IT DOES? 
   1. Packages your data into a request.
   2. Updates the existing resource with your new data.
   3. Returns the servers's response(usually includes the updated item. )

   PARAMETERS
   - endpoint
   - data: The information you want to create(json body)
   - options: Optional settings like headers, query parameters, etc. 
*/
   async patch (endpoint: string, data: any, options= {}){
    const response = await this.request.patch(endpoint,{
        data,
        ...options
    });
    return response;
   }

         /*
   DELETE METHOD
   - Use this when existing data needs to be removed in API endpoint/resource. 

   WHAT IT DOES? 
   1. Sends a request to delete the specified resource
   2. Server removes the resource if successful
   3. Returns the confirmation response with usually 204 status code.

   PARAMETERS
   - endpoint
   - options: Optional settings like headers, query parameters, etc. 
*/
   async delete (endpoint: string, options= {}){
    const response = await this.request.delete(endpoint,options);
    return response;
   }

/* ADDITIONAL VALIDATION HELPERS */

/* GET JSON METHOD - Convert Response object to the JavaScript object. 

Use this to EXTRACT data from an API response.

WHAT IT DOES?
1. Takes an API response which is in JSON text format
2. Converts it to a JavaScript Object you can work with
3. Returns the pased data. 
*/
async getJSON(response: APIResponse){
    return await response.json();
}

/* VALIDATE STAUS METHOD - Check if the response is correct.
Use this to verify that the API responded with the expected status code.

parameters: 
- response: The API response to validate.
- expectedStatus: The HTTP status co0de you expect.
*/
async validateStatus(response: APIResponse, expectedStatus: number){
    expect(response.status()).toBe(expectedStatus);
}

/* Contains Key Method 
Use this to verify that JSON response contains expected properties/keys

What it does: 
1. Takes a JSON object and keys to check
2. Verifies the key exist in the response
3. Optionally check if the key has a specific value
4. Can check single key or multiple keys at the same time.

PARAMETERS: 
- data: The JSON object ot check usually from getJSON()
- key: Single key or mulitple kyes(string array/list)
- expectedValue: (Optional): If porivided also check the value matches. 

*/ 

async containsKey(data: any, key: string | string[], expectedValue?:any ){
    "If more than one key and expected value is provided the order of keys should match the order of expectedValues";
    if( typeof key === 'string' ){
        expect(data).toHaveProperty(key);
        // if expected value provided check that as well
        if (expectedValue !== undefined){
            expect(data[key]).toEqual(expectedValue);
        }
    }// handle multiple key values provide
    else if (Array.isArray(key)){
        for (const k of key){
            expect(data).toHaveProperty(k);
        }
        if (expectedValue !== undefined
             && Array.isArray(expectedValue)
             && key.length === expectedValue.length
            ){
             for (let i = 0; i<key.length; i++){
            expect(data[key[i]]).toEqual(expectedValue[i]);
        }
            
        }
    }
}




}