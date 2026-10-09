"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-16">
        <p className="text-center text-sm text-neutral-500">
          প্রোফাইলের তথ্য লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error("সাইন আউট করা সম্ভব হয়নি।");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    redirect("/sign-in");
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
          আমার প্রোফাইল
        </h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500 sm:text-base">
          আপনার অ্যাকাউন্টের তথ্য দেখুন এবং প্রয়োজন অনুযায়ী পরিবর্তন করুন।
        </p>
      </div>

      <section className="mt-7 flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "ব্যবহারকারীর ছবি"}
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 rounded-full border border-neutral-200 object-cover sm:h-18 sm:w-18"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700 sm:h-18 sm:w-18">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-neutral-800 sm:text-xl">
              {user.name || "নাম দেওয়া হয়নি"}
            </h2>
            <p className="mt-1 break-all text-sm text-neutral-500">
              {user.email}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              সক্রিয় অ্যাকাউন্ট
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 md:w-auto"
        >
          <FaSignOutAlt />
          সাইন আউট
        </button>
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-neutral-800">
            অ্যাকাউন্টের তথ্য
          </h2>
          <p className="mt-1 text-sm leading-6 text-neutral-500">
            আপনার নাম ও ইমেইল ঠিকানা এখানে দেখতে পারবেন।
          </p>
        </div>

        <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-2">
          <div className="min-w-0">
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              আপনার নাম
            </label>
            <div className="flex min-h-12 items-center wrap-break-word rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
              {user.name || "নাম দেওয়া হয়নি"}
            </div>
          </div>

          <div className="min-w-0">
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              ইমেইল ঠিকানা
            </label>
            <div className="flex min-h-12 items-center break-all rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm text-neutral-500">
              {user.email}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-neutral-100 p-4 sm:p-6">
          <Link
            href="/profile/updateProfile"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 sm:w-auto"
          >
            <FaEdit />
            তথ্য পরিবর্তন করুন
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
