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
exports.logInUserHandler = exports.signUpUserHandler = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const signUpUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phoneNumber, password } = req.body;
    const emailExists = yield user_model_1.default.findOne({ email });
    if (emailExists) {
        return res.status(400).json({ error: "User with this email exists" });
    }
    if (!validator_1.default.isMobilePhone(phoneNumber)) {
        return res.status(400).json({ error: "Please enter a valid phoneNumber" });
    }
    const phoneNumberExists = yield user_model_1.default.findOne({ phoneNumber });
    if (phoneNumberExists) {
        return res.status(400).json({ error: "User with this phoneNumber exists" });
    }
    try {
        const hash = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, hash);
        const user = yield user_model_1.default.create({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.signUpUserHandler = signUpUserHandler;
const logInUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter email and password" });
    }
    const existingUser = yield user_model_1.default.findOne({ email });
    if (!existingUser) {
        return res
            .status(400)
            .json({ error: "User with this email does not exist" });
    }
    try {
        const matches = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!matches)
            return res.status(400).json({ error: "Passwords don't match" });
        const user = yield user_model_1.default.create({
            email,
            password,
        });
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.logInUserHandler = logInUserHandler;
