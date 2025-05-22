import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';



const books = [
  { image: require('../assets/b1.jpg'), title: 'The Lost Princess' },
  { image: require('../assets/b2.png'), title: 'Fear Games' },
  { image: require('../assets/b3.png'), title: 'The Taming of Victoria Colton' },
  { image: require('../assets/b4.jpg'), title: 'The End of the Beginning' },
];
const romanceBooks = [
  { image: require('../assets/b5.jpg'), title: 'The Four Badboys and Me' },
  { image: require('../assets/b6.png'), title: 'One Step To the Heart' },
  { image: require('../assets/b7.jpg'), title: 'Witch' },
  { image: require('../assets/b8.jpg'), title: 'Torn' },
];
const fantasyBooks = [
  { image: require('../assets/b9.jpg'), title: 'Full Grind Mode' },
  { image: require('../assets/b10.jpg'), title: 'The Villaines' },
  { image: require('../assets/b11.jpg'), title: 'Another Life, Another Me' },
  { image: require('../assets/b12.jpg'), title: 'Witches' },
];
const thrillerBooks = [
  { image: require('../assets/b13.jpg'), title: 'Dr Jekyll and Mr Hyde' },
  { image: require('../assets/b14.jpg'), title: 'Creepypasta' },
  { image: require('../assets/b15.jpg'), title: 'A Brilliant Plan' },
  { image: require('../assets/b16.jpg'), title: 'Distantly Falling Stars' },
];
const sciFiBooks = [
  { image: require('../assets/b17.jpg'), title: 'Wisdom of the Ancients' },
  { image: require('../assets/b18.jpg'), title: 'DSpayr' },
  { image: require('../assets/b19.jpg'), title: 'The Lost City Of Atlantis' },
  { image: require('../assets/b20.jpg'), title: 'Echoes of the Past' },
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const allTitles = [
    ...books,
    ...romanceBooks,
    ...fantasyBooks,
    ...thrillerBooks,
    ...sciFiBooks,
  ].map((b) => b.title);

  const handleSearch = (text: string) => {
  const input = text.toLowerCase();
  const matched = allTitles.filter((title) =>
    title.toLowerCase().startsWith(input)
  );

  setSuggestions(matched.length > 0 ? matched.slice(0, 5) : ['__NO_RESULTS__']);
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#82328C" />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/storya.png')} style={styles.logo} />
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#ccc" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search stories or reading lists"
              placeholderTextColor="#ccc"
              value={searchText}
              onChangeText={(text) => {
              setSearchText(text);
              if (text.trim().length > 0) handleSearch(text); // even 1 letter triggers search
              else setSuggestions([]);
              }}

            />
            <TouchableOpacity onPress={() => { setSearchText(''); setSuggestions([]); }}>
              <Ionicons name="close" size={18} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Suggestions */}
        {searchText.trim() !== '' && (
  <View style={styles.suggestionsBox}>
    {suggestions[0] === '__NO_RESULTS__' ? (
      <Text style={styles.suggestionItem}>No results found.</Text>
    ) : (
      suggestions.map((title, idx) => {
        // Find the full book object that matches the title
        const allBooks = [...books, ...romanceBooks, ...fantasyBooks, ...thrillerBooks, ...sciFiBooks];
        const selectedBook = allBooks.find(b => b.title === title);

        return (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              if (selectedBook) {
                navigation.navigate('BookDetail', { book: selectedBook });
                setSearchText('');
                setSuggestions([]);
              }
            }}
          >
            <Text style={styles.suggestionItem}>{title}</Text>
          </TouchableOpacity>
        );
      })
    )}
  </View>
)}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Categories */}
          <View style={styles.categories}>
            {['All', 'Romance', 'Fantasy', 'Thriller', 'Sci-Fi'].map((cat) => (
              <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && { fontWeight: 'bold', textDecorationLine: 'underline' },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Top Picks */}
          <Text style={styles.sectionTitle}>Top Picks For You</Text>
          <FlatList
            horizontal
            data={books}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
              <View style={styles.bookItem}>
                <Image source={item.image} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
              </View>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />

          {/* Featured Story */}
          <View style={styles.storyHeader}>
            <View>
              <Text style={styles.storyTitle}>The Lost Princess</Text>
              <Text style={styles.storyMeta}>
                <Ionicons name="reader-outline" size={14} /> 5 Parts
              </Text>
            </View>
            <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
          </View>

          <Text style={styles.storyDescription}>
            Joshua turn to get a closer view of, his stepmother? Can he even call her that she was younger than him!
            She was staring at him like he was a monster. With those big brown eyes. Halley was shock to the spine.
            The man standing in front of her was so....
          </Text>

          {/* Popular Now */}
          <Text style={styles.sectionTitle}>Popular Now</Text>
          <FlatList
            horizontal
            data={books}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
              <View style={styles.bookItem}>
                <Image source={item.image} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
              </View>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => 'pop' + index.toString()}
            showsHorizontalScrollIndicator={false}
          />

          {/* Romance Section */}
          {selectedCategory === 'All' || selectedCategory === 'Romance' ? (
            <>
              <Text style={styles.sectionTitle}>Romance</Text>
              <FlatList
                horizontal
                data={romanceBooks}
                renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
                  <View style={styles.bookItem}>
                    <Image source={item.image} style={styles.bookImage} />
                    <Text style={styles.bookTitle}>{item.title}</Text>
                  </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(_, index) => 'romance' + index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </>
          ) : null}

          {/* Fantasy Section */}
          {selectedCategory === 'All' || selectedCategory === 'Fantasy' ? (
            <>
              <Text style={styles.sectionTitle}>Fantasy</Text>
              <FlatList
                horizontal
                data={fantasyBooks}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
                  <View style={styles.bookItem}>
                    <Image source={item.image} style={styles.bookImage} />
                    <Text style={styles.bookTitle}>{item.title}</Text>
                  </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => 'fantasy' + index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </>
          ) : null}

          {/* Thriller Section */}
          {selectedCategory === 'All' || selectedCategory === 'Thriller' ? (
            <>
              <Text style={styles.sectionTitle}>Thriller</Text>
              <FlatList
                horizontal
                data={thrillerBooks}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
                  <View style={styles.bookItem}>
                    <Image source={item.image} style={styles.bookImage} />
                    <Text style={styles.bookTitle}>{item.title}</Text>
                  </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => 'thriller' + index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </>
          ) : null}

          {/* Sci-Fi Section */}
          {selectedCategory === 'All' || selectedCategory === 'Sci-Fi' ? (
            <>
              <Text style={styles.sectionTitle}>Sci-Fi</Text>
              <FlatList
                horizontal
                data={sciFiBooks}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
                  <View style={styles.bookItem}>
                    <Image source={item.image} style={styles.bookImage} />
                    <Text style={styles.bookTitle}>{item.title}</Text>
                  </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => 'sci-fi' + index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#82328C',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
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
  searchIcon: {
    marginRight: 6,
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
    marginTop: -8,
    marginBottom: 8,
  },
  suggestionItem: {
    fontSize: 14,
    paddingVertical: 4,
    color: '#333',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  bookItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  bookImage: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  bookTitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    width: 80,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  storyTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  storyMeta: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  storyDescription: {
    color: '#fff',
    fontSize: 13,
    marginVertical: 10,
    lineHeight: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#000',
    marginTop: 2,
  },
});
