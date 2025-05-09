import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ✅ TYPE FIX START
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type SuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Success'>;
// ✅ TYPE FIX END

export default function SuccessScreen() {
  const navigation = useNavigation<SuccessScreenNavigationProp>(); // ✅ typed

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/storya.png')}
          style={styles.logo}
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Image
          source={require('../assets/checkmark.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Registration Successful</Text>
        <Text style={styles.subtitle}>
          Your story begins now — let the journey of{'\n'}reading and writing unfold.
        </Text>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Back to Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ❌ REMOVE THIS — it doesn’t belong in this file
// const handleVerify = () => {
//   navigation.navigate('Success');
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  logoContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  logo: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D300FF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
