import { IListItem } from "@/types/types";

export const fetchTodoList = async () => {
  // export 추가
  try {
    const response = await fetch(
      `https://assignment-todolist-api.vercel.app/api/tenantId/items?page=1&pageSize=1000`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${response.status} ${response.statusText}: ${
          errorData.message || "요청 실패"
        }`
      );
    }

    const list = await response.json();

    const completed = list.filter((item: IListItem) => item.isCompleted);
    const incomplete = list.filter((item: IListItem) => !item.isCompleted);

    return { completed, incomplete }; // completed 와 incomplete 반환
  } catch (err: any) {
    console.error("Error fetching todo list:", err);
    throw err; // 에러를 다시 던져서 호출하는 곳에서 처리하도록 함
  }
};
