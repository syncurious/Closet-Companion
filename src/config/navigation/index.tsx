import {NavigationContainer} from '@react-navigation/native';
import UserNavigation from './User';
import {useAuthListener} from '@/service/AuthListner';
import {AuthNavigation, SplashNavigation} from './Auth';

const Navigation = () => {
  const {initializing, user} = useAuthListener();

  return (
    <NavigationContainer>
      {initializing ? (
        <SplashNavigation />
      ) : !user ? (
        <AuthNavigation />
      ) : (
        <UserNavigation />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
