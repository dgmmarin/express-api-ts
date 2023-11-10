import { Request, Response, NextFunction } from 'express';
import AuthService from '../auth/Auth';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '../database/entities/User';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
    user: User;
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const SECRET_KEY: Secret = process.env.NODE_JWT_SECRET ?? "";
    if(SECRET_KEY === ""){
        throw new Error("Secret key not found");
    }

    try {
        if (req.headers['public'] && req.headers['public'] === "true") {
            next();
            return;
        }
        if (authHeader) {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                return res.sendStatus(403);
            }
    
            const decoded = jwt.verify(token, SECRET_KEY);
            (req as CustomRequest).token = decoded;
            next();
        } else {
            res.sendStatus(401);
        }
    }catch(err){
        res.status(401).send('Please authenticate');
    }
};

const isPublic = (req: Request, res: Response, next: NextFunction) => {
    req.headers['public'] = "true";
    next();
};

export default authenticateJWT;
export { isPublic };
