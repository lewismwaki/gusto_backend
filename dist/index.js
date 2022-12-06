"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const recipe_routes_1 = __importDefault(require("./routes/recipe.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`${req.method} request at ${req.path}`);
    next();
});
app.use("/api/user", user_routes_1.default);
app.use("/api/recipe", recipe_routes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`⚡[server]: DB connected && Server is running at https://localhost:${process.env.PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
    console.log("failed to connect to db");
});
