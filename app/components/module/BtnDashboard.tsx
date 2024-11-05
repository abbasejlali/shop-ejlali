"use client";
import validationUser from "@/app/utils/server-actions/validationUser";
import Link from "next/link";
import { useEffect, useState } from "react";

function BtnDashboard() {
  const [views, setViews]: any = useState({});
  const [isLoading, setIsLoading]: any = useState(true);

  useEffect(() => {
    const updateViews = async () => {
      const updatedViews: any = await validationUser();
      setViews(updatedViews);
    };
    setIsLoading(false);

    updateViews();
  }, []);

  useEffect(() => {
    console.log(views);
  }, [views]);
  return (
    <>
      <Link
        href={`/${views?.id ? "dashboard" : "login"}`}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? "loading" : views?.id ? "dashboard" : "login"}
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
    </>
  );
}

export default BtnDashboard;
