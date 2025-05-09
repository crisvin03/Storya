import React from 'react';
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

const books = [
  require('../assets/b1.jpg'),
  require('../assets/b2.png'),
  require('../assets/b3.png'),
  require('../assets/b4.jpg'),
];
  const romanceBooks = [
    require('../assets/b5.jpg'),
    require('../assets/b6.png'),
    require('../assets/b7.jpg'),
    require('../assets/b8.jpg'),
  ];

export default function HomeScreen() {
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
            />
            <TouchableOpacity>
              <Ionicons name="close" size={18} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Categories */}
          <View style={styles.categories}>
            {['All', 'Romance', 'Fantasy', 'Thriller', 'Sci-Fi'].map((cat) => (
              <Text key={cat} style={styles.categoryText}>
                {cat}
              </Text>
            ))}
          </View>

          {/* Top Picks */}
          <Text style={styles.sectionTitle}>Top Picks For You</Text>
          <FlatList
            horizontal
            data={books}
            renderItem={({ item }) => <Image source={item} style={styles.bookImage} />}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />

          {/* Featured Story with Ellipsis */}
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
            renderItem={({ item }) => <Image source={item} style={styles.bookImage} />}
            keyExtractor={(_, index) => 'pop' + index.toString()}
            showsHorizontalScrollIndicator={false}
          />

         {/* Romance Section */}
        <Text style={styles.sectionTitle}>Romance</Text>
        <FlatList
        horizontal
        data={romanceBooks}
        renderItem={({ item }) => <Image source={item} style={styles.bookImage} />}
        keyExtractor={(_, index) => 'romance' + index.toString()}
       showsHorizontalScrollIndicator={false}
         />

        </ScrollView>

        {/* Bottom navigation with label */}
        <View style={styles.bottomNav}>
          <View style={styles.navItem}>
            <Ionicons name="home" size={22} color="#D300FF" />
            <Text style={[styles.navText, { color: '#D300FF' }]}>Home</Text>
          </View>
          <View style={styles.navItem}>
            <Ionicons name="pencil-outline" size={22} color="#000" />
            <Text style={styles.navText}>Write</Text>
          </View>
          <View style={styles.navItem}>
            <Ionicons name="book-outline" size={22} color="#000" />
            <Text style={styles.navText}>Library</Text>
          </View>
          <View style={styles.navItem}>
            <Ionicons name="person-outline" size={22} color="#000" />
            <Text style={styles.navText}>Profile</Text>
          </View>
        </View>
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
  bookImage: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 4,
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
