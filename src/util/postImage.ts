export const postImage = async (file: File): Promise<string | null> => {
  if (!file) {
    console.error("postImage: file is undefined.");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://assignment-todolist-api.vercel.app/api/tenantId/images/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(
        `이미지 업로드 실패! HTTP Status: ${response.status}, Message: ${errorMessage}`
      );
      return null;
    }

    const data = await response.json();
    return data.url;
  } catch (err) {
    console.error("이미지 업로드 중 오류 발생:", err);
    return null;
  }
};
