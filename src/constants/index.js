//src/constants/index.js

// for Boards
import path from 'node:path';
//

export const ENV_VARS = {
  PORT: 'PORT',
};

export const MONGO_DB_VARS = {
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

// const for Boards
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

//
