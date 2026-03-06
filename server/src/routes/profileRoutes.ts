import { Router } from 'express';
import { saveProfile } from '../controllers/profileController';

export const profileRouter = Router();

profileRouter.post('/', saveProfile);
