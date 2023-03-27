import { createContext, useContext, useMemo, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

type AuthContextProps = {
  token: string;
  loginCookie: (newToken: string) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");

  const loginCookie = (newToken: string) => {
    setToken(newToken);
    setCookie("userToken", newToken, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  };

  const value = useMemo(() => ({ token, loginCookie }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return { context };
};
