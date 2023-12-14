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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, role } = req.body;
    //Validamos si el usuario ya existe en la base de datos
    const user = yield user_1.User.findOne({
        where: {
            [sequelize_1.Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    });
    if (user) {
        res.status(400).json({
            msg: `The username ${username} or email ${email} is already in use`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.User.create({
            email: email,
            username: username,
            password: hashedPassword,
            role: role
        });
        res.status(201).json({
            msg: `User: ${username} created successfully`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Oopss, there was an error', error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `The username ${username} does not exists`
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Incorrect Password`
        });
    }
    //Generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username,
        role: user.role
    }, process.env.SECRET_KEY || '123');
    res.json(token);
});
exports.loginUser = loginUser;
