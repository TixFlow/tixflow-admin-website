"use client";
import { useToast } from "@/hooks";
import { useGetMeQuery, useLoginMutation } from "@/services/apis/auth.api";
import { User, UserRole } from "@/services/types";
import { ILoginRequest } from "@/services/types/auth.type";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { set } from "react-hook-form";

type AuthContextType = {
  login: (body: ILoginRequest) => void;
  logout: () => void;
  user: User | null;
  isAuthorized: boolean;
  currentAccessToken: string | null;
  currentRefreshToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loginMutation] = useLoginMutation();
  const { showToast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentAccessToken, setCurrentAccessToken] = useState<string | null>(
    getAccessToken()
  );
  const [currentRefreshToken, setCurrentRefreshToken] = useState<string | null>(
    getRefreshToken()
  );
  const [user, setUser] = useState<User | null>(null);
  const setTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setCurrentAccessToken(accessToken);
    setCurrentRefreshToken(refreshToken);
  };
  const clearTokens = () => {
    removeAccessToken();
    removeRefreshToken();
    setCurrentAccessToken(null);
    setCurrentRefreshToken(null);
  };

  const checkAuthRef = useRef(false);

  const login = useCallback(
    async (body: ILoginRequest) => {
      try {
        const { data, status, message } = await loginMutation(body).unwrap();
        if (status === 200) {
          const { accessToken, refreshToken } = data;
          setTokens(accessToken, refreshToken);
          showToast("Login successful", "success");
          setIsAuthorized(true);
          checkAuthRef.current = false;
        } else {
          throw new Error(message);
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        showToast(errorMessage, "error");
      }
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthorized(false);
    clearTokens();
    if (pathname !== "/login") {
      router.push("/login");
    }
  }, [clearTokens]);

  const { data, isLoading, error } = useGetMeQuery();

  useEffect(() => {
    if (checkAuthRef.current) return;

    const checkAuth = () => {
      if (!currentAccessToken || !currentRefreshToken) {
        if (isAuthorized) logout();
        return;
      }

      if (isLoading) return;
      if (error) {
        checkAuthRef.current = true;
        if (isAuthorized) logout();
        return;
      }
      if (data) {
        checkAuthRef.current = true;
        if (data.status === 200) {
          const user = data.data;
          if ([UserRole.CUSTOMER, UserRole.EVENT_HOLDER].includes(user.role)) {
            showToast("You are not authorized to access this page", "error");
            logout();
            return;
          }
          setUser(user);
          setIsAuthorized(true);
          if (!pathname.includes("/dashboard")){
            router.push("/dashboard");
          }
        } else {
          showToast(data.message || "An error occurred", "error");
          logout();
        }
      }
    };

    if (currentAccessToken || isAuthorized) {
      checkAuth();
    }
  }, [currentAccessToken, isAuthorized, error, user, data]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthorized,
        currentAccessToken,
        currentRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
