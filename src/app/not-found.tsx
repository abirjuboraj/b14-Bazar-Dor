import Link from "next/link";
import { FaHome, FaShoppingBasket } from "react-icons/fa";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-7 flex h-32 w-32 items-center justify-center rounded-full bg-green-50">
          <FaShoppingBasket className="text-6xl text-green-600" />

          <span className="absolute -right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white shadow-md">
            404
          </span>
        </div>

        <p className="text-sm font-semibold tracking-wider text-green-600">
          পেজটি পাওয়া যায়নি
        </p>

        <h1 className="mt-2 text-3xl font-bold text-neutral-800 sm:text-4xl">
          এই পাতাটি খুঁজে পাওয়া যাচ্ছে না
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, ঠিকানা পরিবর্তন
          হয়েছে অথবা এটি আর available নেই।
        </p>

        <div className="mt-7 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md"
          >
            <FaHome className="text-sm" />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        <div className="mx-auto mt-10 h-px w-24 bg-green-200" />
      </div>
    </main>
  );
};

export default NotFound;