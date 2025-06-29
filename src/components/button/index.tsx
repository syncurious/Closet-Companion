import React, {JSX} from 'react';
import {
  ButtonProps,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Loader from '../loader';
import {Colors, ColorTypes} from '../../utitlity/colors';

interface propsType {
  children?: string | JSX.Element | JSX.Element[];
  onPress?: Function;
  style?: StyleProp<TextStyle | ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  prefixIcon?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
  variant: 'outline' | 'contained';
  color?: ColorTypes;
  icon?: JSX.Element;
}

export default function Button(props: propsType) {
  let {
    style,
    textStyle,
    children,
    onPress,
    variant,
    prefixIcon,
    iconPosition,
    isLoading,
    disabled,
    color = 'primary',
    icon,
  } = props;
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      style={[
        styles.button,
        variant == 'outline'
          ? {...styles.outline, borderColor: Colors[color] as ColorTypes}
          : {...styles.contained, backgroundColor: Colors[color] as ColorTypes},
        (isLoading || disabled) && styles.disabled,
        style,
      ]}
      onPress={t => onPress && onPress(t)}>
      {isLoading ? (
        <Loader
          size="small"
          color={
            variant == 'outline' ? (Colors[color] as ColorTypes) : Colors.white
          }
        />
      ) : (
        <>
          {icon && icon}
          {prefixIcon && (!iconPosition || iconPosition == 'left') ? (
            <Image
              source={prefixIcon as ImageSourcePropType}
              style={{width: 20, height: 20}}
            />
          ) : null}
          {children && (
            <Text
              style={[
                variant == 'outline'
                  ? {color: Colors[color] as ColorTypes}
                  : styles.textContained,
                textStyle,
              ]}>
              {children}
            </Text>
          )}
          {prefixIcon && iconPosition == 'right' ? (
            <Image
              source={prefixIcon as ImageSourcePropType}
              style={{width: 20, height: 20}}
            />
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    gap: 10,
    padding: 12,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  outline: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  contained: {
    backgroundColor: Colors.primary,
  },
  textContained: {
    color: Colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
});
