import { Request, Response, NextFunction } from "express";
import User from '../models/user';


export const authorize = (roles: string[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user.role = user.role;
        if (!roles.includes(req.user.role)) {

            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
        next();
    };


};
