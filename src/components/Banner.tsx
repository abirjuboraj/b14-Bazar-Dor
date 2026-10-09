import Image from "next/image";
import CurrentDate from "./CurrentDate";

const Banner = () => {
  return (
    <section className=" my-5 w-full mx-auto max-w-6xl px-3 sm:my-7 sm:px-4">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-green-100 bg-white sm:rounded-3xl md:flex-row md:items-center">
        <div className="flex-1 p-5 sm:p-7 md:p-10 ">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600 sm:text-sm">
              <CurrentDate></CurrentDate>
            </p>

            <h2 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h2>

            <p className="mt-4 max-w-lg text-sm font-medium text-neutral-500 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড় সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="btn mt-6 rounded-xl border-0 bg-green-600 px-5 text-sm font-semibold text-white hover:bg-green-700"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        <div className="flex justify-center px-5 pb-5 sm:px-8 sm:pb-8 md:w-[42%] md:px-6 md:pb-0 lg:w-[40%]">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={400}
            height={400}
            priority
            className="h-auto w-52 sm:w-64 md:w-full md:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
