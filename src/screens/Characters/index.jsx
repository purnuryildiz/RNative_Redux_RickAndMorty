import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCharacterList} from '../../store/actions/charactersAction';

const Characters = () => {
  const dispatch = useDispatch();
  const {params} = useSelector(state => state.characters);
  console.log(params);
  useEffect(() => {
    dispatch(getCharacterList(params));
  }, [params]);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({});
