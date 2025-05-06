import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const App = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text style={{ textAlign: 'center', fontSize: 18 }}>Simple Graph in React Native Windows</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{ data: [20, 45, 28, 80] }]
        }}
        width={300}
        height={200}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        }}
      />
    </View>
  );
};

export default App;