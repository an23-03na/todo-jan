/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, Plus } from "lucide-react";
import { useTodo } from "@/hooks/use-todo";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

interface Props {
  className?: string;
}

export const Todo: React.FC<Props> = (props) => {
  const { className } = props;
  const { createTodo, data, deleteTodo, updateTodo } = useTodo();
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {data: dataJan} = useSession()

  const addTodo = async () => {
    setLoading(true);
    try {
      await createTodo(text, dataJan?.user?.id || "");
      toast.success("Your todo created successfuly");
    } catch (error: any) {
      console.log(error);
      toast.error(
        "Failed to create todo " + `(${error?.response.data.message})`,
      );
    } finally {
      setLoading(false);
    }
  };
  const removeTodo = async (id: number) => {
    setLoading(true);
    try {
      await deleteTodo(id);
      toast.success("Your todo deleted successfuly");
    } catch (error: any) {
      console.log(error);
      toast.error(
        "Failed to delete todo " + `(${error?.response.data.message})`,
      );
    } finally {
      setLoading(false);
    }
  };
  const changeTodo = async (id: number, completed: boolean) => {
    console.log(completed);
    setLoading(true);
    try {
      await updateTodo(!completed, id);
      toast.success("Your todo updated successfuly");
    } catch (error: any) {
      console.log(error);
      toast.error(
        "Failed to update todo " + `(${error?.response.data.message})`,
      );
    } finally {
       console.log("finally");
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 min-h-screen",
        className,
      )}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo();
        }}
        className="flex items-center gap-5 max-w-100 w-full"
      >
        <Input
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="max-w-70 border-2 border-black"
        />
        <Button type="submit" disabled={loading} className={"cursor-pointer"}>
          Add <Plus />
        </Button>
      </form>
      <ul className="max-w-100 w-full">
        {data?.map((el: any) => (
          <li
            className="flex gap-5 w-full justify-between items-center hover:bg-accent"
            key={el.id}
          >
            <div className="flex items-center gap-4">
              <Button
                className={cn("rounded-full w-6 h-6", el.completed && "text-[#3fd33f] hover:text-[#04a104]")}
                disabled={loading}
                onClick={() => changeTodo(el.id, el.completed)}
                variant={"outline"}
              >
                {el.completed && <Check size={14} />}
              </Button>
              <span className={el.completed ? "line-through" : ""}>
                {el.text}
              </span>
            </div>

            <div className="flex">
              <Button
                disabled={loading}
                onClick={() => removeTodo(el.id)}
                variant={"destructive"}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
