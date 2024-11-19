import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {getEpisodesList} from '../../store/actions/episodesActions';
import LottieView from 'lottie-react-native';

const Episodes = () => {
  const dispatch = useDispatch();
  const {episodes, loading, error} = useSelector(state => state.episodes);

  useEffect(() => {
    dispatch(getEpisodesList());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>
          Hang tight! Episodes are coming... 🚀
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Whoops! Something went wrong 🤔</Text>
        <Text style={styles.errorDetails}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{marginLeft: 90}}>
        <LottieView
          source={require('../../utils/animation2.json')}
          autoPlay
          loop
          style={{width: 200, height: 200}}
        />
      </View>

      <FlatList
        nestedScrollEnabled={true}
        data={episodes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{
                uri: `https://rickandmortyapi.com/api/character/avatar/${item.id}.jpeg`,
              }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subText}>{item.air_date}</Text>
              <Text style={styles.episode}>Episode: {item.episode} 🌟</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Watch Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false} // Scroll indicator'ı devre dışı bırakıyoruz
        ListHeaderComponent={<View style={{height: 50}} />} // Android'de paddingTop yerine kullanılabilir
      />
    </View>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9', // Soft gray for card background
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C5C5C5', // Soft border color
    shadowColor: '#B0B0B0', // Light gray shadow
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark gray for text
    marginBottom: 5,
  },
  subText: {
    fontSize: 15,
    color: '#757575', // Lighter gray for subtext
  },
  episode: {
    fontSize: 15,
    color: '#64B5F6', // Light blue or mint green for episode number
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#64B5F6', // Soft blue for the button
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{translateY: -50}],
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF', // White text color for the button
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#FF4081',
    marginTop: 20,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  errorDetails: {
    fontSize: 14,
    color: '#F44336',
    marginTop: 5,
  },
});
