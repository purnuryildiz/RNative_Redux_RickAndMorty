import {useNavigation} from '@react-navigation/native';
import {FilterSearch, SearchNormal1} from 'iconsax-react-native';
import React from 'react';
import {TouchableOpacity, Text, View, Pressable} from 'react-native';
import {FILTERCHARACTERS, SEARCHCHARACTERS} from '../../utils/ScreenName';

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{paddingRight: 10, flexDirection: 'row', gap: 10}} // Sağdan boşluk ekleyerek doğru hizalama
      onPress={() => alert('Header Right Pressed!')}>
      <Pressable onPress={() => navigation.navigate(SEARCHCHARACTERS)}>
        <SearchNormal1 size="24" color="white" />
      </Pressable>
      <Pressable onPress={() => navigation.navigate(FILTERCHARACTERS)}>
        <FilterSearch size="24" color="white" />
      </Pressable>
    </View>
  );
};

export default HeaderRight;
