import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  adminUsername: process.env.ADMIN_USERNAME!,
  adminPassword: process.env.ADMIN_PASSWORD!,
};
