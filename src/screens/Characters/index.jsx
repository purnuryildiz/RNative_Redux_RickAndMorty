import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCharacterList} from '../../store/actions/charactersAction';
import Spinner from '../../components/ui/Spinner';
import CharacterCard from '../../components/characters/CharacterCard';

const Characters = () => {
  const dispatch = useDispatch();
  const {params, characterList, pending, error} = useSelector(
    state => state.characters,
  );

  useEffect(() => {
    dispatch(getCharacterList(params));
  }, [params]);

  return (
    <View style={{flex: 1}}>
      {pending ? (
        <Spinner />
      ) : (
        <FlatList
          data={characterList}
          renderItem={({item}) => <CharacterCard item={item} />}
        />
      )}
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({});
