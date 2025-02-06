interface IInput {
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SInput({ name, placeholder, onChange }: IInput) {
  return (
    <div
      className="w-full relative before:content-[''] before:absolute before:w-full before:h-[56px]
             before:top-[3.5px] before:left-[4.06px] before:rounded-[24px] 
             before:border-2 before:border-slate-900 before:bg-slate-900"
    >
      <input
        required
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full h-[56px] px-[24px] bg-slate-100 text-slate-900 placeholder-slate-500 
      rounded-[24px] border-2 border-slate-900 focus:outline-none relative z-10"
      />
    </div>
  );
}
