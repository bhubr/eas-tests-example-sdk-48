import { useEffect, useState } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';

function PhotoItem({ photo }) {
  return (
    <View style={styles.photoItem}>
      <Image source={{ uri: photo.url }} style={styles.photoItemImg} />
      <Text style={styles.photoItemText}>{photo.title}</Text>
    </View>
  );
}

function PhotosList({ photos }) {
  return (
    <View style={styles.photoList}>
      {/* should use a FlatList */}
      {photos.map((ph) => (
        <PhotoItem key={ph.id} photo={ph} />
      ))}
    </View>
  );
}

const jsonPlaceholder = 'https://jsonplaceholder.typicode.com';

export default function PhotosListAPI() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const photosEndpoint = `${jsonPlaceholder}/photos`;
    axios
      .get(photosEndpoint)
      .then((r) => r.data)
      .then((ph) => setPhotos(ph.slice(0, 6)))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Text>loading</Text>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  return <PhotosList photos={photos} />;
}

const styles = StyleSheet.create({
  photoItem: {
    width: '33%',
    alignItems: 'center',
  },
  photoItemImg: {
    width: 100,
    height: 100,
  },
  photoItemText: {
    fontSize: 12,
  },
  photoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
