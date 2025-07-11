import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

export const useAuthListener = () => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('Current User', currentUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Clean up listener on unmount
  }, []);

  return {user, initializing};
};
