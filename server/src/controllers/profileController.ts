import type { Request, Response } from 'express';

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
            !injuries ||
            !preferredSplit
        ) {
            return res.status(500).json({ error: 'Missing required fields' });
        }
    } catch (error) {
        console.log('Error saving profile data:', error);
        res.status(500).json({ error: 'Failed to save profile data' });
    }
};
