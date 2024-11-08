"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function auth(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const baseurl = process.env.NEXT_PUBLIC_BASE_URI;

  await fetch(`${baseurl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60, // optional, defaults to 60
    }),
    credentials: "include", // Include cookies (e.g., accessToken) in the request
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.accessToken) {
        cookies().set("accessToken", data.accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000, // 60 minutes
        });
        cookies().set("refreshToken", data.refreshToken, {
          httpOnly: true,
          maxAge: 48 * 60 * 60 * 1000, // 48 h
        });
        revalidatePath("auth");
      } else {
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
}

export default auth;
