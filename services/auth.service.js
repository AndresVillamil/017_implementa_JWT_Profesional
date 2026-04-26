import {
    generateAccessToken,
    generateRefreshToken
} from '../lib/token.js';

export const loginService = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload)
    };
};