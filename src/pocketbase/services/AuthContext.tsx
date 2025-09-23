// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './pocketbase';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  created: string;
  updated: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-login on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Try auto-login with test user
        const userData = await authService.autoLogin();
        setUser(userData as unknown as User);
      } catch (err) {
        console.error('Authentication initialization failed:', err);
        setError('Failed to authenticate. Please check PocketBase connection.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth changes
    const unsubscribe = authService.subscribeToAuthState((model) => {
      setUser(model);
    });

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  // Manual login (for future use)
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be used for manual login in the future
      // For now, we're using auto-login
      throw new Error('Manual login not implemented - using auto-login');
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Refresh authentication
  const refreshAuth = async () => {
    try {
      const userData = await authService.refreshAuth();
      setUser(userData as unknown as User);
    } catch (err) {
      console.error('Failed to refresh auth:', err);
      setError('Authentication refresh failed');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;