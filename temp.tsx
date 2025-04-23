import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

type Header = {
  title: string;
  width: number;
};

type TableProps = {
  headers: Header[];
  rows: any[];
  onRowTap?: (index: number) => void;
};

const Table = ({ headers, rows, onRowTap }: TableProps) => {
  const renderCells = (item: any, isHeader = false) =>
    headers.map(({ title, width }, index) => {
      const text = isHeader ? title.toUpperCase() : item[title];
      const style = [
        { flex: width },
        styles.cellText,
        isHeader && styles.headerText,
      ];
      return (
        <Text key={index} style={style}>
          {text}
        </Text>
      );
    });

  const renderRow = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      key={index}
      onPress={onRowTap ? () => onRowTap(index) : undefined}
      activeOpacity={onRowTap ? 0.4 : 1}
    >
      <View style={styles.row}>{renderCells(item)}</View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tableContainer}>
      <View style={styles.header}>{renderCells({}, true)}</View>
      <FlatList
        data={rows}
        renderItem={renderRow}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: { width: '100%' },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: 'lightgray',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  cellText: { paddingHorizontal: 5 },
  headerText: { fontWeight: 'bold' },
});

export default Table;