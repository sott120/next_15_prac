"use client";

import { useRouter } from "next/navigation";
import ScreenCenter from "@/components/screen_center";
import ButtonCustom from "@/components/styles/button_custom";
import UploadImg from "@/icons/img.svg";
import PlusDark from "@/icons/plus_dark.svg";
import Edit from "@/icons/edit.svg";
import React from "react";
import { IListItemDetail } from "@/types/types";
import { getTodoListDetail } from "@/util/getTodoListDetail";
import { useParams } from "next/navigation";
import CheckWhite from "@/icons/check_white.svg";
import Image from "next/image";
import { postImage } from "@/util/postImage";
import { deleteTodoListDetail } from "@/util/deleteTodoListDetail";
import { updateTodoListDetail } from "@/util/updateTodoListDetail";

export default function Items() {
  const router = useRouter();
  const [itemDetail, setItemDetail] = React.useState<IListItemDetail | null>(
    null
  );

  const params = useParams<{ id: string }>();

  React.useEffect(() => {
    const getTodoDetailData = async () => {
      try {
        const { data } = await getTodoListDetail(params.id);
        setItemDetail(data);
        console.log("data: ", data);
      } catch (err: any) {
        console.error("Error in useEffect:", err);
      }
    };

    getTodoDetailData();
  }, []);

  // 체크리스트 상태 변경
  const changeCompletedStatus = () => {
    if (itemDetail) {
      setItemDetail({
        ...itemDetail,
        isCompleted: !itemDetail.isCompleted,
      });
    }
  };

  // 제목 변경
  const changeName = (text: string) => {
    if (itemDetail) {
      setItemDetail({
        ...itemDetail,
        name: text,
      });
    }
  };

  // 메모 변경
  const changMemo = (contents: string) => {
    if (itemDetail) {
      setItemDetail({
        ...itemDetail,
        memo: contents,
      });
    }
  };

  // 이미지 업로드
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 용량은 5MB 이하이어야 합니다.");
      return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
      alert("파일명은 영문과 숫자만 포함해야 합니다.");
      return;
    }

    // API 호출하여 이미지 업로드 후 URL 받기
    const imageUrl = await postImage(file);
    if (imageUrl && itemDetail) {
      setItemDetail({
        ...itemDetail,
        imageUrl: imageUrl,
      });
    } else {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  // 수정
  const handleUpdate = async () => {
    if (!itemDetail?.name) {
      alert("제목은 비워둘 수 없습니다!");
      return;
    }
    try {
      await updateTodoListDetail(itemDetail);
      router.push("/");
    } catch (err) {
      console.error("Error during deletion:", err);
    }
  };

  // 삭제
  const handleDelete = async () => {
    try {
      await deleteTodoListDetail(Number(params.id));
      router.push("/");
    } catch (err) {
      console.error("Error during deletion:", err);
    }
  };

  return (
    <ScreenCenter bgColor="white">
      <section className="lg:px-[102px]">
        <div
          className={`w-full h-[64px] rounded-[27px] ${
            itemDetail && itemDetail.isCompleted ? "bg-violet-200" : "bg-white"
          } border-2 border-slate-900 flex justify-center items-center`}
        >
          <div
            onClick={changeCompletedStatus}
            className={`relative w-8 h-8 flex-shrink-0 ${
              itemDetail && itemDetail.isCompleted
                ? "bg-violet-600 "
                : "bg-yellow-50 border-2 border-slate-900"
            }  rounded-[27px] ml-3 mr-4 cursor-pointer`}
          >
            {itemDetail && itemDetail.isCompleted && (
              <CheckWhite className="absolute top-[10px] left-[6px]" />
            )}
          </div>
          <input
            defaultValue={itemDetail?.name}
            onChange={(e) => changeName(e.target.value)}
            type="text"
            required
            className="focus:outline-none underline bg-transparent"
          />
        </div>
        <div className="flex gap-6 sm:mt-6 mt-4 flex-col md:flex-row">
          <div className="relative w-full md:flex-[4] h-[311px] rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 box-border flex justify-center items-center">
            {itemDetail?.imageUrl && (
              <Image
                src={itemDetail.imageUrl}
                alt="Uploaded Image"
                fill
                className="object-cover rounded-[24px]"
              />
            )}

            <UploadImg />
            <div
              className={`absolute bottom-4 right-4 w-16 h-16 rounded-[50%] ${
                itemDetail?.imageUrl
                  ? "bg-slate-900/[0.5] border-slate-900  border-2"
                  : "bg-slate-200"
              } flex justify-center items-center cursor-pointer`}
            >
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                className="absolute border-0 p-0 w-16 h-16 cursor-pointer opacity-0"
              />
              {itemDetail?.imageUrl ? <Edit /> : <PlusDark />}
            </div>
          </div>
          <div className="relative w-full md:flex-[6]">
            <div
              className="absolute inset-0 w-full h-full bg-yellow-50 rounded-[24px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 30px, #fcd34d 31px)",
                backgroundSize: "100% 32px",
              }}
            />
            <span className="relative block text-amber-800 font-extrabold text-center mt-6 mb-4">
              Memo
            </span>
            <textarea
              defaultValue={itemDetail?.memo ? itemDetail?.memo : ""}
              onChange={(e) => changMemo(e.target.value)}
              className="relative w-full h-[248px] bg-transparent resize-none outline-none px-4 scrollbar-thin"
            ></textarea>
          </div>
        </div>
        <div className="mt-6 flex justify-center md:justify-end">
          <ButtonCustom onClick={handleUpdate} type="confirm" text="수정하기" />
          <ButtonCustom onClick={handleDelete} type="delete" text="삭제하기" />
        </div>
      </section>
    </ScreenCenter>
  );
}
