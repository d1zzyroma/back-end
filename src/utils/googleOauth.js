import { OAuth2Client } from 'google-auth-library';
import fs from 'node:fs';
import path from 'node:path';
import { env } from './env.js';
import { GOOGLE_OAUTH } from '../constants/index.js';
import createHttpError from 'http-errors';

const googleConfigPath = path.join(process.cwd(), 'google.json');

const googleOauthParams = JSON.parse(
  fs.readFileSync(googleConfigPath).toString(),
);

const oauthClient = new OAuth2Client({
  projectId: googleOauthParams.web.project_id,
  clientId: env(GOOGLE_OAUTH.CLIENT_ID),
  clientSecret: env(GOOGLE_OAUTH.SECTRET),
  redirectUri: env(GOOGLE_OAUTH.REDIRECT_URI),
});

export const verifyCode = async (code) => {
  try {
    const ticket = await oauthClient.verifyIdToken({
      idToken: code});
    return ticket.payload;
  } catch (err) {
    if (err.status === 400) {
      throw createHttpError(err.status, 'Token is invalid');
    }
    throw createHttpError(500, 'Something is wrong with Google Oauth!');
  }
};
