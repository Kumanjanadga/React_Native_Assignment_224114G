import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated from 'react-native-reanimated';

const GradientTextAnimated = ({ children, style, colors = ['#FFFFFF', '#E0E7FF', '#C7D2FE', '#F472B6'] }) => {
  if (Platform.OS === 'web') {
    const gradientColors = colors.join(', ');
    return (
      <View style={[styles.container, style]}>
        <Text
          style={[
            styles.gradientText,
            style,
            {
              background: `linear-gradient(135deg, ${gradientColors})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            },
          ]}
        >
          {children}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.gradientText, style]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  gradientText: {
    fontSize: 56,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
    alignSelf: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 16,
        fontFamily: 'System',
      },
      android: {
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 16,
        elevation: 8,
        fontFamily: 'sans-serif-condensed',
      },
      web: {
        textShadow: '0 4px 16px rgba(0, 0, 0, 0.75), 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        letterSpacing: '-0.5px',
        fontWeight: 900,
        WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)',
      },
    }),
  },
});

export default GradientTextAnimated;

