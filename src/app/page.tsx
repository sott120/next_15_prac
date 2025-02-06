"use client";

import React from "react";
import ScreenCenter from "@/components/screen_center";
import ButtonSubmit from "@/components/styles/button_submit";
import SInput from "@/components/styles/input";
import List from "@/app/list";
import { IListItem } from "@/types/types";
import { fetchTodoList } from "@/util/getTodoList";
// import { postTodo } from "@/api/api";

export default function Home() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [completedList, setCompletedList] = React.useState<IListItem[]>([]);
  const [incompleteList, setIncompleteList] = React.useState<IListItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const postTodo = async (formData: FormData) => {
    const name = formData.get("name")?.toString();
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://assignment-todolist-api.vercel.app/api/tenantId/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      console.log(response.status);
    } catch (err) {
      console.log(err);
      return;
    } finally {
      const getTodoData = async () => {
        try {
          const { completed, incomplete } = await fetchTodoList();
          setCompletedList(completed);
          setIncompleteList(incomplete);
        } catch (err: any) {
          console.error("Error in useEffect:", err);
        }
      };

      getTodoData();
    }
  };

  return (
    <ScreenCenter bgColor="transparent">
      <form action={postTodo} className="flex">
        <SInput
          name="name"
          placeholder="할 일을 입력해주세요"
          onChange={handleInputChange}
        />
        <ButtonSubmit bg_color={!!inputValue} />
      </form>

      <List
        completedList={completedList}
        incompleteList={incompleteList}
        setCompletedList={setCompletedList}
        setIncompleteList={setIncompleteList}
      />
    </ScreenCenter>
  );
}
