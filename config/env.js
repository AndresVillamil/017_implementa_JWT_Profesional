import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 2000,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET
};