import { IListItemDetail } from "@/types/types";

export const getTodoListDetail = async (id: string) => {
  try {
    const response = await fetch(
      `https://assignment-todolist-api.vercel.app/api/tenantId/items/${id}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${response.status} ${response.statusText}: ${
          errorData.message || "요청 실패"
        }`
      );
    }

    const data: IListItemDetail = await response.json();

    return { data };
  } catch (err: any) {
    console.error("Error fetching todo list:", err);
    throw err;
  }
};
