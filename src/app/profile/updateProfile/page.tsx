"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const UpdateInformationPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16">
        <p className="text-center text-sm text-neutral-500">
          আপনার তথ্য লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (!session?.user) return null;

  return (
    <UpdateInformationForm
      key={session.user.id}
      initialName={session.user.name || ""}
    />
  );
};

const UpdateInformationForm = ({
  initialName,
}: {
  initialName: string;
}) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === initialName.trim()) {
      toast.error("আপনি কোনো পরিবর্তন করেননি।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error("তথ্য আপডেট করা সম্ভব হয়নি।");
        return;
      }

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!", {
        duration: 4000,
      });

      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6 sm:py-10">
      <Link
        href="/profile"
        className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-medium text-neutral-500 transition hover:text-green-700"
      >
        <FaArrowLeft />
        প্রোফাইলে ফিরে যান
      </Link>

      <section className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 bg-linear-to-r from-green-50 to-white px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl text-green-700">
            <FaSave />
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
            তথ্য পরিবর্তন করুন
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500 sm:text-base">
            নিচের ঘরে আপনার নতুন নাম লিখে তথ্য আপডেট করুন।
          </p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-5 p-5 sm:p-8"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs leading-5 text-neutral-400">
              আপনার প্রোফাইলে এই নামটি দেখানো হবে।
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
            <Link
              href="/profile"
              className="flex min-h-12 items-center justify-center rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
            >
              বাতিল করুন
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSave />
              {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default UpdateInformationPage;