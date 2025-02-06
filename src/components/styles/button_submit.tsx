import Plus from "@/icons/plus.svg";
import PlusWhite from "@/icons/plus_white.svg";

interface IButtonSubmit {
  bg_color: boolean;
}

export default function ButtonSubmit({ bg_color }: IButtonSubmit) {
  return (
    <div
      className="w-[54.78px] lg:w-[164.35px] sm:w-[158.48px] relative ml-2 sm:ml-4 flex before:content-[''] before:absolute before:w-full before:h-[56px]
           before:top-[3.5px] before:left-[4.06px] before:rounded-[24px] 
           before:border-2 before:border-slate-900 before:bg-slate-900"
    >
      <button
        type="submit"
        className={`w-[54.78px] h-[56px] sm:px-[24px] lg:w-[164.35px] sm:w-[158.48px] flex justify-center items-center ${
          bg_color ? "bg-violet-600" : "bg-slate-200"
        } text-slate-900 placeholder-slate-500 
      rounded-[24px] border-2 border-slate-900 focus:outline-none relative z-10`}
      >
        {bg_color ? <PlusWhite className="mr-1" /> : <Plus className="mr-1" />}
        <span
          className={`hidden sm:block ${
            bg_color ? "text-white" : "text-slate-900"
          }`}
        >
          추가하기
        </span>
      </button>
    </div>
  );
}
