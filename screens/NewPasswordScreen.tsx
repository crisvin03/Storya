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
import { useNavigation } from '@react-navigation/native';

// ✅ TYPE FIX START
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NewPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewPassword'>;
// ✅ TYPE FIX END

export default function NewPasswordScreen() {
  const navigation = useNavigation<NewPasswordScreenNavigationProp>(); // ✅ typed

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    // Add validation and API logic here
    navigation.navigate('PasswordSuccess'); // ✅ now recognized
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/storya.png')} style={styles.logo} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Enter your new password below to complete the reset process.
        </Text>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color="#D300FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#BFBFBF"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color="#D300FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#BFBFBF"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>

        <View style={styles.policyContainer}>
          <Text style={styles.policyTitle}>Password Policy:</Text>
          <Text style={styles.policyItem}>Length must be between 8 to 20 characters</Text>
          <Text style={styles.policyItem}>A combination of upper and lower case letters</Text>
          <Text style={styles.policyItem}>Contain letters and numbers</Text>
          <Text style={styles.policyItem}>A special character such as @, #, !, * and $</Text>
        </View>
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
    marginBottom: 30,
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
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#D300FF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  policyContainer: {
    paddingTop: 10,
  },
  policyTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  policyItem: {
    fontSize: 13,
    color: '#555',
  },
});
