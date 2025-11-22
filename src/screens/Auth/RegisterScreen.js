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
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../theme/ThemeContext';
import { setUser } from '../../redux/slices/authSlice';
import { registerSchema } from '../../utils/validation';
import FadeInView from '../../components/FadeInView';
import AnimatedButton from '../../components/AnimatedButton';

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const headerScale = useSharedValue(0.8);
  const iconScale = useSharedValue(0);

  useEffect(() => {
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
    transform: [
      { scale: headerScale.value },
    ],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
    ],
  }));

  const onSubmit = async (data) => {
    try {
      const user = {
        id: Date.now(),
        name: data.fullName,
        email: data.email,
      };
      dispatch(setUser(user));
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
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
              <Feather name="user-plus" size={48} color="#FFFFFF" />
            </Animated.View>
            <FadeInView delay={400}>
              <Text style={styles.title}>Create Account</Text>
            </FadeInView>
            <FadeInView delay={500}>
              <Text style={styles.subtitle}>Join FitBuddy today 🚀</Text>
            </FadeInView>
          </LinearGradient>
        </Animated.View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather
              name="user"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                />
              )}
            />
          </View>
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}

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
                  autoComplete="password-new"
                />
              )}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password-new"
                />
              )}
            />
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}

          <FadeInView delay={600}>
            <AnimatedButton
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              icon={!isSubmitting ? 'arrow-right' : null}
              iconPosition="right"
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Creating...' : 'Sign Up'}
              </Text>
            </AnimatedButton>
          </FadeInView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Login</Text>
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
    button: {
      borderRadius: theme.borderRadius.xl,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.lg,
      ...theme.shadows.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: theme.typography.h3.fontSize + 1,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    buttonIcon: {
      marginLeft: theme.spacing.sm,
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

export default RegisterScreen;

