"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    var _a;
    var _b;
    _b = AuthService;
    AuthService.saltRounds = process.env.NODE_PASSWORD_SALT ? Number(process.env.NODE_PASSWORD_SALT) : 10;
    AuthService.jwtSecret = (_a = process.env.NODE_JWT_SECRET) !== null && _a !== void 0 ? _a : "secret";
    AuthService.hashPassword = function (password) {
        var salt = bcrypt_1.default.genSaltSync(_b.saltRounds);
        return bcrypt_1.default.hashSync(password, salt);
    };
    AuthService.comparePassword = function (password, hash) {
        return bcrypt_1.default.compareSync(password, hash);
    };
    AuthService.generateAccessToken = function (user) {
        return jsonwebtoken_1.default.sign({
            email: user.email,
            roles: user.roles.map(function (role) { return role.name; })
        }, _b.jwtSecret, { expiresIn: '1h' });
    };
    AuthService.verifyToken = function (token) {
        return jsonwebtoken_1.default.verify(token, _b.jwtSecret);
    };
    return AuthService;
}());
exports.default = AuthService;
