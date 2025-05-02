import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';

type Header = { title: string; width: number };

type TableProps = {
  headers: Header[];
  rows: any[];
  actions?: string[]; // e.g. ['Log', 'Graph']
  onRowTap?: (index: number, action?: string) => void;
};

export default function Table({ headers, rows, actions = [], onRowTap }: TableProps) {
  const renderHeaderCells = () =>
    headers.map(({ title, width }, index) => (
      <Text
        key={index}
        style={[{ flex: width }, styles.cellText, styles.headerText]}>
        {title.toUpperCase()}
      </Text>
    ));

  const renderRowCells = (item: any) =>
    headers.map(({ title, width }, index) => (
      <Text key={index} style={[{ flex: width }, styles.cellText]}>
        {item[title]}
      </Text>
    ));

  const renderRow = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.row}>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1 }}
        activeOpacity={onRowTap ? 0.4 : 1}
        onPress={onRowTap ? () => onRowTap(index) : undefined}>
        {renderRowCells(item)}
      </TouchableOpacity>

      {actions.length > 0 && (
        <View style={styles.buttonContainer}>
          {actions.map((action, i) => (
            <Button
              key={i}
              title={action}
              onPress={() => onRowTap?.(index, action)}
            />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.tableContainer}>
      <View style={styles.header}>{renderHeaderCells()}</View>
      <FlatList data={rows} renderItem={renderRow} keyExtractor={(_, i) => i.toString()} />
    </View>
  );
}

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
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  cellText: { paddingHorizontal: 5 },
  headerText: { fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    marginRight: 5,
  },
});