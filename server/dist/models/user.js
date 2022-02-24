"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
const User = database_1.default.define('users', {
    id: {
        type: sequelize_1.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.STRING,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
exports.default = User;
