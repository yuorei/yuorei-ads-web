import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, register, login, logout } from '../lib/auth';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => unsubscribe();
  }, []);

  return { user, register, login, logout };
};

export default useAuth;
