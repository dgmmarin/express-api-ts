import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../database/entities/User';
import jwt, { Secret} from 'jsonwebtoken';
dotenv.config();

export default class AuthService {
    static saltRounds: number = process.env.NODE_PASSWORD_SALT ? Number(process.env.NODE_PASSWORD_SALT) : 10;
    static jwtSecret: Secret = process.env.NODE_JWT_SECRET ?? "secret";

    static hashPassword = (password: string): string => {
        const salt = bcrypt.genSaltSync(this.saltRounds);
        return bcrypt.hashSync(password, salt);
    }

    static comparePassword = (password: string, hash: string): boolean => {
        return bcrypt.compareSync(password, hash);
    }

    static generateAccessToken = (user: User): string => {
        return jwt.sign({ email: user.email, role: user.roles }, this.jwtSecret, { expiresIn: process.env.NODE_JWT_EXPIRES });
    }

    static verifyToken = (token: string): any => {
        return jwt.verify(token, this.jwtSecret);
    }
}
