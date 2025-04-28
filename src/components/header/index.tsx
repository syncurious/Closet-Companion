import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utitlity/colors';
import Heading from '../heading';
import {logoutIcon} from '../../assets';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../config/redux/reducer';

const Header = (props: any) => {
  const {route, isLogout = true} = props;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setIsLogin(false));
  };
  return (
    <View style={{backgroundColor: Colors.primary, height: 60}}>
      <StatusBar backgroundColor={Colors.primary} barStyle={'dark-content'} />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          marginHorizontal: 20,
          flexDirection: 'row',
        }}>
        <Heading level={4} style={{fontWeight: 700}} children={route?.name} />
        {isLogout && (
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={logoutIcon}
              resizeMode="contain"
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
