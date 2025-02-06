import Check from "@/icons/check.svg";
import Close from "@/icons/X.svg";

interface IButtonCustom {
  type: "confirm" | "delete";
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonCustom({ type, text, onClick }: IButtonCustom) {
  const isConfirm = type === "confirm";

  return (
    <div
      className="w-[164.35px] 158.48px relative ml-2 sm:ml-4 flex before:content-[''] before:absolute before:w-full before:h-[56px]
           before:top-[3.5px] before:left-[4.06px] before:rounded-[24px] 
           before:border-2 before:border-slate-900 before:bg-slate-900"
    >
      <button
        onClick={onClick}
        type="button"
        className={`w-[164.35px] h-[56px] sm:px-[24px] flex justify-center items-center ${
          isConfirm ? "bg-lime-300" : "bg-rose-500"
        } text-slate-900 placeholder-slate-500 
      rounded-[24px] border-2 border-slate-900 focus:outline-none relative z-10`}
      >
        {isConfirm ? <Check className="mr-1" /> : <Close className="mr-1" />}
        <span className={`${isConfirm ? "text-slate-900" : "text-white"}`}>
          {text}
        </span>
      </button>
    </div>
  );
}
