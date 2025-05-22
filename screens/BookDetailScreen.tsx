import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ route, navigation }: Props) {
  const { book } = route.params;

  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const allBooks = [
    { image: require('../assets/b1.jpg'), title: 'The Lost Princess' },
    { image: require('../assets/b2.png'), title: 'Fear Games' },
    { image: require('../assets/b3.png'), title: 'The Taming of Victoria Colton' },
    { image: require('../assets/b4.jpg'), title: 'The End of the Beginning' },
    { image: require('../assets/b5.jpg'), title: 'The Four Badboys and Me' },
  ];

  const allTitles = allBooks.map((b) => b.title);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const matched = allTitles.filter((title) =>
      title.toLowerCase().startsWith(text.toLowerCase())
    );
    setSuggestions(matched.length > 0 ? matched : ['__NO_RESULTS__']);
  };

  const handleSelectSuggestion = (title: string) => {
    const selected = allBooks.find((b) => b.title === title);
    if (selected) {
      navigation.replace('BookDetail', { book: selected });
      setSearchText('');
      setSuggestions([]);
    }
  };

  const showOptions = () => {
    const save = async () => {
      try {
        const existing = await AsyncStorage.getItem('readingList');
        const readingList = existing ? JSON.parse(existing) : [];

        const alreadyExists = readingList.some((b: any) => b.title === book.title);
        if (alreadyExists) {
          Alert.alert('Already Saved', 'This story is already in your Reading List.');
          return;
        }

        readingList.push(book);
        await AsyncStorage.setItem('readingList', JSON.stringify(readingList));
        Alert.alert('Saved!', 'Story added to your Reading List.');
      } catch (err) {
        console.error('Save failed:', err);
        Alert.alert('Error', 'Something went wrong while saving.');
      }
    };

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Save to Reading List'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) save();
        }
      );
    } else {
      Alert.alert(
        'Options',
        'What would you like to do?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Save to Reading List', onPress: save },
        ]
      );
    }
  };

  const handleStartReading = async () => {
    try {
      const existing = await AsyncStorage.getItem('currentReads');
      const currentReads = existing ? JSON.parse(existing) : [];

      const alreadyExists = currentReads.some((b: any) => b.title === book.title);
      if (!alreadyExists) {
        currentReads.push(book);
        await AsyncStorage.setItem('currentReads', JSON.stringify(currentReads));
      }

      navigation.navigate('BookParts', { book });
    } catch (error) {
      console.error('Failed to save current read:', error);
      navigation.navigate('BookParts', { book }); // still navigate
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/storya.png')} style={styles.logo} />
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#ccc" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search stories, people or reading lists"
            placeholderTextColor="#ccc"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => { setSearchText(''); setSuggestions([]); }}>
              <Ionicons name="close" size={16} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Suggestions */}
      {searchText.trim() !== '' && (
        <View style={styles.suggestionsBox}>
          {suggestions[0] === '__NO_RESULTS__' ? (
            <Text style={styles.suggestionItem}>No results found.</Text>
          ) : (
            suggestions.map((title, idx) => (
              <TouchableOpacity key={idx} onPress={() => handleSelectSuggestion(title)}>
                <Text style={styles.suggestionItem}>{title}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}

      {/* Book Card */}
      <View style={styles.bookCard}>
        <Image source={book.image} style={styles.cover} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="reader-outline" size={14} color="#ccc" />
            <Text style={styles.parts}>5 Parts</Text>
            <TouchableOpacity onPress={showOptions} style={{ marginLeft: 'auto' }}>
              <Ionicons name="ellipsis-vertical" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        {book.description ??
          'Joshua turn to get a closer view of, his stepmother? Can he even call her that she was younger than him! She was staring at him like he was a monster. With those big brown eyes. Halley was shock to the spine. The man standing in front of her was so...'}
      </Text>

      {/* Read Button */}
      <TouchableOpacity
        style={styles.readButton}
        onPress={handleStartReading}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  logo: {
    width: 30,
    height: 30,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#9A4DA4',
    flex: 1,
    paddingHorizontal: 14,
    borderRadius: 30,
    alignItems: 'center',
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    paddingVertical: 6,
  },
  suggestionsBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    fontSize: 14,
    paddingVertical: 6,
    color: '#333',
  },
  bookCard: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'flex-start',
  },
  cover: {
    width: 90,
    height: 130,
    borderRadius: 4,
  },
  bookTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  parts: {
    color: '#ccc',
    fontSize: 12,
  },
  description: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 60,
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
