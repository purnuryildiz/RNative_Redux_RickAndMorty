import {StyleSheet} from 'react-native';

const Colors = {
  DARK: '#1F1F1F', // Koyu arka plan
  LIGHT: '#FFFFFF', // Beyaz arka plan
  PRIMARY: '#FF6F61', // Vurgu rengi
  INACTIVE: '#A1A1A1', // Pasif renk
  HEADER: '#333333', // Başlık arka plan
};

const tabBarStyle = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.HEADER, // Başlık arka planı
    elevation: 4,
  },
  tabBarStyle: {
    backgroundColor: Colors.DARK, // Tab arka planı
    borderTopWidth: 0,
    elevation: 8,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.LIGHT,
    textAlign: 'center',
  },
});

export {tabBarStyle};
