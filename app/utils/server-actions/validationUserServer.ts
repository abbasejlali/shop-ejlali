import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { revalidatePath } from "next/cache";

async function validationUserServer() {
  "use server";
  const baseurl: string | undefined = process.env.NEXT_PUBLIC_BASE_URI;
  const cookie = cookies();

  const accessToken: RequestCookie | undefined | null =
    cookie.get("accessToken");

  const refreshToken: RequestCookie | undefined | null =
    cookie.get("refreshToken");

  if (accessToken) {
    const data = await fetch(`${baseurl}/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken.value}` },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => err);
    return data;
  } else if (refreshToken) {
    await fetch(`${baseurl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: `${refreshToken.value}`,
        expiresInMins: 60,
      }),
      credentials: "include",
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
          revalidatePath("/");
        }
      })
      .catch((err) => err);
  }
}

export default validationUserServer;
