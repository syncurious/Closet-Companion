import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors} from '../../utitlity/colors';

interface Props {
  color?: string;
  size?: 'small' | 'large';
  style?: ViewStyle | TextStyle;
  loaderStyle?: ViewStyle | TextStyle;
}

const Loader = (props: Props) => {
  let {color, style, loaderStyle, size} = props;
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        style={loaderStyle}
        size={size ?? 'large'}
        color={color ?? Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
