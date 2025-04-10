import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = {
  currentPage: string | null;
  menuClicked: (menuTitle: string) => void;
};

export default function Menu({ currentPage, menuClicked }: Props): React.JSX.Element {
  const menuTitles = ['Execute Test', 'Execution Status', 'Logs', 'Report View'];

  return (
    <View style={styles.menuContainer}>
      <Image style={styles.logo} source={require('../../assets/logo.jpg')} />
      {menuTitles.map((title, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            title === currentPage && styles.selectedMenuItem,
          ]}
          onPress={() => menuClicked(title)}
        >
          <Text style={styles.menuText}>{title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    width: 180,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
  },
  logo: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedMenuItem: {
    backgroundColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
  },
});