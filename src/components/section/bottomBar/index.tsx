import {
  AiFilledIcon,
  AiIcon,
  ChatBotFilledIcon,
  ChatBotIcon,
  dressFilledIcon,
  dressIcon,
  homeFilledIcon,
  homeIcon,
  userFilledIcon,
  userIcon,
} from '@/assets';
import Heading from '@/components/heading';
import {Colors} from '@/utitlity/colors';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Animated,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BottomModal from '../bottomModal';

const BottomNavBar: any = ({state, navigation}: any) => {
  const [active, setActive] = React.useState(0);
  const [modal, setModal] = React.useState(false);

  // console.log('state in bottom Nav', state);

  const modalhandler = () => {
    setModal(!modal);
  };

  let onPressHandler = (index: number) => {
    setActive(index);
    navigation.navigate(state.routeNames[index]);
  };

  useEffect(() => {
    onPressHandler(0);
  }, []);

  return (
    <View>
      <View style={styles.bottomNav}>
        <BottomModal isOpen={modal} onClose={modalhandler}
          />
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onPressHandler(0)}>
          <Image
            source={active == 0 ? homeFilledIcon : homeIcon}
            style={[
              styles.icon,
              {tintColor: active == 0 ? Colors.primary : Colors.white},
            ]}
          />
          <Heading level={6} style={styles.label}>
            <Text style={{color: active == 0 ? Colors.primary : Colors.white}}>
              Home
            </Text>
          </Heading>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onPressHandler(1)}>
          <Image
            source={active == 1 ? dressFilledIcon : dressIcon}
            style={[
              styles.icon,
              {tintColor: active == 1 ? Colors.primary : Colors.white},
            ]}
          />
          <Heading level={6} style={styles.label}>
            <Text style={{color: active == 1 ? Colors.primary : Colors.white}}>
              Marketplace
            </Text>
          </Heading>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.centerIcon]} onPress={modalhandler}>
          <Image
            source={active == 3 ? AiFilledIcon : AiIcon}
            style={[
              styles.icon,
              {tintColor: Colors.white, width: 20, height: 20},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onPressHandler(3)}>
          <Image
            source={active == 3 ? ChatBotFilledIcon : ChatBotIcon}
            style={[
              styles.icon,
              {tintColor: active == 3 ? Colors.primary : Colors.white},
            ]}
          />
          <Heading level={6} style={styles.label}>
            <Text style={{color: active == 3 ? Colors.primary : Colors.white}}>
              Chat
            </Text>
          </Heading>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onPressHandler(4)}>
          <Image
            source={active == 4 ? userFilledIcon : userIcon}
            style={[
              styles.icon,
              {tintColor: active == 4 ? Colors.primary : Colors.white},
            ]}
          />
          <Text
            style={[
              styles.label,
              {color: active == 4 ? Colors.primary : Colors.white},
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'relative',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.black,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.white + '20',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -10},
        shadowRadius: 10,
        shadowOpacity: 1,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  centerIcon: {
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    borderRadius: 33.5,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
  },
  navItem: {
    alignItems: 'center',
    width: '20%',
    // backgroundColor: Colors.primary,
  },
  active: {
    position: 'absolute',
    height: 5,
    width: '15%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
    color: Colors.primary,
    tintColor: Colors.primary,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: Colors.secondary,
  },
  label: {
    color: Colors.secondary,
    fontSize: 12,
  },
});

export default BottomNavBar;
