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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
//add a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    var users = yield UserModel_1.default.create(user);
    return res.status(200).json({ message: 'User added!', data: users });
});
exports.createUser = createUser;
//get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.find();
    if (users.length > 0)
        return res.json({ status: true, users });
    return res.status(404).json({ status: false, msg: 'No Users found' });
});
exports.getAllUsers = getAllUsers;
//get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findById(req.params.id);
    if (user)
        return res.json({ status: true, user });
    return res.status(404).json({ status: false, msg: 'No such User found' });
});
exports.getUserById = getUserById;
//update an existing user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield UserModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.json({
            status: true,
            msg: 'User updated successfully',
            userData,
        });
    }
    catch (error) {
        res.status(400).json({ status: false, msg: error });
    }
});
exports.updateUser = updateUser;
//delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findByIdAndRemove(req.params.id);
    if (!user)
        return res.status(400).json({ status: false, msg: 'No such User found' });
    return res.json({ status: true, msg: 'User deleted successfully' });
});
exports.deleteUser = deleteUser;
