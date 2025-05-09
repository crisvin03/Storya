import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ route, navigation }: Props) {
  const { book } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Search Bar */}
      <View style={styles.searchBar}>
        <Image source={require('../assets/storya.png')} style={styles.logo} />
        <Text style={styles.searchText}>{String(book.title ?? 'Untitled')}</Text>
        <Ionicons name="close" size={18} color="#fff" />
      </View>

      {/* Book Info */}
      <View style={styles.content}>
        <Image source={book.image} style={styles.cover} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{String(book.title ?? 'Untitled')}</Text>

          {/* ✅ Use View for icon + text combo */}
          <View style={styles.iconRow}>
            <Ionicons name="reader-outline" size={14} color="#ccc" />
            <Text style={styles.parts}>5 Parts</Text>
          </View>

          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color="#fff"
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
          <Text style={styles.description}>
            {book.description ??
              'This is a sample description for the selected book. You can add actual summaries later.'}
          </Text>
        </View>
      </View>

      {/* Read Button */}
      <TouchableOpacity
        style={styles.readButton}
        onPress={() => navigation.navigate('BookParts', { book })}
      >
        <Text style={styles.readText}>Read</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82328C',
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  logo: {
    width: 32,
    height: 32,
  },
  searchText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginLeft: 12,
  },
  content: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  cover: {
    width: 90,
    height: 130,
    borderRadius: 6,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  parts: {
    color: '#ccc',
    fontSize: 12,
  },
  description: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
  },
  readButton: {
    backgroundColor: '#D300FF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  readText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
