import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {ReactNode} from 'react';
import Dimension from '../../utitlity/Dimension';
import ThemeColors from '../../utitlity/colors';

const width = Dimension.width;
interface ContainerProps {
  children: ReactNode;
  style?: ViewProps['style'];
  fullScreen?: boolean;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  verticalPadding?: boolean;
  contentContainerStyle?: ViewProps['style'];
  horizontal?: boolean;
  refreshControl?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const Container = ({
  children,
  style,
  fullScreen,
  scrollEnabled,
  showsVerticalScrollIndicator,
  showsHorizontalScrollIndicator,
  verticalPadding,
  contentContainerStyle,
  horizontal,
  refreshControl,
  onRefresh,
  refreshing = false,
}: ContainerProps) => {
  const containerStyles = [
    styles.container,
    {
      width: fullScreen ? Dimension.width : undefined,
      height: fullScreen ? Dimension.height : undefined,
    },
    {
      paddingVertical: verticalPadding ? 16 : 0,
    },
    width > 600 ? styles.tabletPadding : styles.mobilePadding, // example for responsiveness
    style, // allows additional styles to be passed from props
  ];

  return (
    <>
      {scrollEnabled ? (
        <ScrollView
          contentContainerStyle={contentContainerStyle}
          horizontal={horizontal ?? false}
          style={containerStyles}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          refreshControl={
            refreshControl ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={ThemeColors.primaryColors.mainColor}
                colors={[ThemeColors.primaryColors.mainColor]}
                progressBackgroundColor={ThemeColors.backgroundShades.surface1}
                progressViewOffset={0}
              />
            ) : undefined
          }>
          <StatusBar barStyle={'light-content'} />
          {children}
        </ScrollView>
      ) : (
        <View style={containerStyles}>
          <StatusBar barStyle={'light-content'} />
          {children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: ThemeColors.primaryColors.bgColor, // default background color
  },
  mobilePadding: {
    paddingHorizontal: 16,
    maxWidth: '100%',
  },
  tabletPadding: {
    paddingHorizontal: 32,
    maxWidth: 600,
  },
});

export default Container;
