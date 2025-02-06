import Link from "next/link";
import Logo from "@/icons/header_logo.svg";
import LogoSmall from "@/icons/header_logo_sm.svg";

export default function Gnb() {
  return (
    <header className="w-full h-[60px] bg-white border-b border-slate-200 flex justify-center items-center sticky top-0 z-50">
      <Link href="/" className="block max-w-[1200px] w-full ">
        <Logo className="hidden sm:block sm:ml-[24px] lg:ml-0" />
        <LogoSmall className="block ml-[16px] sm:hidden lg:hidden lg:ml-0" />
      </Link>
    </header>
  );
}
