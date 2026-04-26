import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const generateAccessToken = (payload) =>
    jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (payload) =>
    jwt.sign(payload, ENV.JWT_REFRESH_SECRET, { expiresIn: '7d' });