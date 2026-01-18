import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Simple password-based admin auth (no user registration needed)
const ADMIN_PASSWORD = 'A12d3f4g5h6!@#';
const AUTH_STORAGE_KEY = 'dms_admin_auth';
const AUTH_EXPIRY_HOURS = 24;

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const { timestamp } = JSON.parse(stored);
        const expiryMs = AUTH_EXPIRY_HOURS * 60 * 60 * 1000;
        if (Date.now() - timestamp < expiryMs) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
