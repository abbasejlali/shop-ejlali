import { permanentRedirect } from "next/navigation";
import LoginPage from "../components/template/LoginPage";

// typescript
import { User } from "../utils/typescript/interface/interface";

// server actions
import validationUserServer from "../utils/server-actions/validationUserServer";

async function Login() {
  const data: User = await validationUserServer();
  if (data?.id) {
    permanentRedirect("/");
  }

  return <LoginPage />;
}

export default Login;
