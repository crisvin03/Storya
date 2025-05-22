import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WriteScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [coverImage, setCoverImage] = useState<any>(null);

  const genres = ['Romance', 'Fantasy', 'Thriller', 'Sci-Fi'];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage({ uri: result.assets[0].uri });
    }
  };

  const saveStory = async () => {
    if (!title || !description || !genre || !coverImage) {
      Alert.alert('Please complete all fields and add a cover image.');
      return;
    }

    const newStory = { title, description, genre, image: coverImage };

    try {
      const data = await AsyncStorage.getItem('userStories');
      const stories = data ? JSON.parse(data) : [];
      stories.push(newStory);
      await AsyncStorage.setItem('userStories', JSON.stringify(stories));
      Alert.alert('Story saved!');
      setTitle('');
      setDescription('');
      setGenre('');
      setCoverImage(null);
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Write a New Story</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {coverImage ? (
          <Image source={{ uri: coverImage.uri }} style={styles.coverImage} />
        ) : (
          <Text style={styles.imageText}>Pick a Cover Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Story Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Story Description"
        placeholderTextColor="#aaa"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.genreBox}>
        {genres.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genreButton, genre === g && styles.selectedGenre]}
            onPress={() => setGenre(g)}
          >
            <Text style={styles.genreText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveStory}>
        <Text style={styles.saveText}>Save Story</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#82328C' },
  header: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    color: '#000',
  },
  imagePicker: {
    height: 150,
    backgroundColor: '#9A4DA4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageText: {
    color: '#fff',
    fontSize: 14,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  genreBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  genreButton: {
    backgroundColor: '#9A4DA4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedGenre: {
    backgroundColor: '#FFA500',
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#D300FF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
