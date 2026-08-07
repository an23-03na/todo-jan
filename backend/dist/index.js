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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const app = (0, express_1.default)();
const port = process.env.PORT || 5555;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
}));
app.all('/api/auth/{*any}', (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/api/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield auth_1.auth.api.getSession({
        headers: (0, node_1.fromNodeHeaders)(req.headers),
    });
    return res.json(session);
}));
app.use("/api/todos", todo_route_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
