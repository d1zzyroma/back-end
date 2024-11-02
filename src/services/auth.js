import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import crypto, { randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/time.js';
import { User } from '../db/models/user.js';

// ----- User Register -----
export const registerUser = async (registrationData) => {
  const user = await User.findOne({ email: registrationData.email });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(registrationData.password, 10);

  return await User.create({
    ...registrationData,
    password: encryptedPassword,
  });
};

// ----- User Login and Create Session -----
export const loginUser = async (loginData) => {
  const user = User.findOne({ email: loginData.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(loginData.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Not authorized');
  }

  await User.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });

  return session;
};

// ----- User Logout -----
export const logoutUser = async (sessionid) => {
  await User.deleteMany({ _id: sessionid });
};

const createSession = () => ({
  accessToken: crypto.randomBytes(16).toString('base64'),
  refreshToken: crypto.randomBytes(16).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
});

// ----- Refresh session -----
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
