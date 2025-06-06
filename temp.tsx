Here’s a full implementation based on your architecture requirements (high decoupling, polling logic self-contained, controller autonomous, minimal page logic).

✅ PollingManager.ts

type Callback = (data: any) => void;

class PollingManager {
  private interval: NodeJS.Timeout | null = null;
  private nextFetchTime = 5000;
  private isActive = false;
  private callback: Callback | null = null;

  start(callback: Callback) {
    if (this.isActive) return;
    this.isActive = true;
    this.callback = callback;
    this.fetchAndSchedule();
  }

  stop() {
    if (this.interval) clearTimeout(this.interval);
    this.isActive = false;
    this.callback = null;
  }

  private async fetchAndSchedule() {
    const data = await this.fetchStatus();
    if (!this.isActive) return;

    this.callback?.(data);
    if (!data || data.test_cases?.length === 0) {
      this.stop();
    } else {
      this.interval = setTimeout(() => this.fetchAndSchedule(), this.nextFetchTime);
    }
  }

  private async fetchStatus() {
    try {
      const res = await fetch('http://localhost:5000/status');
      return await res.json();
    } catch (e) {
      console.error('Polling fetch error:', e);
      return null;
    }
  }
}

export default new PollingManager();

✅ ExecutionController.tsx

import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { Execution } from '../utils/Constants';
import Network from '../utils/Network';
import { useLoading } from './Loading';
import PollingManager from '../utils/PollingManager';

type Props = {
  currentState: Execution;
  onStateChange: (state: Execution) => void;
};

export default function ExecutionController({ currentState, onStateChange }: Props) {
  const { showLoadingWindow, hideLoadingWindow } = useLoading();

  const handleAction = (action: Execution) => {
    Alert.alert(
      'Execution Action',
      `Are you sure you want to perform (${action}) action?`,
      [
        {
          text: 'Perform',
          onPress: () => {
            showLoadingWindow();
            Network.sendControllerAction(action, (data: Execution) => {
              hideLoadingWindow();
              onStateChange(data);

              if (data === Execution.STOP || data === Execution.PAUSE) {
                PollingManager.stop();
              } else if (data === Execution.RESUME) {
                PollingManager.start(() => {});
              }
            });
          },
        },
        { text: 'Dismiss' },
      ]
    );
  };

  return (
    <View style={styles.btnContainer}>
      <PrimaryButton title="RESUME" onClick={() => handleAction(Execution.RESUME)} disabled={currentState !== Execution.PAUSE} />
      <PrimaryButton title="PAUSE" onClick={() => handleAction(Execution.PAUSE)} disabled={currentState !== Execution.RESUME} />
      <PrimaryButton title="STOP" onClick={() => handleAction(Execution.STOP)} disabled={currentState === Execution.STOP} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

✅ ExecutionStatus.tsx (Page)

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Table from '../components/Table';
import ExecutionController from '../components/ExecutionController';
import PollingManager from '../utils/PollingManager';
import { Execution, PAGE, StateMap } from '../utils/Constants';

const headers = [
  { title: 'test_id', width: 1 },
  { title: 'name', width: 2 },
  { title: 'started_on', width: 1 },
  { title: 'ended_on', width: 1 },
  { title: 'status', width: 1 },
];

export default function ExecutionStatus({ setPage }) {
  const [data, setData] = useState([]);
  const [executionState, setExecutionState] = useState(Execution.STOP);
  const executionId = useRef<number>(0);

  useEffect(() => {
    PollingManager.start(handlePollingData);
    return () => PollingManager.stop();
  }, []);

  const handlePollingData = (response: any) => {
    if (!response) {
      if (executionId.current !== 0) {
        Alert.alert('Execution Finished', 'Redirecting to Report View', [
          {
            text: 'Go',
            onPress: () =>
              setPage({
                name: PAGE.DetailView,
                props: { executionId: executionId.current },
              }),
          },
        ]);
        executionId.current = 0;
        setData([]);
        setExecutionState(Execution.STOP);
      } else {
        Alert.alert('No Execution', 'Currently there is no test under execution!');
      }
      return;
    }

    executionId.current = response.execution_id;
    setData(response.test_cases);
    setExecutionState(StateMap[response.status]);
  };

  return (
    <View style={styles.container}>
      <ExecutionController currentState={executionState} onStateChange={setExecutionState} />
      <Table headers={headers} rowsData={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 10, paddingBottom: 100 },
});

Let me know if you also want to extract polling config (interval, timeout) into constants or allow multiple types of polling logic.