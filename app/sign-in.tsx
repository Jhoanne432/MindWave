import { DefThemes } from '@/constant/themes'
import { useAuth } from '@/context/authContext'
import { defaultStyles } from '@/styles/style'
import { checkNetworkConnectivity, testFirebaseConnection } from '@/utils/firebaseTest'
import { FontAwesome6 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  const { signIn, signUp, resetPassword, loading, error, user } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  // Redirect to home if user is already signed in
  useEffect(() => {
    if (user && !loading) {
      router.replace('/(root)/(tabs)');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsSigningIn(true);
      await signIn({ email, password });
      // Navigation will happen automatically via useEffect
    } catch (err: any) {
      Alert.alert(
        'Sign In Failed',
        err.message || 'An error occurred while signing in',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !displayName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setIsSigningIn(true);
      await signUp({ email, password, displayName });
      Alert.alert('Success', 'Account created successfully!');
      setIsSignUp(false);
      // Navigation will happen automatically via useEffect
    } catch (err: any) {
      Alert.alert(
        'Sign Up Failed',
        err.message || 'An error occurred while creating your account',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await resetPassword(resetEmail);
      Alert.alert(
        'Password Reset',
        'Password reset email sent! Check your inbox.',
        [{ text: 'OK', onPress: () => setShowForgotPassword(false) }]
      );
      setResetEmail('');
    } catch (err: any) {
      Alert.alert(
        'Reset Failed',
        err.message || 'Failed to send reset email',
        [{ text: 'OK' }]
      );
    }
  };

  const handleTestConnection = async () => {
    try {
      // Test network connectivity first
      const networkTest = await checkNetworkConnectivity();
      if (!networkTest.connected) {
        Alert.alert(
          'Network Error',
          'No internet connection detected. Please check your network settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Test Firebase connection
      const firebaseTest = await testFirebaseConnection();
      if (firebaseTest.success) {
        Alert.alert(
          'Connection Test',
          'Firebase connection successful! You can proceed with authentication.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Firebase Error',
          'Firebase connection failed. Please check your configuration.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Connection test error:', error);
      Alert.alert(
        'Test Failed',
        'Unable to perform connection test. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Show loading screen while checking auth state
  if (loading) {
    return (
      <LinearGradient colors={[DefThemes.backgroundLinear1, DefThemes.backgroundLinear2]} style={defaultStyles.container}>
        <SafeAreaView style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={DefThemes.text} />
          <Text style={[styles.loadingText, { marginTop: 10 }]}>Loading...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (showForgotPassword) {
    return (
      <LinearGradient colors={[DefThemes.backgroundLinear1, DefThemes.backgroundLinear2]} style={defaultStyles.container}>
        <SafeAreaView style={defaultStyles.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={defaultStyles.container}
          >
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.titleContainer}>
                <Image source={require('../assets/images/mindwave.png')} style={styles.logo} />
                <Text style={styles.titleText}>Reset Password</Text>
                <Text style={styles.subtitleText}>Enter your email to receive reset instructions</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <FontAwesome6 name="envelope" size={20} color={DefThemes.text} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={resetEmail}
                    onChangeText={setResetEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity 
                  style={styles.primaryButton} 
                  onPress={handleForgotPassword}
                >
                  <Text style={styles.primaryButtonText}>Send Reset Email</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.textButton} 
                  onPress={() => setShowForgotPassword(false)}
                >
                  <Text style={styles.textButtonText}>Back to Sign In</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[DefThemes.backgroundLinear1, DefThemes.backgroundLinear2]} style={defaultStyles.container}>
      <SafeAreaView style={defaultStyles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={defaultStyles.container}
        >
          <ScrollView contentContainerStyle={styles.container}>
            {/* TITLE */}
            <View style={styles.titleContainer}>
              <Image source={require('../assets/images/mindwave.png')} style={styles.logo} />
              <Text style={styles.titleText}>Your Mental Wellness Companion</Text>
              <Text style={styles.subtitleText}>
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </Text>
            </View>
            
            {/* ERROR MESSAGE */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            
            {/* FORM */}
            <View style={styles.formContainer}>
              {isSignUp && (
                <View style={styles.inputContainer}>
                  <FontAwesome6 name="user" size={20} color={DefThemes.text} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputContainer}>
                <FontAwesome6 name="envelope" size={20} color={DefThemes.text} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <FontAwesome6 name="lock" size={20} color={DefThemes.text} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {isSignUp && (
                <View style={styles.inputContainer}>
                  <FontAwesome6 name="lock" size={20} color={DefThemes.text} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
              )}

              <TouchableOpacity 
                style={[styles.primaryButton, isSigningIn && styles.buttonDisabled]} 
                onPress={isSignUp ? handleSignUp : handleSignIn}
                disabled={isSigningIn}
              >
                {isSigningIn ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Test Connection Button for debugging */}
              <TouchableOpacity 
                style={styles.testButton} 
                onPress={handleTestConnection}
              >
                <FontAwesome6 name="wifi" size={16} color={DefThemes.text} />
                <Text style={styles.testButtonText}>Test Firebase Connection</Text>
              </TouchableOpacity>

              {!isSignUp && (
                <TouchableOpacity 
                  style={styles.textButton} 
                  onPress={() => setShowForgotPassword(true)}
                >
                  <Text style={styles.textButtonText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </Text>
                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                  <Text style={styles.switchButtonText}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titleText: {
    color: DefThemes.text,
    fontFamily: 'SpaceMono',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'SpaceMono',
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.3)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.8,
  },
  input: {
    flex: 1,
    color: DefThemes.text,
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
  textButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  textButtonText: {
    color: 'rgba(59, 130, 246, 0.8)',
    fontSize: 14,
    fontFamily: 'SpaceMono',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  switchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'SpaceMono',
  },
  switchButtonText: {
    color: 'rgba(59, 130, 246, 0.8)',
    fontSize: 14,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
  loadingText: {
    color: DefThemes.text,
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  testButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  testButtonText: {
    color: 'rgba(34, 197, 94, 0.9)',
    fontSize: 14,
    fontFamily: 'SpaceMono',
  },
});