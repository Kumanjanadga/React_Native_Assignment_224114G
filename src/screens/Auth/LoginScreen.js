import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../theme/ThemeContext';
import { setUser } from '../../redux/slices/authSlice';
// Make sure you have loginSchema defined in your validation file
import { loginSchema } from '../../utils/validation'; 
import FadeInView from '../../components/FadeInView';
import AnimatedButton from '../../components/AnimatedButton';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  
  // Setup Form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Animation Shared Values
  const headerScale = useSharedValue(0.8);
  const iconScale = useSharedValue(0);

  useEffect(() => {
    // Start Entrance Animations
    headerScale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
    });
    iconScale.value = withDelay(300, withSpring(1, {
      damping: 12,
      stiffness: 250,
    }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const onSubmit = async (data) => {
    try {
      // Simulate API Login
      // In a real app, you would send data.email and data.password to your backend here
      const user = {
        id: Date.now(),
        name: 'FitBuddy User', // Placeholder until you connect backend
        email: data.email,
      };
      
      dispatch(setUser(user));
      // Navigation is usually handled by the AppNavigator listening to the user state,
      // but if not, you might need: navigation.navigate('Main');
      
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <LinearGradient
            colors={[
              theme.colors.gradientStart,
              theme.colors.gradientEnd,
              theme.colors.gradientAccent,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          >
            <View style={styles.headerPattern} />
            <Animated.View style={[styles.iconCircle, iconAnimatedStyle]}>
              <Feather name="log-in" size={48} color="#FFFFFF" />
            </Animated.View>
            <FadeInView delay={400}>
              <Text style={styles.title}>Welcome Back</Text>
            </FadeInView>
            <FadeInView delay={500}>
              <Text style={styles.subtitle}>Sign in to continue 🏋️</Text>
            </FadeInView>
          </LinearGradient>
        </Animated.View>

        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Feather
              name="mail"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              )}
            />
          </View>
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
              )}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          {/* Forgot Password Link */}
          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => Alert.alert('Info', 'Forgot Password flow goes here')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <FadeInView delay={600}>
            <AnimatedButton
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              icon={!isSubmitting ? 'log-in' : null}
              iconPosition="right"
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Signing In...' : 'Login'}
              </Text>
            </AnimatedButton>
          </FadeInView>

          {/* Footer / Switch to Register */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: theme.spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
      paddingVertical: theme.spacing.xl + 8,
      borderRadius: theme.borderRadius.xl,
      marginHorizontal: -theme.spacing.lg,
      marginTop: -theme.spacing.lg,
      position: 'relative',
      overflow: 'hidden',
      ...theme.shadows.xl,
    },
    headerPattern: {
      position: 'absolute',
      top: -30,
      right: -30,
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      ...theme.shadows.glow,
    },
    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      zIndex: 1,
    },
    title: {
      fontSize: 42,
      fontWeight: '800',
      color: '#FFFFFF',
      marginTop: theme.spacing.sm,
      letterSpacing: -1,
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
      zIndex: 1,
    },
    subtitle: {
      fontSize: theme.typography.body.fontSize + 2,
      color: 'rgba(255, 255, 255, 0.95)',
      marginTop: theme.spacing.xs,
      fontWeight: '600',
      letterSpacing: 0.3,
      zIndex: 1,
    },
    form: {
      width: '100%',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      ...theme.shadows.sm,
    },
    inputIcon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      height: 50,
      color: theme.colors.text,
      fontSize: theme.typography.body.fontSize,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.caption.fontSize,
      marginBottom: theme.spacing.sm,
      marginLeft: theme.spacing.sm,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: theme.spacing.lg,
      marginTop: -theme.spacing.xs,
    },
    forgotPasswordText: {
      color: theme.colors.primary,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '600',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: theme.typography.h3.fontSize + 1,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing.lg,
    },
    footerText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
    footerLink: {
      color: theme.colors.primary,
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
    },
  });

export default LoginScreen;