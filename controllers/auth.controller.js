import { loginService } from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    // Simulación (reemplazar por BD)
    const user = {
        id: 1,
        username: 'edwin',
        password: '123456',
        role: 'admin'
    };

    if (username !== user.username || password !== user.password) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const { accessToken, refreshToken } = loginService(user);

    res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,        // 👈 localhost
    sameSite: 'lax',      // 👈 pruebas
    maxAge: 7 * 24 * 60 * 60 * 1000
});

    res.json({ accessToken });
};

export const refresh = (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token)
        return res.status(401).json({ message: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, ENV.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
            {
                id: decoded.id,
                username: decoded.username,
                role: decoded.role
            },
            ENV.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logout exitoso' });
};