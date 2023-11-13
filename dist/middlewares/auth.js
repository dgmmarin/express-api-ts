"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublic = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticateJWT = function (req, res, next) {
    var _a, _b;
    var authHeader = req.headers.authorization;
    var SECRET_KEY = (_a = process.env.NODE_JWT_SECRET) !== null && _a !== void 0 ? _a : "";
    if (SECRET_KEY === "") {
        throw new Error("Secret key not found");
    }
    try {
        if (req.headers['public'] && req.headers['public'] === "true") {
            next();
            return;
        }
        if (authHeader) {
            var token = (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', '');
            if (!token) {
                return res.sendStatus(403);
            }
            var decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.token = decoded;
            req.email = decoded.email;
            req.exp = decoded.exp;
            req.iat = decoded.iat;
            req.roles = decoded.roles;
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
};
var isPublic = function (req, res, next) {
    req.headers['public'] = "true";
    next();
};
exports.isPublic = isPublic;
exports.default = authenticateJWT;
