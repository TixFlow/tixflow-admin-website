"use client";

import authApi from "@/apis/auth.api";
import { useLocalStorage } from "@/hooks/local-storage-hook";
import useToast from "@/hooks/toast";
import { User, UserRole } from "@/models";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({
  user: {} as User,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  logout: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useLocalStorage<User>("user", {} as User);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "access_token",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refresh_token",
    ""
  );

  useEffect(() => {
    if (accessToken && refreshToken) {
      authApi
        .getMe()
        .then((user) => {
          if (
            [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF].includes(
              user.role
            )
          ) {
            setUser(user);
            showToast("Login successful", "success");
            router.push("/dashboard");
          } else {
            showToast(
              `User with role ${user.role} is not allowed to access this page`,
              "error"
            );
            logout();
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser({} as User);
          setIsAuthenticated(false);
        });
    } else {
      logout();
      router.push("/login");
    }
  }, [isAuthenticated, accessToken, refreshToken, pathname]);

  const logout = () => {
    setUser({} as User);
    setIsAuthenticated(false);
    setAccessToken("");
    setRefreshToken("");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserConsumer = UserContext.Consumer;
export default UserContext;
