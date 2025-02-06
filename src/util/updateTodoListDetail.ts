import { IListItemDetail } from "@/types/types";

export const updateTodoListDetail = async (
  itemDetail: IListItemDetail | null
) => {
  if (!itemDetail) return;
  try {
    const response = await fetch(
      `https://assignment-todolist-api.vercel.app/api/tenantId/items/${itemDetail.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: itemDetail.name ? itemDetail.name : "",
          memo: itemDetail.memo ? itemDetail.memo : "",
          imageUrl: itemDetail.imageUrl ? itemDetail.imageUrl : "",
          isCompleted: itemDetail.isCompleted,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${response.status} ${response.statusText}: ${
          errorData.message || "요청 실패"
        }`
      );
    }
  } catch (err: any) {
    console.error("Error fetching todo list:", err);
    throw err;
  }
};
