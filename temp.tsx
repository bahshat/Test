import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, Switch, StyleSheet } from 'react-native';
import { initWebSocket, subscribeTo, unsubscribe } from '../common/Network';

const LOG_TYPES = ['info', 'debug', 'warn', 'error', 'verbose'];

const LogScreen = () => {
  const [logFilters, setLogFilters] = useState<Record<string, boolean>>(
    Object.fromEntries(LOG_TYPES.map((type) => [type, true]))
  );
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    initWebSocket();
    subscribeTo('log', (newLog) => {
      setLogs((prev) => [...prev.slice(-999), newLog]);
    });
    return () => unsubscribe('log');
  }, []);

  const filteredLogs = logs.filter((log) => {
    const tag = log.split(']')[0].slice(1).toLowerCase();
    return logFilters[tag];
  });

  const toggleSwitch = (type: string) =>
    setLogFilters((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {LOG_TYPES.map((type) => (
          <View key={type} style={styles.switchContainer}>
            <Text style={styles.switchLabel}>{type}</Text>
            <Switch
              value={logFilters[type]}
              onValueChange={() => toggleSwitch(type)}
            />
          </View>
        ))}
      </View>
      <ScrollView ref={scrollRef} style={styles.logBox} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {filteredLogs.map((log, i) => (
          <Text key={i} style={[styles.logText, getLogStyle(log)]}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const getLogStyle = (log: string) => {
  if (log.includes('[ERROR]')) return { color: 'red' };
  if (log.includes('[WARN]')) return { color: 'blue' };
  return { color: 'white' };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 10 },
  filterRow: { flexDirection: 'row', marginBottom: 10, justifyContent: 'space-around' },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  switchLabel: { color: 'white', marginRight: 5 },
  logBox: { flex: 1, backgroundColor: '#111', padding: 10 },
  logText: { fontFamily: 'monospace', fontSize: 12, marginBottom: 2 },
});

export default LogScreen;