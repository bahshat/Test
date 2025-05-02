import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, View, Switch, StyleSheet, FlatList } from 'react-native';
import { initWebSocket, subscribeTo, unsubscribe } from '../utils/WebSocketNetwork';
import { LOG_TYPES, LOG_COLOUR } from '../utils/Constants';
import { Logs } from '../utils/model';

export default function Log({ logFileContent }: { logFileContent?: string }) {
  const [logLevel, setLogLevel] = useState(() =>
    Object.fromEntries(LOG_TYPES.map(type => [type, true]))
  );
  const [logs, setLogs] = useState<Logs[]>([]);
  const flatListRef = useRef<FlatList<Logs>>(null);

  // Parse file content to logs
  const parseLogFileContent = useCallback((content: string): Logs[] => {
    const lines = content.split('\n').filter(Boolean);
    return lines.map(line => {
      const timestamp = line.slice(0, 19); // Assuming format: 'YYYY-MM-DD HH:MM:SS'
      const match = line.match(/\[(.*?)\]/);
      const category = match?.[1]?.toLowerCase() || 'info';
      const message = line.split('::').slice(1).join('::').trim();
      return { timestamp, category, message };
    });
  }, []);

  useEffect(() => {
    if (logFileContent) {
      setLogs(parseLogFileContent(logFileContent));
      return;
    }

    initWebSocket();

    const logCallback = (newLog: Logs) => {
      setLogs(prev => [...prev.slice(-999), newLog]); // Keep max 1000 logs
    };

    subscribeTo('log', logCallback);
    return () => unsubscribe('log');
  }, [logFileContent]);

  const filteredLogs = logs.filter(log => logLevel[log.category]);

  const toggleSwitch = (type: string) => {
    setLogLevel(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const createSwitch = (type: string) => (
    <View key={type} style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{type.toUpperCase()}</Text>
      <Switch value={logLevel[type]} onValueChange={() => toggleSwitch(type)} />
    </View>
  );

  const createLogSwitchBar = () => (
    <View style={styles.filterRow}>
      {LOG_TYPES.map(type => createSwitch(type))}
    </View>
  );

  const createLogLine = ({ item, index }: { item: Logs; index: number }) => {
    const logStyle = [styles.logText, { color: LOG_COLOUR[item.category] || 'white' }];
    const logStr = `${item.timestamp} [${item.category.toUpperCase()}]:: ${item.message}`;
    return <Text key={index} style={logStyle}>{logStr}</Text>;
  };

  const createLogBox = () => (
    <FlatList
      style={styles.logBox}
      ref={flatListRef}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      data={filteredLogs}
      renderItem={createLogLine}
      keyExtractor={(_, index) => String(index)}
    />
  );

  return (
    <View style={styles.container}>
      {createLogSwitchBar()}
      {createLogBox()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 0 },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    padding: 6,
  },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  switchLabel: { color: 'white', marginRight: 10 },
  logBox: { flex: 1, backgroundColor: '#111', padding: 10 },
  logText: { fontFamily: 'monospace', fontSize: 14, marginBottom: 2 },
});