import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { generateTrainingPlan } from '../lib/ai';

export const saveProfile = async (req: Request, res: Response) => {
    try {
        const { userId, ...profileData } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'user ID is required' });
        }

        const {
            goal,
            experience,
            daysPerWeek,
            sessionLength,
            equipment,
            injuries,
            preferredSplit,
        } = profileData;

        if (
            !goal ||
            !experience ||
            !daysPerWeek ||
            !sessionLength ||
            !equipment ||
            !preferredSplit
        ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await prisma.user.upsert({
            where: { user_id: userId },
            update: {
                goal,
                experience,
                days_per_week: daysPerWeek,
                session_length: sessionLength,
                equipment,
                injuries: injuries || null,
                preferred_split: preferredSplit,
                updated_at: new Date(),
            },
            create: {
                user_id: userId,
                goal,
                experience,
                days_per_week: daysPerWeek,
                session_length: sessionLength,
                equipment,
                injuries: injuries || null,
                preferred_split: preferredSplit,
            },
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log('Error saving profile data:', error);
        return res.status(500).json({ error: 'Failed to save profile data' });
    }
};

export const generatePlan = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'user ID is required' });
        }
        const profile = await prisma.user.findUnique({ where: { user_id: userId } });

        if (!profile) {
            return res
                .status(400)
                .json({ error: 'User profile not found. Complete onboarding first.' });
        }

        //FETCH PLAN TABLE
        const latestPlan = await prisma.plan.findFirst({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            select: { version: true },
        });

        const nextVersion = latestPlan ? latestPlan.version + 1 : 1;

        let planJson;

        try {
            planJson = await generateTrainingPlan(profile);
        } catch (error) {
            console.log('AI generation failed:', error);
            return res.status(500).json({
                error: 'Failed to generate plan, please try again',
                details: error instanceof Error ? error.message : 'Unknown error',
            });
        }

        const planText = JSON.stringify(planJson, null, 2);

        const newPlan = await prisma.plan.create({
            data: {
                user_id: userId,
                plan_json: planJson,
                plan_text: planText,
                version: nextVersion,
            },
        });

        return res.status(200).json({
            id: newPlan.id,
            version: newPlan.version,
            createdAt: newPlan.created_at,
        });
    } catch (error) {
        console.log('Error generating plan:', error);
        return res.status(500).json({ error: 'Failed to generate plan' });
    }
};

export const getPlan = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;

        if (!userId) {
            return res.status(400).json({ error: 'user ID is required' });
        }

        const plan = await prisma.plan.findFirst({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
        });
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found.' });
        }

        return res.status(200).json({
            id: plan.id,
            userId: plan.user_id,
            planJson: plan.plan_json,
            planText: plan.plan_text,
            version: plan.version,
            createdAt: plan.created_at,
        });
    } catch (error) {
        console.log('Error fetching plan:', error);
        return res.status(500).json({ error: 'Failed to fetch plan' });
    }
};
