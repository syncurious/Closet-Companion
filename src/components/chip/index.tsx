import {Image, StyleSheet, View} from 'react-native';
import Heading from '../heading';
import {checkIcon} from '@/assets';
import {Colors} from '@/utitlity/colors';

export function Chip({label, isActive}: {label: string; isActive: boolean}) {
  return (
    <View
      style={[
        styles.chipContainer,
        {backgroundColor: isActive ? Colors.primary : Colors.white + '20'},
      ]}>
      {isActive ? <Image source={checkIcon} style={styles.checkIcon} /> : null}
      <Heading level={6}> {label} </Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 8,
    borderColor: '#fff',
  },
  checkIcon: {
    tintColor: Colors.white,
    width: 10,
    height: 10,
  },
});
