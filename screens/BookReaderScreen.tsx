import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ✅ TYPE FIX
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BookReader'>;

export default function BookReaderScreen({ route, navigation }: Props) {
  const { chapter, book } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        {/* ✅ Safely render book title */}
        <Text style={styles.title}>{String(book.title ?? 'Untitled Book')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ✅ Safely render chapter title */}
        <Text style={styles.chapterTitle}>{String(chapter ?? 'No Chapter')}</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur. Ut massa morbi iaculis accumsan. Mauris nunc sed sed id vel viverra varius
          ultrices venenatis. ...
          {'\n\n'}Repeat this or load actual content for realism.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82328C',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  chapterTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
  },
});
