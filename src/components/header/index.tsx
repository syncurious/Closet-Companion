import {Image, StatusBar, View} from 'react-native';
import {Colors} from '../../utitlity/colors';
import Heading from '../heading';
import {logoutIcon} from '../../assets';

const Header = (props: any) => {
  const {route, isLogout = true} = props;
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
        <Heading level={4} style={{fontWeight: 600}} children={route?.name} />
        {isLogout && (
          <Image
            source={logoutIcon}
            resizeMode="contain"
            style={{height: 20, width: 20}}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
