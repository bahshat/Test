import React, { createContext, useContext, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingContext = createContext({
  show: () => {},
  hide: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}
      {visible && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});



import { LoadingProvider } from './LoadingOverlay';

export default function App() {
  return (
    <LoadingProvider>
      {/* Your app screens/components */}
    </LoadingProvider>
  );
}



import { useLoading } from './LoadingOverlay';

const MyComponent = () => {
  const { show, hide } = useLoading();

  const loadData = async () => {
    show();
    await fetchData(); // simulate async operation
    hide();
  };

  return (
    <Button title="Load Something" onPress={loadData} />
  );
};


