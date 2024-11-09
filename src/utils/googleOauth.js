import { OAuth2Client } from 'google-auth-library';
import fs from 'node:fs';
import path from 'node:path';
import { env } from './env.js';
import { MONGO_DB_VARS } from '../constants/index.js';

const googleConfigPath = path.join(process.cwd(), 'google.json');

const googleOauthParams = JSON.parse(
  fs.readFileSync(googleConfigPath).toString(),
);

const oauthClient = new OAuth2Client({
  projectId: googleOauthParams.web.project_id,
  clientId: env(MONGO_DB_VARS.GOOGLE_OAUTH_CLIENT_ID),
  clientSecret: env(MONGO_DB_VARS.GOOGLE_OAUTH_SECTRET),
  redirectUri: env(MONGO_DB_VARS.GOOGLE_OAUTH_REDIRECT_URI),
});

export const generateOauthLink = () => {
  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
};
