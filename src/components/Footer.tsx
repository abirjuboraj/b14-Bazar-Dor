

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-green-100 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-3 py-6 text-center sm:px-4 md:flex-row md:text-left">
        <p className="text-sm font-medium text-neutral-700">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-xs text-neutral-500 sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;