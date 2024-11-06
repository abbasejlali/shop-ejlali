// type script
import {
  AuthorizationType,
  GetNewAccessTokenType,
} from "./typescript/types/types";

const baseurl: string | undefined = process.env.NEXT_PUBLIC_BASE_URI;
const Authorization: AuthorizationType = async (accessToken) => {
  const data = await fetch(`${baseurl}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
  return data;
};

const GetNewAccessToken: GetNewAccessTokenType = async (refreshToken) => {
  const data = await fetch(`${baseurl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: `${refreshToken?.value}`,
      expiresInMins: 60,
    }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

  return data;
};

export { Authorization, GetNewAccessToken };
