import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";

export const todoDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res
        .status(404)
        .json({ message: "no todo was found with this id" });
    }
    const isTodo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!isTodo) {
      return res.status(404).json({ message: "todo not found" });
    }

    const deleteTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return res.status(201).json(deleteTodo);
  } catch (error) {
    console.log(error, "Server Error Delete");
    res.status(500).json("Internal Server Error");
  }
};
