import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    baseURL: process.env.API_BASE_URL
    // If you do have an additional env. variables in .env file, you could import it here for all the project.
    
}