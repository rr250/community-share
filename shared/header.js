import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ title, navigation }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    //<ImageBackground source={require('../assets/white_bg.png')} style={styles.header}>
    <View style={styles.header}>
      <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
      <View style={styles.headerTitle}>
        <Image source={require('../assets/cogiv_logo_nowhite.png')} style={styles.headerImage} />
        <Text style={styles.headerText}>{title}</Text>
      </View>
      </View>
    //</ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50B9D8'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff',
    letterSpacing: 2,
    marginVertical: 10
  },
  icon: {
    position: 'absolute',
    left: 15,
    color:'#ffffff'
  },
  headerTitle: {
    flexDirection: 'row'
  },
  headerImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    marginVertical: 7
  },
});