import Link from "next/link";

function HomePage() {
  return (
    <div className=" w-full my-20 mx-auto flex flex-col gap-10 justify-start items-center ">
      <h2 className=" text-gray-900  w-full text-center text-9xl font-black leading-[10rem] ">
        Wellcome Online Shop!
      </h2>
      <Link
        href="/products"
        className="px-8 py-5 text-2xl font-bold text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        products
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
}

export default HomePage;
