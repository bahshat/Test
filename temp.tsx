import React, { useState, useEffect, Suspense } from 'react';
import { View, Text } from 'react-native';

const pageNames = ['Logs', 'ReportView', 'ExecuteTest']; // Only add page names here

const PageLoader = ({ pageName }: { pageName: string }) => {
  const LazyComponent = React.lazy(() => import(`./pages/${pageName}`));
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <LazyComponent />
    </Suspense>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('Logs');

  return (
    <View style={{ flex: 1 }}>
      {/* Your side menu can setCurrentPage with any value from pageNames */}
      <PageLoader pageName={currentPage} />
    </View>
  );
}