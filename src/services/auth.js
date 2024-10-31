import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import crypto from 'node:crypto';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/time.js';

const createSession = () => ({
  accessToken: crypto.randomBytes(16).toString('base64'),
  refreshToken: crypto.randomBytes(16).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
});
export const refreshSession = async (sessionId, sessionToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const now = new Date();

  if (session.refreshTokenValidUntil < now) {
    throw createHttpError(401, 'Refresh token expired');
  }

  await Session.deleteOne({ _id: sessionId, refreshToken: sessionToken });

  const newSession = await Session.create({
    userId: session.userId,
    ...createSession(),
  });

  return newSession;
};
