import { APIRequestContext, test } from '@playwright/test';
import { env } from '../utils/env-setup';

export class LoginRequest {
  private baseURL = env.baseUrl;

  constructor(private request: APIRequestContext) {}

  async loginWithEmailPassword(email: string, password: string) {
    return test.step('API Login with Email and Password', async () => {
      const response = await this.request.post(`${this.baseURL}/api/token`, {
        headers: {
          accept: '*/*',
          'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          origin: this.baseURL,
          referer: `${this.baseURL}/cym/login`,
          'x-requested-with': 'XMLHttpRequest',
        },
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
