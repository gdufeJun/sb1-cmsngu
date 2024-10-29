import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.js';
import { authenticate } from '../middleware/auth.js';
import { validateSchema } from '../middleware/validateSchema.js';
import { loginSchema, registerSchema } from '../schemas/auth.js';

export const authRouter = Router();

authRouter.post('/register', validateSchema(registerSchema), register);
authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.get('/profile', authenticate, getProfile);