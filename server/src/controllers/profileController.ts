import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

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

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('Error saving profile data:', error);
        res.status(500).json({ error: 'Failed to save profile data' });
    }
};
