import * as dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  expiresIn: '1h', // thời gian hết hạn của token
};
