import React from 'react';
import {Woman, Man, UserSearch} from 'iconsax-react-native';
import Colors from '../../theme/colors';

const GenderIcon = ({size, gender}) => {
  switch (gender) {
    case 'Female':
      return <Woman size={size} color={Colors.GENDER} />;
    case 'Male':
      return <Man size={size} color={Colors.GENDER} />;
    case 'unknown':
    default:
      return <UserSearch size={size} color={Colors.GENDER} />;
  }
};

export default GenderIcon;
