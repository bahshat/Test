import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Menu from './Menu';
import Logs from './Logs';
import ExecutionStatus from './ExecutionStatus';
import ExecuteTest from './ExecuteTest';
import ReportView from './ReportView';
import DetailView from './DetailView';
import GraphView from './GraphView';
import ViewTest from './ViewTest';

const pageRegistry = {
  'Logs': Logs,
  'Execution Status': ExecutionStatus,
  'Execute Test': ExecuteTest,
  'Report View': ReportView,
  'Detail View': DetailView,
  'Graph View': GraphView,
  'View Test': ViewTest,
};

const menuTitles = ['Execute Test', 'Execution Status', 'Logs', 'Report View'];

const getMenuTitleForPage = (pageName: string): string | null => {
  if (menuTitles.includes(pageName)) return pageName;
  if (pageName === 'Detail View') return 'Report View';
  return null;
};

export default function App(): React.JSX.Element {
  const [route, setRoute] = useState({ name: 'Execute Test', props: null });

  const changePage = (name: string, props: any = null) => {
    setRoute({ name, props });
  };

  const CurrentPage = pageRegistry[route.name];

  return (
    <View style={styles.container}>
      <Menu
        currentPage={getMenuTitleForPage(route.name)}
        menuClicked={(page) => changePage(page)}
      />
      <View style={styles.content}>
        <CurrentPage {...route.props} gotoPageHandler={changePage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1 },
  content: { flex: 1, padding: 16 },
});