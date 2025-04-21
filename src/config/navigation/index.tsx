import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './Auth';
import UserNavigation from './User';

const Navigation = () => {
  const isAuth = false;
  return (
    <NavigationContainer>
      {isAuth ? <AuthNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
