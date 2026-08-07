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
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoCreate = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const todoCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { text, userId } = req.body;
        if (!text.trim().length) {
            return res.status(404).json({ message: "please type your todo" });
        }
        const isTodo = yield prisma_client_1.prisma.todo.findUnique({ where: { text } });
        if (isTodo) {
            return res.status(404).json({ message: "already exist todo" });
        }
        const user = yield prisma_client_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                todoUser: true,
            },
        });
        const newTodo = yield prisma_client_1.prisma.todo.create({
            data: {
                todoUserId: (_a = user === null || user === void 0 ? void 0 : user.todoUser) === null || _a === void 0 ? void 0 : _a.id,
                completed: false,
                text,
            },
        });
        return res.status(201).json(newTodo);
    }
    catch (error) {
        console.log(error, "Server Error Create");
        res.status(500).json("Internal Server Error");
    }
});
exports.todoCreate = todoCreate;
