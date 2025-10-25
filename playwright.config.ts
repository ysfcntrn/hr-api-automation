import { defineConfig } from '@playwright/test';

export default defineConfig(
    {
        testDir: './tests',
        timeout: 10000,
        fullyParallel: true,
        reporter: [
            [ 'html' ],
            [ 'json', {outputFile: 'test-results/results.json'} ],
            ['junit', {outputFile: 'test-results/results.xml'}]
        ],
        use: {
            baseURL: process.env.API_BASE_URL || 'http://54.158.33.192:8000/api',
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'off'
    },
    projects:[
        {
            name: 'HR-API-Tests-Staging',
            testMatch: '**/*.spec.ts'
        }
    ],
    outputDir: 'test-results'


}
);