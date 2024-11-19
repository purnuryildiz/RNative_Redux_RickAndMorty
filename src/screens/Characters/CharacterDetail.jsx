import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleCharacter} from '../../store/actions/charactersAction';

const CharacterDetail = () => {
  const route = useRoute();
  const {characterID} = route.params;

  const dispatch = useDispatch();

  const {pendingSingleCharacter, singleCharacter} = useSelector(
    state => state.characters,
  );

  const [scaleAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [showEpisodes, setShowEpisodes] = useState(false);

  useEffect(() => {
    dispatch(getSingleCharacter(characterID));
  }, []);

  useEffect(() => {
    // Animasyonları tekrar başlatma
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    );

    if (showEpisodes) {
      // Animasyonları başlat
      scaleAnimation.start();
      rotateAnimation.start();
    } else {
      // Animasyonları durdur
      scaleAnimation.stop();
      rotateAnimation.stop();
    }

    return () => {
      // Temizlik işlemleri, animasyonlar durdurulacak
      scaleAnimation.stop();
      rotateAnimation.stop();
    };
  }, [showEpisodes]); // showEpisodes her değiştiğinde animasyonları tetikle

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const toggleEpisodes = () => {
    setShowEpisodes(!showEpisodes);
  };

  const renderEpisode = ({item, index}) => (
    <View style={styles.episodeItem}>
      <Text style={styles.episodeText}>Episode {index + 1}</Text>
    </View>
  );

  if (pendingSingleCharacter) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Loading Character...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {singleCharacter && (
        <View style={styles.content}>
          <Animated.Image
            source={{uri: singleCharacter.image}}
            style={[
              styles.characterImage,
              {transform: [{rotate}, {scale: scaleAnim}]},
            ]}
          />
          <Text style={styles.characterName}>{singleCharacter.name}</Text>
          <View style={styles.detailBox}>
            <DetailRow label="Status" value={singleCharacter.status} />
            <DetailRow label="Species" value={singleCharacter.species} />
            <DetailRow label="Type" value={singleCharacter.type || 'Unknown'} />
            <DetailRow label="Gender" value={singleCharacter.gender} />
            <DetailRow label="Origin" value={singleCharacter.origin.name} />
            <DetailRow label="Location" value={singleCharacter.location.name} />
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleEpisodes}>
            <Text style={styles.actionButtonText}>
              {showEpisodes ? 'Hide Episodes' : 'Show Episodes'}
            </Text>
          </TouchableOpacity>

          {showEpisodes && (
            <View style={{width: '100%'}}>
              <FlatList
                nestedScrollEnabled={true}
                data={singleCharacter.episode}
                renderItem={renderEpisode}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3} // Üç sütunlu düzen
                columnWrapperStyle={styles.columnWrapper} // Sütun düzeni
                contentContainerStyle={styles.episodeList} // Dış kapsayıcı
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const DetailRow = ({label, value}) => (
  <View style={styles.detailContainer}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default CharacterDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#00796b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  characterImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#ffca28',
    marginVertical: 20,
    backgroundColor: '#ffffff',
  },
  characterName: {
    fontSize: 28,
    color: '#006064',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    width: '90%',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderColor: '#80deea',
    borderWidth: 2,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  label: {
    fontSize: 16,
    color: '#00796b',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#004d40',
  },
  actionButton: {
    backgroundColor: '#ff5722',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 12,
    marginTop: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  episodeList: {
    marginTop: 20,
    backgroundColor: '#e0f7fa',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  episodeItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#00796b',
    borderWidth: 1,
  },
  episodeText: {
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',
  },
});
