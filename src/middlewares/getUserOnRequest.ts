import { NextFunction,Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../database/entities/User";
import { CustomRequest } from "./auth";


const getRequestedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.params.userId != undefined) {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneByOrFail({ id: Number(req.params.userId) });
            (req as CustomRequest)['user'] = user;
        }
        next();
    } catch (error) {
        res.status(400).json({ message: "User not found" });
    }
};
export default getRequestedUser;