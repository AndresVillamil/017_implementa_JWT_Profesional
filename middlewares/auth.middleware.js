import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const validateAccessToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader)
            return res.status(401).json({ message: 'Token requerido' });

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};