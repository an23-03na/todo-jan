import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma-client";

export const todoGet = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const todos = await prisma.todo.findMany({
      where: {
        userId: userId as string,
      },
    });

    res.status(200).json(todos);
  } catch (error) {
    console.log(error, "Server Error Get");
    res.status(500).json("Internal Server Error");
  }
};
