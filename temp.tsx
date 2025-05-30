import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

function App() {
  const handleLoadStart = () => {
    console.log('WebView: Loading started...');
  };

  const handleLoadEnd = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.loading) {
        console.log('WebView: Loading finished (but still rendering)');
    } else {
        console.log('WebView: Loading completely finished');
    }
  };

  const handleLoadError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView Load Error:', nativeEvent);
    // You can display an error message to the user here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Opening Google.com in WebView</Text>
      <WebView
        source={{ uri: 'https://www.google.com/' }}
        style={styles.webview}
        javaScriptEnabled={true} // Usually good to have for most websites
        domStorageEnabled={true} // For websites that use local storage
        startInLoadingState={true} // Show loading indicator initially
        renderLoading={() => ( // Custom loading component
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Google...</Text>
          </View>
        )}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleLoadError}
        // Important for debugging (check F12 Dev Tools for WebView)
        // Set to true to enable webview debugging.
        // For older RNW/WebView versions, this might be needed.
        // allowFileAccess={true}
        // allowUniversalAccessFromFileURLs={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  webview: {
    flex: 1, // Make sure the WebView takes up available space
    width: '100%', // Take full width
    minHeight: 300, // Ensure it has a minimum height if not flexed
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default App;
