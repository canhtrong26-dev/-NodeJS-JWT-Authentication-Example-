import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';


export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ username, email, password: hashedPassword });
        return res.status(201).json({ message: 'User registered successfully!', user });
    } catch (err) {
        return res.status(500).json({ error: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user.id },
            authConfig.secret as string,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ error: 'Error logging in' });
    }
};