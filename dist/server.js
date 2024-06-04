"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./infrastructure/routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
// Connect Database
(0, db_1.default)();
// Init Middleware
app.use(express_1.default.json());
// Define Routes
app.use('/api', userRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
