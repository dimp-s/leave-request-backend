"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const leaveRoutes_1 = __importDefault(require("./routes/leaveRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
// app.get('/', () => {
//   return 'hello';
// });
app.use('/user', userRoutes_1.default);
app.use('/leave', leaveRoutes_1.default);
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});
mongoose_1.default.connect('mongodb://localhost:27017/leave-module', () => {
    console.log('database connection established!');
});
app.listen(port, () => {
    console.log('server up and running!');
});
