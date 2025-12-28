import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('pi_user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return { user, isAuthenticated: !!user };
};
