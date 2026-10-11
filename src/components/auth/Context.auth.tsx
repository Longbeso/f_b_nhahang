// context/AuthContext.tsx
import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface IUser {
  id: number;
  userName: string;
  role: string;
}

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<IUser | null>(() => {
    // ← đọc localStorage ngay khi khởi động
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const setUser = (userData: IUser | null) => {
    setUserState(userData); // ← 1. cập nhật state trong Context (React)

    if (userData) {
      // ← 2. nếu có data (đang login)
      localStorage.setItem("user", JSON.stringify(userData)); // lưu vào localStorage
    } else {
      // ← 3. nếu null (đang logout)
      localStorage.removeItem("user"); // xóa khỏi localStorage
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
