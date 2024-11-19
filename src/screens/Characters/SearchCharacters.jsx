import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Colors from '../../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getCharacterList} from '../../store/actions/charactersAction';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CHARACTERDETAIL} from '../../utils/ScreenName';
import LottieView from 'lottie-react-native';

const SearchCharacters = () => {
  const navigation = useNavigation();

  const {characterList, pending, params} = useSelector(
    state => state.characters,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacterList(params));
  }, [dispatch, params]);

  const [searchText, setSearchText] = useState('');
  const [cardAnim] = useState(new Animated.Value(1));

  // Filtreleme
  const filteredCharacters =
    characterList?.filter(character =>
      character.name.toLowerCase().includes(searchText.toLowerCase()),
    ) || [];

  // Kart animasyonunu başlatma
  const handleCardPressIn = () => {
    Animated.spring(cardAnim, {
      toValue: 1.05,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleCardPressOut = () => {
    Animated.spring(cardAnim, {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const renderCharacter = ({item}) => {
    const characterImage =
      item.image ||
      `https://via.placeholder.com/150/FFB6C1/000000?text=${item.name.charAt(
        0,
      )}`;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(CHARACTERDETAIL, {characterID: item.id})
        }
        style={styles.card}
        onPressIn={handleCardPressIn}
        onPressOut={handleCardPressOut}
        activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.cardContent,
            {
              transform: [{scale: cardAnim}],
            },
          ]}>
          <Image source={{uri: characterImage}} style={styles.characterImage} />
          <Text style={styles.characterName} numberOfLines={2}>
            {item.name}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="🔎 Search for your Hero"
          placeholderTextColor={Colors.GRAY}
          style={styles.input}
        />
      </View>
      {pending ? (
        <Text style={styles.loadingText}>
          ✨ Searching for characters... ✨
        </Text>
      ) : (
        <FlatList
          nestedScrollEnabled={true}
          data={filteredCharacters}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCharacter}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <LottieView
                source={require('../../utils/animation.json')}
                autoPlay
                loop
                style={styles.emptyAnimation}
              />
              <Text style={styles.emptyText}>
                "Oops! No heroes match your search."
              </Text>
            </View>
          }
          numColumns={3} // Kartları 3 sütunda göstermek için
          columnWrapperStyle={styles.columnWrapper} // Kartlar arasındaki boşluğu ayarlamak için
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 30,
    backgroundColor: Colors.ACCENT,
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
    backgroundColor: Colors.WHITE,
    color: Colors.TEXT,
    textAlign: 'center',
    width: '90%',
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  list: {
    marginTop: 10,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Kartlar arasındaki boşluğu ayarlamak için
  },
  card: {
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 8,
    flex: 1, // Kartlar birbirine daha yakın olacak
    marginHorizontal: 5, // Kartlar arasına biraz boşluk ekledik
    height: 160, // Kart boyutu biraz daha büyük
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  characterImage: {
    width: 70, // Resim boyutunu büyüttük
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 14,
    fontWeight: '500', // Daha sade ve modern bir yazı tipi
    color: Colors.TEXT,
    textAlign: 'center',
    fontFamily: 'Poppins', // Modern ve şık font
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyAnimation: {
    width: 200,
    height: 200,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.GRAY,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.ACCENT,
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default SearchCharacters;
