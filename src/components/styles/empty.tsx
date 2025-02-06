import Todo from "@/icons/todo.png";
import Done from "@/icons/done.png";
import Image from "next/image";

export default function Empty({ type }: { type: "todo" | "done" }) {
  const isTodo = type == "todo";
  return (
    <div className="flex justify-center items-center md:mt-16">
      <div>
        <Image
          width={240}
          height={240}
          src={isTodo ? Todo : Done}
          className={`w-[120px] sm:w-[240px] mx-auto 
            ${!isTodo ? "py-[10px]" : ""} `}
          alt="Empty image"
          quality={100}
        />

        <span className="block text-slate-400 text-center py-6 leading-[18.16px]">
          {isTodo ? "할 일이 없어요." : "아직 다 한 일이 없어요."}
          <br />
          {isTodo
            ? "TODO를 새롭게 추가해주세요!"
            : "해야 할 일을 체크해보세요!"}
        </span>
      </div>
    </div>
  );
}
