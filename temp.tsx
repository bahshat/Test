import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, View, Switch, StyleSheet, FlatList } from 'react-native';
import { initWebSocket, subscribeTo, unsubscribe } from '../utils/WebSocketNetwork';
import { LOG_COLOUR, LOG_TYPES } from '../utils/Constants';
import { Logs } from '../utils/model';
import axios from 'axios';

export default function Log({ testId }: { testId: string }) {
  const [logLevel, setLogLevel] = useState<Record<string, boolean>>(
    Object.fromEntries(LOG_TYPES.map(type => [type, true]))
  );
  const [logs, setLogs] = useState<Logs[]>([]);
  const [wsConnected, setWsConnected] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  // Fetch full logs from API
  const fetchFullLog = async () => {
    try {
      const res = await axios.get(`/api/logs/${testId}`);
      const lines = res.data.split('\n').map((line: string): Logs => {
        const [timestamp, rest] = line.split('] > [');
        const [category, message] = rest.split(']:: ');
        return {
          timestamp: timestamp.replace('[', '').trim(),
          category: category.trim().toLowerCase(),
          message: message.trim()
        };
      });
      setLogs(lines);
    } catch (err) {
      console.error('Error fetching full log:', err);
    }
  };

  // Handle WebSocket messages
  const handleNewLog = useCallback((newLog: Logs) => {
    setLogs(prev => [...prev, newLog]);
  }, []);

  useEffect(() => {
    fetchFullLog();
    initWebSocket(
      () => setWsConnected(true),
      () => setWsConnected(false)
    );
    subscribeTo('log', handleNewLog);
    return () => unsubscribe('log');
  }, [handleNewLog]);

  const toggleSwitch = (type: string) =>
    setLogLevel(prev => ({ ...prev, [type]: !prev[type] }));

  const filteredLogs = logs.filter(log => logLevel[log.category]);

  const renderLogLine = ({ item }: { item: Logs }) => (
    <Text style={[styles.logText, { color: LOG_COLOUR[item.category] || 'white' }]}>
      [{item.timestamp}] > [{item.category.toUpperCase()}]:: {item.message}
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {LOG_TYPES.map(type => (
          <View key={type} style={styles.switchContainer}>
            <Text style={styles.switchLabel}>{type.toUpperCase()}</Text>
            <Switch value={logLevel[type]} onValueChange={() => toggleSwitch(type)} />
          </View>
        ))}
      </View>

      {!wsConnected && (
        <Text style={{ color: 'red', marginBottom: 5 }}>WebSocket disconnected</Text>
      )}

      <FlatList
        ref={flatListRef}
        data={filteredLogs}
        renderItem={renderLogLine}
        keyExtractor={(_, index) => index.toString()}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        style={styles.logBox}
      />
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
    flexWrap: 'wrap'
  },
  switchContainer: { flexDirection: 'row', alignItems: 'center', margin: 6 },
  switchLabel: { color: 'white', marginRight: 10 },
  logBox: { flex: 1, backgroundColor: '#111', padding: 10, marginLeft: 10 },
  logText: { fontFamily: 'monospace', fontSize: 14, marginBottom: 2 }
});