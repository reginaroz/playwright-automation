import { APIRequestContext, test } from '@playwright/test';
import { env } from '../utils/env-setup';

export class LoginRequest {
  private baseURL = env.baseUrl;
  

  constructor(private request: APIRequestContext) {}

  async loginWithEmailPassword(email: string, password: string) {
    return test.step('API Login with Email and Password', async () => {
      const response = await this.request.post(`${this.baseURL}/api/token`, {
        form: {
          email,
          password,
        },
      });

      if (!response.ok()) {
        throw new Error(`Login failed with status ${response.status()}: ${await response.text()}`);
      }

      return response;
    });
  }

  async loginAsCandidate() {
    return test.step('API Login as Candidate User', async () => {
      return this.loginWithEmailPassword(env.candidateEmail, env.candidatePassword);
    });
  }
}
