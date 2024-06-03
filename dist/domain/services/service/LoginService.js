"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = require('config');
const secretOrkey = config.get('secretOrKey');
class LoginService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Login attempt with email:', email);
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                console.error('User not found:', email);
                throw new Error('Email incorrect');
            }
            console.log('User found:', user);
            if (typeof password !== 'string' || typeof user.password !== 'string') {
                console.error('Password type mismatch');
                throw new Error('Password must be a string');
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                console.error('Password mismatch');
                throw new Error('Email or password incorrect');
            }
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                address: user.address,
                birthDate: user.birthDate,
                codePostal: user.codePostal,
                country: user.country,
            };
            const token = jsonwebtoken_1.default.sign(payload, secretOrkey);
            console.log('Token generated:', token);
            return { token, user };
        });
    }
}
exports.LoginService = LoginService;
