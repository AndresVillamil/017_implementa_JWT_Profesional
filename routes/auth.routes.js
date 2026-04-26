import { Router } from 'express';
import {
    login,
    refresh,
    logout
} from '../controllers/auth.controller.js';

import { validateAccessToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

// Ruta protegida
router.get('/profile', validateAccessToken, (req, res) => {
    res.json({
        message: 'Perfil protegido',
        user: req.user
    });
});

export default router;