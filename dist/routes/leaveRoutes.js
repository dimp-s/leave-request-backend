"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaveController_1 = require("../controllers/leaveController");
const leaveRouter = (0, express_1.Router)();
leaveRouter.post('/reqLeave', leaveController_1.requestLeave);
exports.default = leaveRouter;
