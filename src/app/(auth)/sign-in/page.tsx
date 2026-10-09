"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading || socialLoading !== null) return;

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { data, error } = await signIn.email({
        email: userData.email as string,
        password: userData.password as string,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      if (data?.user) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
      }
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoading || socialLoading !== null) return;

    setSocialLoading("google");

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি।");
        setSocialLoading(null);
      }

    } catch {
      toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
      setSocialLoading(null);
    }
  };

  const handleGithubSignIn = async () => {
    if (isLoading || socialLoading !== null) return;

    setSocialLoading("github");

    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি।");
        setSocialLoading(null);
      }
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-800 sm:text-3xl">
              সাইন ইন
            </h1>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>

          <form onSubmit={handleSignIn} className="mt-7 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-neutral-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="আপনার ইমেইল লিখুন"
                disabled={isLoading || socialLoading !== null}
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-neutral-700"
                >
                  পাসওয়ার্ড
                </label>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                disabled={isLoading || socialLoading !== null}
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}

              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />

            <span className="text-xs font-medium text-neutral-400">অথবা</span>

            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading || socialLoading !== null}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-700 transition-all duration-200 hover:border-green-200 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === "google" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-200 border-t-green-600" />
              ) : (
                <FcGoogle className="text-xl" />
              )}

              {socialLoading === "google"
                ? "সাইন ইন হচ্ছে..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={isLoading || socialLoading !== null}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-700 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === "github" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
              ) : (
                <FaGithub className="text-xl text-[#181717]" />
              )}

              {socialLoading === "github"
                ? "সাইন ইন হচ্ছে..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-600 transition hover:text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-500 transition hover:text-green-600"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
