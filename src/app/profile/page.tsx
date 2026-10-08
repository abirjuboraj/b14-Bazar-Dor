"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!session?.user) return null;

  const user = session.user;

  const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    setLoading(true);

    const { error } = await updateUser({
      name: name.trim(),
    });

    setLoading(false);

    if (error) {
      toast.error("নাম আপডেট করা সম্ভব হয়নি।");
      return;
    }

    setEditing(false);
    toast.success("নাম সফলভাবে আপডেট হয়েছে।");
  };

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error("সাইন আউট করা সম্ভব হয়নি।");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    redirect("/sign-in")
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <h1 className="text-2xl font-bold text-neutral-800 sm:text-3xl">
        আমার প্রোফাইল
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600 sm:h-16 sm:w-16">
              {user.name?.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-neutral-800 sm:text-base">
              {user.name}
            </h2>
            <p className="truncate text-xs text-neutral-500 sm:text-sm">
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-100 md:w-auto"
        >
          <FaSignOutAlt />
          সাইন আউট
        </button>
      </section>

      <section className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-bold text-neutral-800">
          অ্যাকাউন্টের তথ্য
        </h2>

        <form onSubmit={handleUpdate} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-700">
              নাম
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={name}
                disabled={!editing}
                onChange={(e) => setName(e.target.value)}
                className="h-11 min-w-0 flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-green-500 disabled:text-neutral-500"
              />

              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 sm:w-auto"
                >
                  <FaEdit />
                  Edit
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-700">
              ইমেইল
            </label>

            <input
              type="email"
              value={user.email}
              disabled
              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 text-sm text-neutral-500"
            />
          </div>

          {editing && (
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "আপডেট হচ্ছে..." : "Update"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setName(user.name || "");
                  setEditing(false);
                }}
                className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};

export default ProfilePage;