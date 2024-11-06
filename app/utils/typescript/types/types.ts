import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { TokenAuth, User } from "../interface/interface";

type AuthorizationType = (
  accessToken: RequestCookie | undefined | null
) => Promise<User | undefined>;

type GetNewAccessTokenType = (
  refreshToken: RequestCookie | undefined | null
) => Promise<TokenAuth | undefined>;

export { type AuthorizationType, type GetNewAccessTokenType };
