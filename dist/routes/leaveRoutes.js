"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaveRouter = (0, express_1.Router)();
leaveRouter.get('/', (req, res) => {
    res.send('our leaves');
});
exports.default = leaveRouter;
