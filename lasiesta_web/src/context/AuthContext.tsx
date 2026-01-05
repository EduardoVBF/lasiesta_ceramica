'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type User = {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
};

type AuthContextData = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = !!user && !!token;

  // 🔁 Recuperar sessão ao carregar a aplicação
  useEffect(() => {
    const storedToken = localStorage.getItem('lasiesta:token');
    const storedUser = localStorage.getItem('lasiesta:user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(token: string, user: User) {
    localStorage.setItem('lasiesta:token', token);
    localStorage.setItem('lasiesta:user', JSON.stringify(user));

    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('lasiesta:token');
    localStorage.removeItem('lasiesta:user');

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
