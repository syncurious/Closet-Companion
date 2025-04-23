import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './Auth';
import UserNavigation from './User';
import {useSelector} from 'react-redux';

const Navigation = () => {
  const isAuth = useSelector((state: any) => state.user?.isLogin);
  return (
    <NavigationContainer>
      {isAuth ? <AuthNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
