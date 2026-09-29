import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';


export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(500).json({ error: 'Error fetching users' })
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.create({ username, email, password: hashedPassword, role });

        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Error creating user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
        const user = await User.findByPk(Number(id));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hanshedPassword = await bcrypt.hash(password, 8)
        await user.update({ username, email, password: hanshedPassword, role });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Error updating user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(Number(id));
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();
        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (err) {
        return res.status(500).json({ error: 'Error deleting user' });
    }
};