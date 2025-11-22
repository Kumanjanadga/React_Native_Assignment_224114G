import { Easing } from 'react-native-reanimated';

export const AnimationConfig = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  timing: {
    duration: 300,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  },
  slow: {
    duration: 500,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  },
  fast: {
    duration: 200,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  },
};

export const createFadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 400, delay },
});

export const createSlideUp = (delay = 0) => ({
  initial: { opacity: 0, translateY: 50 },
  animate: { opacity: 1, translateY: 0 },
  transition: { duration: 500, delay, easing: Easing.bezier(0.4, 0.0, 0.2, 1) },
});

export const createScaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 400, delay },
});

export const createSlideInRight = (delay = 0) => ({
  initial: { opacity: 0, translateX: 50 },
  animate: { opacity: 1, translateX: 0 },
  transition: { duration: 400, delay },
});

export const createRotate3D = (delay = 0) => ({
  initial: { opacity: 0, rotateX: '-15deg', rotateY: '15deg' },
  animate: { opacity: 1, rotateX: '0deg', rotateY: '0deg' },
  transition: { duration: 600, delay },
});

export const createBounce = () => ({
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 200,
  },
});

