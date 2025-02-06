"use server";
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
        body: JSON.stringify({ name }),
      }
    );
    console.log(response.status);
  } catch (err) {
    console.log(err);
    return;
  }
};
