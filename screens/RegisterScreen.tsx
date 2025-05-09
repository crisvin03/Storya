import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// ✅ TYPE FIX START
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
// ✅ TYPE FIX END

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>(); // ✅ typed

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    navigation.navigate('Verification'); // ✅ no more 'never' error
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/storya.png')}
        style={styles.topIcon}
      />
      <Text style={styles.title}>Begin Your Story with Us!</Text>
      <Text style={styles.subtitle}>
        Create your account by filling up the form below.
      </Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={18} color="#D300FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: abc@example.com"
          placeholderTextColor="#BFBFBF"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={18} color="#D300FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: Dan Letada"
          placeholderTextColor="#BFBFBF"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="at-outline" size={18} color="#D300FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: DanLetada"
          placeholderTextColor="#BFBFBF"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={18} color="#D300FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#BFBFBF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Text */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  topIcon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D300FF',
    marginBottom: 6,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'left',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D300FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    marginTop: 18,
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  loginLink: {
    color: '#D300FF',
    fontWeight: 'bold',
  },
});
