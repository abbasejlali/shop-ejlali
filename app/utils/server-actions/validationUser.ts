"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

async function validationUser() {
  const baseurl: string | undefined = process.env.NEXT_PUBLIC_BASE_URI;
  const cookie = cookies();

  const accessToken: RequestCookie | undefined | null =
    cookie.get("accessToken");

  const data = await fetch(`${baseurl}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));

  return data;
}

export default validationUser;
