import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MenuProps } from '../utils/model';

const logo = require('../../assets/logo.jpg');

const menuTitles = ['Execute Test', 'Execution Status', 'Logs', 'Report View'];

const pageToMenuMap: Record<string, string> = {
  'View Test': 'Execute Test',
  'Detail View': 'Report View',
  'Graph View': 'Report View',
};

const getMenuForPage = (pageName: string) => pageToMenuMap[pageName] || pageName;

export default function Menu({ currentPage, setPage }: MenuProps): React.JSX.Element {
  const selectedTitle = getMenuForPage(currentPage);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      {menuTitles.map((title, index) => {
        const selected = title === selectedTitle;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => setPage({ name: title, props: {} })}
            style={[styles.menuItem, selected && styles.selected]}
          >
            <Text style={styles.text}>{title}</Text>
            {selected && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}