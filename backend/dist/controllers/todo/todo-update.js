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
exports.todoUpdate = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const todoUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const completed = req.body.completed;
        if (completed === undefined) {
            return res.status(404).json({ message: "check your todo" });
        }
        if (!id) {
            return res
                .status(404)
                .json({ message: "no todo was found with this id" });
        }
        const isTodo = yield prisma_client_1.prisma.todo.findUnique({
            where: {
                id,
            },
        });
        if (!isTodo) {
            return res.status(404).json({ message: "todo not found" });
        }
        const updateTodo = yield prisma_client_1.prisma.todo.update({
            where: {
                id,
            },
            data: { completed },
        });
        return res.status(201).json(updateTodo);
    }
    catch (error) {
        console.log(error, "Server Error Update");
        res.status(500).json("Internal Server Error");
    }
});
exports.todoUpdate = todoUpdate;
