import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './Auth';
import UserNavigation from './User';
import {useSelector} from 'react-redux';
import {useAuthListener} from '@/service/AuthListner';

const Navigation = () => {
  const isAuth = useSelector((state: any) => state.user?.isLogin);
  const {initializing, user} = useAuthListener();

  return (
    <NavigationContainer>
      {!user ? <AuthNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
