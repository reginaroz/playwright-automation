import * as dotenv from 'dotenv';
import * as path from 'path';

interface EnvConfig {
	adminUsername: string;
	adminPassword: string;
	candidateEmail: string;
	candidatePassword: string;
	baseUrl: string;
}

// Load environment variables from .env file (will override existing env variables)
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });

export const env: EnvConfig = {
	adminUsername: process.env.ADMIN_USERNAME || '',
	adminPassword: process.env.ADMIN_PASSWORD || '',
	candidateEmail: process.env.CANDIDATE_EMAIL || 'candidate_user@cymulate1.com',
	candidatePassword: process.env.CANDIDATE_PASSWORD || 'F11*cz)i#.0B',
	baseUrl: process.env.BASE_URL || 'https://app.cymulate.com',
};

export default env;