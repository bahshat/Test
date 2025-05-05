// Graph.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type Point = { x: number; y: number };
type Props = {
  data: Point[]; // e.g., [{x:0, y:10}, {x:1, y:30}, {x:2, y:15}]
  width?: number;
  height?: number;
};

export default function Graph({ data, width = 300, height = 200 }: Props) {
  const maxY = Math.max(...data.map(p => p.y));
  const maxX = Math.max(...data.map(p => p.x));

  return (
    <View style={[styles.graph, { width, height }]}>
      {data.map((point, i) => {
        const left = (point.x / maxX) * width;
        const bottom = (point.y / maxY) * height;
        return (
          <View
            key={i}
            style={[
              styles.point,
              { left: left - 4, bottom: bottom - 4 },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  graph: {
    position: 'relative',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  point: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
  },
});