import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// ✅ TYPE FIX START
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type VerificationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Verification'>;
// ✅ TYPE FIX END

export default function VerificationScreen() {
  const navigation = useNavigation<VerificationScreenNavigationProp>(); // ✅ typed
  const [code, setCode] = useState('');

  const handleVerify = () => {
    if (code === '123456') {
      navigation.navigate('Success'); // ✅ now valid
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Image
        source={require('../assets/storya.png')}
        style={styles.icon}
      />
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.instruction}>
        Please enter the 6-digit code we sent to your email address.
      </Text>

      <View style={styles.emailRow}>
        <Text style={styles.email}>letadal12@example.com</Text>
        <Ionicons name="pencil-outline" size={16} color="#D300FF" style={styles.editIcon} />
      </View>

      <Text style={styles.label}>Verification Code</Text>
      <TextInput
        style={styles.input}
        placeholder="EX: 123456"
        placeholderTextColor="#BFBFBF"
        keyboardType="number-pad"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D300FF',
    textAlign: 'center',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  editIcon: {
    marginLeft: 6,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D300FF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    letterSpacing: 12,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D300FF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
