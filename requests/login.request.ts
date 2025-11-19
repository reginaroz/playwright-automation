import { APIRequestContext, test } from "@playwright/test";
import { env } from "../utils/env-setup";

export class LoginRequest {
    constructor(private request: APIRequestContext) {}

    async loginAsAdmin() {
        return test.step('API Login as Admin', async()=>{
        const response = await this.request.post('/api/login', {
            data: { 
username: env.adminUsername, 
password: env.adminPassword 

            }
        });
            if (!response.ok()) {
                throw new Error(`Login failed with status ${response.status()}`);   
            }
        return response;
        
    })
}
async openURLAndLogin(){
    return test.step('Open base URL and Login as Admin', async() =>{
        await Promise.all([
            this.request.get('/loginPage'),
            this.loginAsAdmin(),

        ])
    })
}
}
