import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-4">
      <Link href="/sign-in">
        <button className="px-1.5 text-xs font-semibold text-neutral-700 hover:text-green-600 sm:px-2 sm:text-sm">
          সাইন ইন
        </button>
      </Link>

      <Link href="/sign-up">
        <button className="btn h-9 min-h-9 bg-green-600 px-3 text-xs font-semibold text-white hover:bg-green-700 sm:h-10 sm:px-5 sm:text-sm">
          সাইন আপ
        </button>
      </Link>
    </div>
  );
};

export default NavLinks;
