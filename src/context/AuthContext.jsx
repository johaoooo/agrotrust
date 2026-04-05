import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur du localStorage au chargement
    const token = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');
    
    console.log('AuthContext chargé - token:', !!token, 'user:', savedUser);
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, tokens) => {
    console.log('Login appelé', userData);
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log('Logout appelé');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAgriculteur = user?.role === 'agriculteur';
  const isAcheteur = user?.role === 'acheteur';

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, loading, isAuthenticated, 
      isAgriculteur, isAcheteur 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
