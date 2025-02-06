export const deleteTodoListDetail = async (id: number) => {
  try {
    const response = await fetch(
      `https://assignment-todolist-api.vercel.app/api/tenantId/items/${id}`,
      {
        method: "DELETE",
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
