import express from 'express';
const router= express.Router();

import { register, login, logout,updateProfile ,checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check',protectRoute,checkAuth);

export default router;