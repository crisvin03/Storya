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

import { useUser } from '../context/UserContext'; // ✅ added for user state

// ✅ TYPE FIX START
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
// ✅ TYPE FIX END

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { setUser } = useUser(); // ✅ context for saving user info

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateInputs()) {
      setUser({ name, email, username, password });  // ✅ Save user info globally
      navigation.navigate('Verification', { email }); // ✅ Continue to verification
    }
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
          onChangeText={(text) => {
            setEmail(text);
            if (/\S+@\S+\.\S+/.test(text)) {
              setErrors((prev) => ({ ...prev, email: '' }));
            }
          }}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={18} color="#D300FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: Juan Tamad"
          placeholderTextColor="#BFBFBF"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (text.trim() !== '') {
              setErrors((prev) => ({ ...prev, name: '' }));
            }
          }}
        />
      </View>
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="at-outline" size={18} color="#D300FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: JuanTamad"
          placeholderTextColor="#BFBFBF"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (text.trim() !== '') {
              setErrors((prev) => ({ ...prev, username: '' }));
            }
          }}
        />
      </View>
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

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
          onChangeText={(text) => {
            setPassword(text);
            if (text.length >= 6) {
              setErrors((prev) => ({ ...prev, password: '' }));
            }
          }}
        />
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
});
