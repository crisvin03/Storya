import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BookParts'>;

export default function BookPartsScreen({ route, navigation }: Props) {
  const { book } = route.params;
  const parts = Array.from({ length: 5 }, (_, i) => `Part ${i + 1}`);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{String(book.title ?? 'Untitled Book')}</Text>
      </View>

      <FlatList
        data={parts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('BookReader', {
                book,
                chapter: `Chapter ${index + 1}`,
              })
            }
          >
            {/* ✅ Wrap inner content */}
            <View style={styles.itemContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>Lorem Ipsum</Text>
                <Text style={styles.itemSub}>{item}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  item: {
    backgroundColor: '#9A4DA4',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  itemSub: {
    color: '#ccc',
    fontSize: 12,
  },
});
