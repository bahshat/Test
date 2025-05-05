import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Point = { x: number; y: number; xLabel?: string; yLabel?: string };

type Props = {
  data: Point[]; // e.g., [{ x: 0, y: 10 }, { x: 1, y: 30 }, ...]
  width?: number;
  height?: number;
};

export default function Graph({ data, width = 300, height = 200 }: Props) {
  const padding = 30;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const maxY = Math.max(...data.map(p => p.y));
  const maxX = Math.max(...data.map(p => p.x));

  const getCoords = (p: Point) => {
    const x = (p.x / maxX) * graphWidth;
    const y = graphHeight - (p.y / maxY) * graphHeight;
    return { x, y };
  };

  const coords = data.map(getCoords);

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Y Axis labels */}
      <View style={styles.yAxis}>
        <Text style={styles.axisLabel}>↑</Text>
        <Text style={styles.axisLabel}>{maxY}</Text>
        <Text style={styles.axisLabel}>0</Text>
      </View>

      {/* Main Graph Area */}
      <View style={[styles.graphArea, { width: graphWidth, height: graphHeight }]}>
        {coords.map((point, i) => {
          if (i === 0) return null;
          const prev = coords[i - 1];
          const deltaX = point.x - prev.x;
          const deltaY = point.y - prev.y;
          const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
          const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

          return (
            <View
              key={`line-${i}`}
              style={{
                position: 'absolute',
                left: prev.x,
                top: prev.y,
                width: length,
                height: 2,
                backgroundColor: 'blue',
                transform: [{ rotateZ: `${angle}deg` }],
              }}
            />
          );
        })}

        {/* Points */}
        {coords.map((point, i) => (
          <View
            key={`dot-${i}`}
            style={[styles.point, { left: point.x - 4, top: point.y - 4 }]}
          />
        ))}
      </View>

      {/* X Axis labels */}
      <View style={styles.xAxis}>
        {data.map((p, i) => (
          <Text key={i} style={[styles.axisLabel, { width: graphWidth / data.length }]}>
            {p.xLabel ?? p.x}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  yAxis: {
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  xAxis: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  axisLabel: {
    fontSize: 10,
    color: '#333',
  },
  graphArea: {
    position: 'relative',
    marginLeft: 5,
    backgroundColor: '#eef',
  },
  point: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
});