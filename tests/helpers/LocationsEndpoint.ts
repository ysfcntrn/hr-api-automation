import { BaseEndpoint } from "./BaseEndpoint";

export interface Location{
    location_id: number;
    street_address?: string | null;
    postal_code? : string | null;
    city: string;
    state_province?: string | null;
    country_id?: string | null;
}
export class LocationsEndpoint extends BaseEndpoint<Location>{
    protected basePath = "/api/locations";
    protected requiredFields = ['location_id', 'city'];
    
}