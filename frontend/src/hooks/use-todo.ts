/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRoutes } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { axiosInstance } from "@/lib/instance";
import useSWR from "swr";

export const useTodo = () => {
  const { data, error, isLoading, mutate } = useSWR(ApiRoutes.TODO, fetcher);

  const createTodo = async (text: string) => {
    const newTodo = (await axiosInstance.post(ApiRoutes.TODO, { text })).data;
    mutate([newTodo, ...data]);
  };

  const updateTodo = async (completed: boolean, id: number) => {
    await axiosInstance.patch(ApiRoutes.TODO + `/${id}`, { completed });

    mutate(
      data.map((el: any) => {
        if (id === el.id) {
          el.completed = completed;
        }
        return el;
      }),
    );
  };

  const deleteTodo = async (id: number) => {
    await axiosInstance.delete(ApiRoutes.TODO + `/${id}`);
    mutate(data.filter((el: any) => el.id !== id));
  };

  return { createTodo, data, error, isLoading, deleteTodo, updateTodo };
};
