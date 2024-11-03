import { cookies } from "next/headers";
import LoginPage from "../components/template/LoginPage";

// types
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";

async function Login() {
  const cookie = cookies();

  const accessToken: RequestCookie | undefined = cookie.get("accessToken");

  if (accessToken) {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URI;
    fetch(`${baseurl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    redirect("/");
  }
  return <LoginPage />;
}

export default Login;
