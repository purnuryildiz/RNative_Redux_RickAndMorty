import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ArrowCircleRight} from 'iconsax-react-native';
import GenderIcon from './GenderIcon';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CHARACTERDETAIL} from '../../utils/ScreenName';
const CharacterCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate(CHARACTERDETAIL, {characterID: item.id})
      }>
      <View style={styles.cardContent}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.characterName}>{item.name}</Text>
          <View style={styles.speciesContainer}>
            <Text style={styles.characterSpecies}>{item.species}</Text>
            <ArrowCircleRight size={32} color={Colors.ACCENT} />
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{item.status}</Text>
            <View style={styles.genderContainer}>
              <GenderIcon size={20} gender={item.gender} />
              <Text style={styles.genderText}>{item.gender}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fefefe', // Yumuşak beyaz arka plan
    marginBottom: 20,
    borderRadius: 20, // Daha modern yuvarlak köşeler
    elevation: 6, // Hafif gölge efekti
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
    padding: 15, // Kart içi boşluk
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60, // Tam yuvarlak
    marginRight: 15,
    borderWidth: 2, // Görsel çevresine çerçeve
    borderColor: '#FF8A65',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  characterName: {
    fontSize: 24, // Daha büyük başlık
    fontWeight: '700',
    color: '#2C3E50', // Koyu mavi ton
    marginBottom: 8,
    letterSpacing: 0.5, // Hafif aralık
  },
  speciesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  characterSpecies: {
    fontSize: 16,
    color: '#888', // Soluk gri
  },
  statusContainer: {
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#555', // Koyu gri
    marginBottom: 6,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  genderText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8, // İkon ile yazı arası boşluk
  },
});
