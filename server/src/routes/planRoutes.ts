import { Router } from 'express';
import { generatePlan } from '../controllers/profileController';

export const planRouter = Router();

planRouter.post('/generate', generatePlan);
