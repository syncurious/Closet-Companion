import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  JSX,
} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {Colors, ColorTypes} from '../../utitlity/colors';

interface Props {
  label?: string;
  prefixIcon?: ImageSourcePropType;
  required?: boolean;
  regex?: RegExp;
  regexError?: string;
  type?: TextInput['props']['keyboardType'] | 'password';
  initialValue?: string;
  value?: string;
  error?: string;
  onChangeText?: (event: string) => void;
  onChange?: (event: any) => void;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  style?: TextStyle | ViewStyle;
  iconPosition?: 'left' | 'right';
  inputStyle?: TextInput['props']['style'];
  iconClick?: () => void;
  iconElement?: JSX.Element;
  multiline?: boolean;
  variant?: 'bordered' | 'contained' | 'underline';
  color?: ColorTypes;
  maxLength?: number;
}

const Input = (props: Props) => {
  const {
    label,
    prefixIcon,
    type,
    initialValue,
    value,
    onChangeText,
    onChange,
    onPress,
    onFocus,
    onBlur,
    disabled,
    style,
    inputStyle,
    error,
    iconPosition,
    iconClick,
    iconElement,
    multiline,
    variant = 'contained',
    color = 'white',
    maxLength,
  } = props;
  const [inputValue, setInputValue] = useState(initialValue);
  const [focus, setFocus] = useState(false);
  const [errorMessage, setError] = useState<string | null>(error || null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, inputVariants[variant](color, ''), style]}>
        {iconElement && (!iconPosition || iconPosition == 'left')
          ? iconElement
          : null}
        {prefixIcon && (!iconPosition || iconPosition == 'left') ? (
          <TouchableOpacity
            onPress={() => iconClick?.()}
            disabled={!iconClick}
            style={[styles.icon]}>
            <Image
              source={prefixIcon as ImageSourcePropType}
              style={{height: 24, width: 24}}
            />
          </TouchableOpacity>
        ) : null}
        <TextInput
          style={[
            styles.input,
            {
              borderWidth: 1,
              borderColor: focus
                ? Colors.primary
                : errorMessage
                ? Colors.actionRed
                : Colors.border,
            },
            inputVariants[variant](
              color,
              (inputStyle as TextStyle)?.color as string,
            ),
            prefixIcon && (!iconPosition || iconPosition == 'left')
              ? styles.inputWithLeftIcon
              : prefixIcon && iconPosition == 'right'
              ? styles.inputWithRightIcon
              : null,
            errorMessage ? styles.inputError : null,
            inputStyle,
          ]}
          placeholderTextColor={Colors.subHeading + '60'}
          value={inputValue}
          onChangeText={handleChange}
          onChange={onChange}
          editable={!disabled}
          onPressIn={onPress}
          placeholder={label}
          keyboardType={
            type === 'password'
              ? 'default'
              : (type as TextInput['props']['keyboardType'])
          }
          secureTextEntry={type === 'password'}
          multiline={multiline}
          maxLength={maxLength}
          onFocus={() => {
            onFocus?.();
            setFocus(true);
          }}
          onBlur={() => {
            onBlur?.();
            setFocus(false);
          }}
        />
        {iconElement && iconPosition == 'right' ? iconElement : null}
        {prefixIcon && iconPosition == 'right' ? (
          <TouchableOpacity
            onPress={() => iconClick?.()}
            disabled={!iconClick}
            style={[styles.iconRigth]}>
            <Image
              source={prefixIcon as ImageSourcePropType}
              style={{height: 24, width: 24}}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    borderRadius: 15,
  },
  iconRigth: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -13}],
    width: 24,
    height: 24,
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    top: '50%',
    transform: [{translateY: -13}],
    width: 24,
    height: 24,
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 15,
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

const inputVariants = {
  bordered: (bgColor: string, color: string) => ({
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: color,
  }),
  contained: (bgColor: string) => ({
    backgroundColor: Colors.border,
    color: Colors.subHeading,
  }),
  underline: (color: string) => ({
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: color,
  }),
};

export default Input;
