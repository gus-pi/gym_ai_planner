import { Router } from 'express';
import { generatePlan, getPlan } from '../controllers/profileController';

export const planRouter = Router();

planRouter.post('/generate', generatePlan);
planRouter.get('/current', getPlan);
