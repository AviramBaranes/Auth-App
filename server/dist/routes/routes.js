"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const router = express_1.default.Router();
router.post('/login', auth_1.login);
router.post('/signup', auth_1.signup);
router.get('/private', auth_1.isAuth);
router.get('/public', (req, res, next) => {
    res.status(200).json({ message: 'here is your public resource' });
});
router.use('/', (req, res, next) => {
    res.status(404).json({ error: 'page not found' });
});
exports.default = router;
