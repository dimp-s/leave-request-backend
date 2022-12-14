"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.post('/', userController_1.createUser);
userRouter.get('/', userController_1.getAllUsers);
userRouter.get('/:id', userController_1.getUserById);
userRouter.put('/updateUser/:id', userController_1.updateUser);
userRouter.delete('/deleteUser/:id', userController_1.deleteUser);
exports.default = userRouter;
