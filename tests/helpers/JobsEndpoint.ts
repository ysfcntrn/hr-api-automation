import { BaseEndpoint } from "./BaseEndpoint";

export interface Job {
      job_id: string;
      job_title: string;
      min_salary?: number | null;
      max_salary?: number | null;
  }

export class JobsEndpoint extends BaseEndpoint<Job> {
    protected requiredFields = [
        "job_id", "job_title"
    ];
    protected basePath = "api/jobs"
}