import Image from "next/image";
import Navlinks from "./Navlinks";

const Navbar = () => {
  return (
    <header className="w-full bg-white">
      <div className="w-full py-3 sm:py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image
              src="/logo-icon.png"
              alt="bazar dor"
              width={48}
              height={48}
              className="h-10 w-10 shrink-0 rounded-lg bg-green-500 p-2 sm:h-12 sm:w-12"
            />

            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-tight sm:text-2xl">
                বাজার দর
              </h3>

              <p className="mt-0.5 truncate text-[11px] text-neutral-500 sm:text-sm">
                {new Date().toLocaleDateString("bn-BD", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <button className="px-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:text-green-600 sm:px-2 sm:text-sm">
              সাইন ইন
            </button>

            <button className="btn min-h-9 h-9 bg-green-600 px-3 text-xs font-semibold text-white hover:bg-green-700 sm:h-10 sm:px-5 sm:text-sm">
              সাইন আপ
            </button>
          </div>
        </div>
      </div>

      <Navlinks />
    </header>
  );
};

export default Navbar;
