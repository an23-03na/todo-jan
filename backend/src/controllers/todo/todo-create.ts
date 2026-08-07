import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";

export const todoCreate = async (req: Request, res: Response) => {
  try {
    const { text, userId } = req.body;

    if (!text.trim().length) {
      return res.status(404).json({ message: "please type your todo" });
    }

    const isTodo = await prisma.todo.findUnique({ where: { text } });

    if (isTodo) {
      return res.status(404).json({ message: "already exist todo" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "user is not defined" });
    }

    const newTodo = await prisma.todo.create({
      data: {
        userId: user.id,
        completed: false,
        text,
      },
    });

    return res.status(201).json(newTodo);
  } catch (error) {
    console.log(error, "Server Error Create");
    res.status(500).json("Internal Server Error");
  }
};
