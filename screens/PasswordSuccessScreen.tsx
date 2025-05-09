import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ✅ TYPE FIX START
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type PasswordSuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PasswordSuccess'>;
// ✅ TYPE FIX END

export default function PasswordSuccessScreen() {
  const navigation = useNavigation<PasswordSuccessScreenNavigationProp>(); // ✅ typed

  const handleBackToLogin = () => {
    navigation.navigate('Login'); // ✅ now properly recognized
  };

  return (
    <View style={styles.container}>
      {/* Logo in top-left corner */}
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/storya.png')} style={styles.logo} />
      </View>

      {/* Success Icon and Text */}
      <View style={styles.centerContent}>
        <Image
          source={require('../assets/checkmark.png')}
          style={styles.successIcon}
        />
        <Text style={styles.title}>Password Changed</Text>
        <Text style={styles.subtitle}>Your password has been changed!</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
        <Text style={styles.buttonText}>Back to Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  logoWrapper: {
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  logo: {
    width: 40,
    height: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
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
    fontSize: 15,
  },
});
