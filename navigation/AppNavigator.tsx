// navigation/AppNavigator.tsx
import React, { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ForgotPasswordVerificationScreen from '../screens/ForgotPasswordVerificationScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import SuccessScreen from '../screens/SuccessScreen';
import PasswordSuccessScreen from '../screens/PasswordSuccessScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import BookPartsScreen from '../screens/BookPartsScreen';
import BookReaderScreen from '../screens/BookReaderScreen';

// ✅ 1. Define the route names and their params
export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ForgotPasswordVerification: { email: string };
  NewPassword: { email: string };
  Register: undefined;
  Verification: undefined;
  Success: undefined;
  PasswordSuccess: undefined;
  Home: undefined;
  BookDetail: { book: { title: string; image: any; description?: string } };
  BookParts: { book: { title: string } };
  BookReader: { book: { title: string }; chapter: string };
};

// ✅ 2. Create typed stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ForgotPasswordVerification" component={ForgotPasswordVerificationScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="PasswordSuccess" component={PasswordSuccessScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="BookParts" component={BookPartsScreen} />
      <Stack.Screen name="BookReader" component={BookReaderScreen} />
    </Stack.Navigator>
  );
}
