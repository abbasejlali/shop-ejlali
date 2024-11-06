"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { revalidatePath } from "next/cache";
import { Authorization, GetNewAccessToken } from "../functions";

async function validationUserClient() {
  const cookie = cookies();

  const accessToken: RequestCookie | undefined | null =
    cookie.get("accessToken");
  const refreshToken: RequestCookie | undefined | null =
    cookie.get("refreshToken");

  if (accessToken) {
    return Authorization(accessToken);
  } else if (refreshToken) {
    const NewAccessToken: any = await GetNewAccessToken(refreshToken);

    if (NewAccessToken?.accessToken) {
      cookies().set("accessToken", NewAccessToken.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 60 minutes
      });
      cookies().set("refreshToken", NewAccessToken.refreshToken, {
        httpOnly: true,
        maxAge: 48 * 60 * 60 * 1000, // 48 h
      });
      revalidatePath("/");
    }
  }
}

export default validationUserClient;
