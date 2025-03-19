
import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  // Extract pointerEvents from props if it exists
  const { pointerEvents, style, ...otherProps } = props;
  
  // Merge pointerEvents into style if it exists
  const updatedStyle = pointerEvents 
    ? [style, { pointerEvents }] 
    : style;
  
  return (
    <PlatformPressable
      {...otherProps}
      style={updatedStyle}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        
        props.onPressIn?.(ev);
      }}
    />
  );
}
