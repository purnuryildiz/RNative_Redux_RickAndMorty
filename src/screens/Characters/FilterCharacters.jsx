import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getCharacterList} from '../../store/actions/charactersAction';

const FilterCharacters = () => {
  const dispatch = useDispatch();
  const {characterList, loading, error} = useSelector(
    state => state.characters,
  );
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  useEffect(() => {
    dispatch(getCharacterList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCharacters(characterList);
  }, [characterList]);

  const filterByStatus = status => {
    setSelectedStatus(status);
    const filtered = characterList.filter(
      char => status === 'All' || char.status === status,
    );
    setFilteredCharacters(filtered);
  };

  const filterByGender = gender => {
    setSelectedGender(gender);
    const filtered = characterList.filter(
      char => gender === 'All' || char.gender === gender,
    );
    setFilteredCharacters(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Filtreleme Seçenekleri */}
      <View style={styles.filters}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Status</Text>
          <View style={styles.filterDropdown}>
            {['All', 'Alive', 'Dead', 'Unknown'].map((status, index) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      selectedStatus === status
                        ? getStatusColor(index)
                        : '#f0f0f0',
                  },
                ]}
                onPress={() => filterByStatus(status)}>
                <Text style={styles.filterText}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Gender</Text>
          <View style={styles.filterDropdown}>
            {['All', 'Male', 'Female', 'Unknown'].map((gender, index) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      selectedGender === gender
                        ? getGenderColor(index)
                        : '#f0f0f0',
                  },
                ]}
                onPress={() => filterByGender(gender)}>
                <Text style={styles.filterText}>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Karakter Listesi */}
      {loading ? (
        <ActivityIndicator size="large" color="#3b3b3b" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          nestedScrollEnabled={true}
          data={filteredCharacters}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.characterCard}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.characterStatus}>Status: {item.status}</Text>
              <Text style={styles.characterStatus}>Gender: {item.gender}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// Farklı renkler için yardımcı fonksiyonlar
const getStatusColor = index => {
  const colors = ['#FF5733', '#28A745', '#DC3545', '#FFC107']; // Canlı kırmızı, yeşil, kırmızı, sarı
  return colors[index];
};

const getGenderColor = index => {
  const colors = ['#FFC107', '#007BFF', '#FF69B4', '#28A745']; // Canlı sarı, mavi, pembe, yeşil
  return colors[index];
};

export default FilterCharacters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  filters: {
    marginBottom: 30,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  filterDropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  filterButton: {
    padding: 12,
    borderRadius: 8,
    margin: 5,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4d4d4d',
  },
  filterText: {
    color: 'black',
    fontSize: 11,
    fontWeight: 'bold',
  },
  characterCard: {
    backgroundColor: '#fff',
    padding: 18,
    marginVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    shadowColor: '#3b3b3b',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 4,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  characterStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
