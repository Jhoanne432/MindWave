import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPasswordStrength = () => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return strength;
  };

  const handleSubmit = () => {
    if (!name || !email || !pass || !confirm) {
      Alert.alert('Fill in all fields');
      return;
    }
    if (pass !== confirm) {
      Alert.alert('Passwords do not match');
      return;
    }
    Alert.alert('Account created! (Demo)');
    router.replace('/login');
  };

  const strength = getPasswordStrength();

  return (
    <LinearGradient colors={['#0f172a', '#1e1b4b']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Back + Title */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
            <Feather name="arrow-left" size={22} color="#fff" />
            <Text style={styles.header}>Create Account</Text>
          </TouchableOpacity>

                    {/* Logo */}
                    <View style={styles.logoContainer}>
                      <View style={styles.logo}>
                        <Feather name="activity" size={40} color="#fff" />
                      </View>
                      <Text style={styles.title}>MindWatch Pro</Text>
                      <Text style={styles.subtitle}>Advanced Mental Wellness Platform</Text>
                    </View>

          <View style={styles.card}>
            <Text style={styles.title}>Join MindWatch Pro</Text>
            <Text style={styles.subtitle}>Create your account to get started</Text>

            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Create password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPass}
                value={pass}
                onChangeText={setPass}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPass(!showPass)}
              >
                <Feather name={showPass ? 'eye-off' : 'eye'} size={18} color="#ccc" />
              </TouchableOpacity>
            </View>

            {/* Password Strength */}
            <View style={styles.meter}>
              <View
                style={[
                  styles.meterFill,
                  strength === 1
                    ? styles.weak
                    : strength === 2
                    ? styles.medium
                    : strength >= 3
                    ? styles.strong
                    : null,
                ]}
              />
            </View>
            <Text style={styles.strengthText}>
              {pass === ''
                ? 'Password strength: Enter a password'
                : strength === 1
                ? 'Password strength: Weak'
                : strength === 2
                ? 'Password strength: Medium'
                : 'Password strength: Strong'}
            </Text>

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showConfirm}
                value={confirm}
                onChangeText={setConfirm}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Feather name={showConfirm ? 'eye-off' : 'eye'} size={18} color="#ccc" />
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.submitText}>Create Account</Text>
            </TouchableOpacity>

            {/* Divider */}
            <Text style={styles.divider}>or sign up with</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.social}>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.social}>
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  scroll: { padding: 24 },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  header: { color: '#fff', fontSize: 20, fontWeight: '700', marginLeft: 10, },
  card: {
    backgroundColor: 'rgba(30,41,59,0.7)',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
    logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 20 },
  label: { color: '#e2e8f0', marginTop: 12, marginBottom: 6 },
  input: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    color: '#fff',
  },
  passwordContainer: { position: 'relative' },
  eyeIcon: { position: 'absolute', right: 14, top: 18 },
  meter: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 4,
    marginBottom: 8,
  },
  meterFill: { height: 4, borderRadius: 2 },
  weak: { backgroundColor: '#ef4444', width: '33%' },
  medium: { backgroundColor: '#f59e0b', width: '66%' },
  strong: { backgroundColor: '#10b981', width: '100%' },
  strengthText: { fontSize: 12, color: '#aaa', marginBottom: 10 },
  submit: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  divider: { textAlign: 'center', color: '#aaa', marginVertical: 20 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
  social: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  socialText: { color: '#fff', fontWeight: '500' },
});
