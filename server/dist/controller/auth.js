"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signup = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await user_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: 'User already exist' });
            return;
        }
        if (!email) {
            res.status(400).json({ message: 'email not provided' });
            return;
        }
        if (!password) {
            res.status(400).json({ message: 'password not provided' });
            return;
        }
        bcryptjs_1.default.hash(password, 12, async (err, passwordHash) => {
            if (err) {
                res.status(500).json({ message: "couldn't hash the password" });
                return;
            }
            else if (passwordHash) {
                try {
                    await user_1.default.create({
                        email,
                        password: passwordHash,
                        name,
                    });
                    res.status(200).json({ message: 'user created' });
                }
                catch (err) {
                    res.status(502).json({ message: 'error while creating the user' });
                }
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
        return;
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = (await user_1.default.findOne({ where: { email } }));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        bcryptjs_1.default.compare(password, user.password, (err, equal) => {
            if (err) {
                res.status(502).json({ message: 'error while checking user password' });
            }
            else if (equal) {
                const token = jsonwebtoken_1.default.sign({ email }, 'secret', { expiresIn: '1d' });
                res.status(200).json({ message: 'user logged in', token });
            }
            else {
                res.status(401).json({ message: 'invalid password' });
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
    }
};
exports.login = login;
const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'not authenticated' });
        return;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
    }
    catch (err) {
        res
            .status(500)
            .json({ message: err.message || 'could not decode the token' });
        return;
    }
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    }
    else {
        res.status(200).json({ message: 'here is your resource' });
    }
};
exports.isAuth = isAuth;
