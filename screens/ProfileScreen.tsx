import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';

export default function ProfileScreen() {
  const { user, setUser } = useUser();

  const [name, setName] = useState(user?.name || '');
  const [description, setDescription] = useState(user?.description || '');
  const [profileImage, setProfileImage] = useState<any>(null);

  const [editingField, setEditingField] = useState<'name' | 'desc' | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveField = (field: 'name' | 'desc') => {
    setUser({
      ...user!,
      name: field === 'name' ? name : user?.name || '',
      description: field === 'desc' ? description : user?.description || '',
    });
    setEditingField(null);
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/Profile.jpg')}
          style={styles.avatar}
        />
        <View style={styles.uploadIcon}>
          <Ionicons name="camera" size={18} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Name */}
      <View style={styles.editableRow}>
        {editingField === 'name' ? (
          <View style={{ alignItems: 'center' }}>
            <TextInput
              value={name}
              onChangeText={setName}
              autoFocus
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={() => saveField('name')} style={styles.saveBtn}>
              <Ionicons name="checkmark" size={16} color="#fff" />
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{user?.name || 'Guest'}</Text>
            <TouchableOpacity onPress={() => setEditingField('name')}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Email (read-only) */}
      <Text style={styles.email}>{user?.email || 'No email'}</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        {['Work', 'Follower', 'Reader List'].map((label) => (
          <View style={styles.statItem} key={label}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <View style={styles.descriptionBox}>
        {editingField === 'desc' ? (
          <View style={{ width: '100%' }}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              autoFocus
              multiline
              style={[styles.input, { textAlign: 'left', minHeight: 80 }]}
              placeholder="Write about yourself..."
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={() => saveField('desc')} style={styles.saveBtn}>
              <Ionicons name="checkmark" size={16} color="#fff" />
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editableRow}>
            <Text style={styles.descriptionText}>
              {user?.description || 'Tap pencil icon to add a bio.'}
            </Text>
            <TouchableOpacity onPress={() => setEditingField('desc')}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82328C',
    alignItems: 'center',
    paddingTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#D300FF',
    padding: 6,
    borderRadius: 16,
  },
  editableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 4,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ddd',
  },
  descriptionBox: {
    backgroundColor: '#652A6B',
    width: '90%',
    padding: 16,
    borderRadius: 8,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  input: {
    backgroundColor: '#794076',
    color: '#fff',
    padding: Platform.OS === 'ios' ? 10 : 8,
    borderRadius: 6,
    fontSize: 14,
    width: 250,
    alignSelf: 'center',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D300FF',
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    gap: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
