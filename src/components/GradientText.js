import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const GradientText = ({ children, style }) => {
  if (!children) {
    return null;
  }

  const textContent = typeof children === 'string' ? children : String(children || '');
  
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style]}>
        <Text style={[styles.mainText, style]}>{textContent}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.deepShadow, style]}>{textContent}</Text>
      <Text style={[styles.baseShadow, style]}>{textContent}</Text>
      <Text style={[styles.glowShadow, style]}>{textContent}</Text>
      <Text style={[styles.pinkGlow, style]}>{textContent}</Text>
      <Text style={[styles.mainText, style]}>{textContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        display: 'flex',
        width: '100%',
      },
    }),
  },
  deepShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    color: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    textAlign: 'center',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -1.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 12,
      },
      android: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 12,
      },
      web: {
        textShadow: '0 5px 12px rgba(0, 0, 0, 0.8)',
        pointerEvents: 'none',
        width: '100%',
      },
    }),
  },
  baseShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    color: 'rgba(0, 0, 0, 0.3)',
    zIndex: 2,
    textAlign: 'center',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -1.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 8,
      },
      android: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 8,
      },
      web: {
        textShadow: '0 3px 8px rgba(0, 0, 0, 0.6)',
        pointerEvents: 'none',
        width: '100%',
      },
    }),
  },
  glowShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    color: 'rgba(167, 139, 250, 0.7)',
    zIndex: 3,
    textAlign: 'center',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -1.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(167, 139, 250, 1)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 35,
      },
      android: {
        textShadowColor: 'rgba(167, 139, 250, 1)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 35,
      },
      web: {
        textShadow: '0 0 35px rgba(167, 139, 250, 1)',
        pointerEvents: 'none',
        width: '100%',
      },
    }),
  },
  pinkGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    color: 'rgba(244, 114, 182, 0.6)',
    zIndex: 4,
    textAlign: 'center',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -1.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(244, 114, 182, 0.9)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 25,
      },
      android: {
        textShadowColor: 'rgba(244, 114, 182, 0.9)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 25,
      },
      web: {
        textShadow: '0 0 25px rgba(244, 114, 182, 0.9)',
        pointerEvents: 'none',
        width: '100%',
      },
    }),
  },
  mainText: {
    color: '#FFFFFF',
    position: 'relative',
    zIndex: 5,
    textAlign: 'center',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -1.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        textShadowColor: 'rgba(255, 255, 255, 0.9)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 20,
      },
      android: {
        fontFamily: 'sans-serif-condensed',
        textShadowColor: 'rgba(255, 255, 255, 0.9)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 20,
      },
      web: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 900,
        WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)',
        WebkitTextFillColor: '#FFFFFF',
        textShadow: '0 2px 20px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(167, 139, 250, 0.6), 0 0 60px rgba(244, 114, 182, 0.4)',
        display: 'block',
        position: 'relative',
        width: '100%',
      },
    }),
  },
});

export default GradientText;

