import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

// ✅ TYPE FIX START
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type ForgotPasswordVerificationRouteProp = RouteProp<RootStackParamList, 'ForgotPasswordVerification'>;
type ForgotPasswordVerificationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPasswordVerification'>;
// ✅ TYPE FIX END

export default function ForgotPasswordVerificationScreen() {
  const [code, setCode] = useState('');

  const route = useRoute<ForgotPasswordVerificationRouteProp>(); // ✅ typed
  const navigation = useNavigation<ForgotPasswordVerificationNavigationProp>(); // ✅ typed

  const email = route.params.email;

  const handleVerify = () => {
    alert('Verification successful!');
    navigation.navigate('NewPassword', { email }); // ✅ safe
  };

  return (
    <View style={styles.container}>
      {/* Logo top-left */}
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/storya.png')} style={styles.logo} />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          Please enter the 6-digit code we sent to your email address.
        </Text>

        <Text style={styles.email}>
          <Text style={{ fontWeight: 'bold' }}>{email}</Text>{' '}
          <Ionicons name="create-outline" size={16} color="#D300FF" />
        </Text>

        <Text style={styles.label}>Verification Code</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="EX: 123456"
            placeholderTextColor="#BFBFBF"
            keyboardType="numeric"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    marginTop: 24,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  logo: {
    width: 40,
    height: 40,
  },
  content: {
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D300FF',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
  email: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D300FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 18,
    letterSpacing: 8,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D300FF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
