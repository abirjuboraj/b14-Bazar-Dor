"use client";

import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const NavLinks = () => {
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error("সাইন আউট করা সম্ভব হয়নি।");
      return;
    }

    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    redirect("/");
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200" />
        <div className="hidden h-4 w-20 animate-pulse rounded bg-neutral-200 sm:block" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/sign-in"
          className="px-1.5 text-xs font-semibold text-neutral-700 transition hover:text-green-600 sm:px-2 sm:text-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 sm:px-5 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const firstLetter = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex shrink-0 items-center gap-2 rounded-xl px-1.5 py-1.5 transition hover:bg-neutral-50 sm:gap-2.5 sm:px-2"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={20}
            height={20}
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 sm:h-10 sm:w-10">
            {firstLetter}
          </div>
        )}

        <span className="hidden whitespace-nowrap text-sm font-semibold text-neutral-700 sm:block">
          {user.name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg sm:w-64 sm:rounded-2xl">
          <div className="border-b border-neutral-100 px-3 py-2.5 sm:px-4 sm:py-3">
            <p className="truncate text-xs font-semibold text-neutral-800 sm:text-sm">
              {user.name}
            </p>

            <p className="mt-1 truncate text-[10px] text-neutral-500 sm:text-xs">
              {user.email}
            </p>
          </div>

          <div className="p-1.5 sm:p-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-neutral-700 transition hover:bg-green-50 hover:text-green-600 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm"
            >
              <FaUser className="text-xs sm:text-sm" />
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm"
            >
              <FaSignOutAlt className="text-xs sm:text-sm" />
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavLinks;
