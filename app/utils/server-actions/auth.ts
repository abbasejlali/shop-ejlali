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
      expiresInMins: 60,
    }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.accessToken) {
        cookies().set("accessToken", data.accessToken, {
          httpOnly: true,
          maxAge: 30 * 60 * 1000, // 30 minutes
        });
        cookies().set("refreshToken", data.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000, // 60 minutes
        });
        revalidatePath("auth");
      } else {
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
}

export default auth;
