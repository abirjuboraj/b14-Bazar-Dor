import Link from 'next/link';
import React from 'react';
import { FaHome, FaShoppingBasket } from 'react-icons/fa';

const EmptyState = () => {
    return (
        <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
            <FaShoppingBasket />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-neutral-800">
            এই ক্যাটাগরিতে কোনো পণ্য নেই
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
            দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যাচ্ছে না। অন্য
            ক্যাটাগরি দেখতে হোম পেজে ফিরে যান।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md"
          >
            <FaHome />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
};

export default EmptyState;