import React from "react";
import Empty from "@/components/styles/empty";
import Done from "@/icons/done.svg";
import Todo from "@/icons/todo.svg";
import CheckWhite from "@/icons/check_white.svg";
import { getTodoList } from "@/util/getTodoList";
import { IListItem } from "@/types/types";
import Link from "next/link";

interface IList {
  completedList: IListItem[];
  incompleteList: IListItem[];
  setCompletedList: React.Dispatch<React.SetStateAction<IListItem[]>>;
  setIncompleteList: React.Dispatch<React.SetStateAction<IListItem[]>>;
}

export default function List({
  completedList,
  incompleteList,
  setCompletedList,
  setIncompleteList,
}: IList) {
  React.useEffect(() => {
    const getTodoData = async () => {
      try {
        const { completed, incomplete } = await getTodoList();
        setCompletedList(completed);
        setIncompleteList(incomplete);
      } catch (err: any) {
        console.error("Error in useEffect:", err);
      }
    };

    getTodoData();
  }, []);

  const statusChange = async (item: IListItem) => {
    try {
      const response = await fetch(
        `https://assignment-todolist-api.vercel.app/api/tenantId/items/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCompleted: !item.isCompleted }),
        }
      );
      console.log(response.status);
    } catch (err) {
      console.log(err);
      return;
    } finally {
      const getTodoData = async () => {
        try {
          const { completed, incomplete } = await getTodoList();
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
    <section className="flex flex-col mt-6 sm:mt-10 md:flex-row gap-4">
      <div className="flex-1 mb-6 md:mb-0 overflow-hidden">
        <Todo />
        <ul className="mt-4">
          {incompleteList.length > 0 ? (
            incompleteList.map((item) => (
              <li
                key={item.id}
                className="w-full h-[50px] rounded-[27px] bg-white border-2 border-slate-900 flex items-center mb-4"
              >
                <div
                  onClick={() => {
                    statusChange(item);
                  }}
                  className="w-8 h-8 flex-shrink-0 bg-yellow-50 border-2 border-slate-900 rounded-[27px] ml-3 mr-4 cursor-pointer"
                ></div>
                <Link
                  href={`/items/${item.id}`}
                  className="w-full truncate overflow-hidden whitespace-nowrap pr-2 py-[14px] cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            <Empty type="todo" />
          )}
        </ul>
      </div>
      <div className="flex-1 overflow-hidden">
        <Done />
        <ul className="mt-4">
          {completedList.length > 0 ? (
            completedList.map((item) => (
              <li
                key={item.id}
                className="w-full h-[50px] rounded-[27px] bg-violet-100 border-2 border-slate-900 flex items-center mb-4 line-through"
              >
                <div
                  onClick={() => {
                    statusChange(item);
                  }}
                  className="relative w-8 h-8 flex-shrink-0 bg-violet-600 border-2 border-slate-900 rounded-[27px] ml-3 mr-4 cursor-pointer"
                >
                  <CheckWhite className="absolute top-2 left-1" />
                </div>
                <Link
                  href={`items/${item.id}`}
                  className="w-full truncate overflow-hidden whitespace-nowrap pr-2 py-[14px] cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            <Empty type="done" />
          )}
        </ul>
      </div>
    </section>
  );
}
