import { createContext, useContext, useEffect, useMemo, useState } from "react";
import http from "../api/http";

const AuthContext = createContext(null);

const TOKEN_KEY = "namo_admin_token";
const ADMIN_KEY = "namo_admin_data";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(() => {
    const cached = localStorage.getItem(ADMIN_KEY);
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    const validateSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await http.get("/auth/me");
        setAdmin(data.admin);
        localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
      } catch (error) {
        setToken(null);
        setAdmin(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ADMIN_KEY);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await http.post("/auth/login", { email, password });
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  };

  const value = useMemo(
    () => ({
      token,
      admin,
      loading,
      isAuthenticated: Boolean(token && admin),
      login,
      logout
    }),
    [token, admin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
};

export { AuthProvider, useAuth };
