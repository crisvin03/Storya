import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

export default function LibraryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<'current' | 'archive' | 'lists'>('current');
  const [currentReads, setCurrentReads] = useState<any[]>([]);
  const [archive, setArchive] = useState<any[]>([]);
  const [readingList, setReadingList] = useState<any[]>([]);

  const loadCurrentReads = async () => {
    const data = await AsyncStorage.getItem('currentReads');
    setCurrentReads(data ? JSON.parse(data) : []);
  };

  const loadArchive = async () => {
    const data = await AsyncStorage.getItem('archiveReads');
    setArchive(data ? JSON.parse(data) : []);
  };

  const loadReadingList = async () => {
    const data = await AsyncStorage.getItem('readingList');
    setReadingList(data ? JSON.parse(data) : []);
  };

  useFocusEffect(
    useCallback(() => {
      if (selectedTab === 'current') loadCurrentReads();
      if (selectedTab === 'archive') loadArchive();
      if (selectedTab === 'lists') loadReadingList();
    }, [selectedTab])
  );

  const handleUnsave = async (title: string) => {
    const updated = readingList.filter((book) => book.title !== title);
    await AsyncStorage.setItem('readingList', JSON.stringify(updated));
    setReadingList(updated);
  };

  const handleRemoveFromCurrent = async (title: string) => {
    const updated = currentReads.filter((book) => book.title !== title);
    await AsyncStorage.setItem('currentReads', JSON.stringify(updated));
    setCurrentReads(updated);
  };

  const handleMarkAsFinished = async (title: string) => {
    const book = currentReads.find((b) => b.title === title);
    if (!book) return;

    const updatedCurrent = currentReads.filter((b) => b.title !== title);
    const updatedArchive = [...archive, book];

    await AsyncStorage.setItem('currentReads', JSON.stringify(updatedCurrent));
    await AsyncStorage.setItem('archiveReads', JSON.stringify(updatedArchive));

    setCurrentReads(updatedCurrent);
    setArchive(updatedArchive);
  };

  const confirmAction = (title: string, type: 'current' | 'lists') => {
    const isCurrent = type === 'current';

    if (Platform.OS === 'ios') {
      const options = isCurrent
        ? ['Cancel', 'Mark as Finished', 'Remove Story']
        : ['Cancel', 'Unsave'];

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 0,
          destructiveButtonIndex: isCurrent ? 2 : 1,
        },
        (index) => {
          if (index === 1 && isCurrent) handleMarkAsFinished(title);
          if (index === 2 && isCurrent) handleRemoveFromCurrent(title);
          if (index === 1 && !isCurrent) handleUnsave(title);
        }
      );
    } else {
      const androidOptions = isCurrent
        ? [
            { text: 'Cancel', style: 'cancel' as const },
            { text: 'Mark as Finished', onPress: () => handleMarkAsFinished(title) },
          ]
        : [
            { text: 'Cancel', style: 'cancel' as const },
            { text: 'Unsave', style: 'destructive' as const, onPress: () => handleUnsave(title) },
          ];

      Alert.alert(
        isCurrent ? 'Manage Story' : 'Remove from Reading List',
        'What would you like to do with this story?',
        androidOptions
      );
    }
  };

  const renderBook = ({ item }: { item: any }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('BookDetail', { book: item })}
    style={styles.bookItem}
  >
    <Image source={item.image} style={styles.bookImage} />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <View style={styles.metaRow}>
        <Ionicons name="reader-outline" size={14} color="#ccc" />
        <Text style={styles.bookParts}>5 Parts</Text>
      </View>
    </View>

    {/* ✅ Hide ellipsis on archive tab only */}
    {selectedTab !== 'archive' && (
      <TouchableOpacity
        onPress={() =>
          selectedTab === 'current'
            ? confirmAction(item.title, 'current')
            : selectedTab === 'lists'
            ? confirmAction(item.title, 'lists')
            : null
        }
      >
        <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Library</Text>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTab('current')}>
          <Text style={[styles.tabText, selectedTab === 'current' && styles.activeTab]}>
            CURRENT READS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('archive')}>
          <Text style={[styles.tabText, selectedTab === 'archive' && styles.activeTab]}>
            ARCHIVE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('lists')}>
          <Text style={[styles.tabText, selectedTab === 'lists' && styles.activeTab]}>
            READING LISTS
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'current' && (
        currentReads.length > 0 ? (
          <>
            <Text style={styles.offlineLabel}>Available Offline</Text>
            <FlatList
              data={currentReads}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderBook}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No current reads yet.</Text>
          </View>
        )
      )}

      {selectedTab === 'archive' && (
        archive.length > 0 ? (
          <FlatList
            data={archive}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderBook}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        ) : (
          <Text style={styles.emptyText}>No archived books.</Text>
        )
      )}

      {selectedTab === 'lists' && (
        readingList.length > 0 ? (
          <FlatList
            data={readingList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderBook}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No stories in your Reading List yet.</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82328C',
    paddingTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6A2571',
    marginBottom: 8,
  },
  tabText: {
    fontSize: 13,
    color: '#ccc',
  },
  activeTab: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  offlineLabel: {
    color: '#fff',
    fontSize: 13,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9A4DA4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookImage: {
    width: 50,
    height: 70,
    borderRadius: 4,
  },
  bookTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookParts: {
    color: '#ccc',
    fontSize: 12,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#ccc',
    fontSize: 14,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 13,
    padding: 16,
    textAlign: 'center',
  },
});
