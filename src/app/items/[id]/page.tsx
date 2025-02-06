import ScreenCenter from "@/components/screen_center";
import ButtonCustom from "@/components/styles/button_custom";
import UploadImg from "@/icons/img.svg";
import PlusDark from "@/icons/plus_dark.svg";
import Edit from "@/icons/edit.svg";

export default async function Items({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ScreenCenter bgColor="white">
      <section className="lg:px-[102px]">
        <div className="w-full h-[64px] rounded-[27px] bg-white border-2 border-slate-900 flex justify-center items-center">
          <div className="w-8 h-8 flex-shrink-0 bg-yellow-50 border-2 border-slate-900 rounded-[27px] ml-3 mr-4 cursor-pointer"></div>

          <input type="text" required className="focus:outline-none" />
        </div>
        <div className="flex gap-6 sm:mt-6 mt-4 flex-col md:flex-row">
          <div className="relative w-full md:flex-[4] h-[311px] rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 box-border flex justify-center items-center">
            <UploadImg />
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-[50%] bg-slate-200 flex justify-center items-center cursor-pointer">
              <PlusDark />
            </div>
            {/* <div className="absolute bottom-4 right-4 w-16 h-16 rounded-[50%] bg-slate-900/[0.5] border-2 border-slate-900 flex justify-center items-center cursor-pointer">
              <Edit />
            </div> */}
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
            <textarea className="relative w-full h-[248px] bg-transparent resize-none outline-none px-4 scrollbar-thin" />
          </div>
        </div>
        <div className="mt-6 flex justify-center md:justify-end">
          <ButtonCustom type="confirm" text="수정하기" />
          <ButtonCustom type="delete" text="삭제하기" />
        </div>
      </section>
    </ScreenCenter>
  );
}
