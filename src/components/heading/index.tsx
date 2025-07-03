import React, {JSX} from 'react';
import {Text, StyleSheet, ViewStyle, TextStyle, TextProps} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// const ColorsTyped: Record<ColorTypes, string> = Colors;

interface PropsType extends TextProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  selectable?: boolean;
  style?: ViewStyle | TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 22,
  },
  h3: {
    fontSize: 20,
  },
  h4: {
    fontSize: 18,
  },
  h5: {
    fontSize: 16,
  },
  h6: {
    fontSize: 14,
  },
});

export default function Heading(props: PropsType) {
  const {level, style, selectable, children, numberOfLines} = props;
  const headingStyle = [
    {color: Colors.white},
    styles[`h${level}` as keyof typeof styles],
    // color && {color: Colors[color as ColorTypes]},
    style,
  ];

  return (
    <Text
      style={headingStyle}
      numberOfLines={numberOfLines}
      selectable
      >
      {children}
    </Text>
  );
}
