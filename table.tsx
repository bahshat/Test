// components/Table.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TableProps = {
  headers: string[];
  columnFlex: number[];
  data: any[];
  onRowTap?: (rowIndex: number, rowData: any) => void;
  isRowTappable?: (rowData: any, rowIndex: number) => boolean; // optional condition
};

const Table = ({
  headers,
  columnFlex,
  data,
  onRowTap,
  isRowTappable,
}: TableProps) => {
  return (
    <View style={styles.tableContainer}>
      {/* Header row */}
      <View style={styles.row}>
        {headers.map((header, idx) => (
          <View key={idx} style={{ flex: columnFlex[idx] }}>
            <Text style={[styles.cellText, styles.headerText]}>{header}</Text>
          </View>
        ))}
      </View>

      {/* Data rows */}
      {data.map((row, rowIndex) => {
        const tappable =
          isRowTappable?.(row, rowIndex) ?? !!onRowTap; // Default: tap if handler exists

        const rowContent = (
          <View style={styles.row}>
            {headers.map((header, colIndex) => (
              <View key={colIndex} style={{ flex: columnFlex[colIndex] }}>
                <Text style={styles.cellText}>{row[header]}</Text>
              </View>
            ))}
          </View>
        );

        return tappable ? (
          <TouchableOpacity key={rowIndex} onPress={() => onRowTap?.(rowIndex, row)}>
            {rowContent}
          </TouchableOpacity>
        ) : (
          <View key={rowIndex}>{rowContent}</View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: { width: '100%' },
  row: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5 },
  cellText: { paddingHorizontal: 5 },
  headerText: { fontWeight: 'bold' },
});

export default Table;