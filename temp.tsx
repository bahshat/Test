// App.tsx
import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import Menu from './Menu'; // Your existing menu component



const LazyPage = ({ pageName }: { pageName: string }) => {
  const PageComponent = React.lazy(() => import(`./pages/${pageName}`));
  return <PageComponent />;
};


export default function App() {
  const [currentPage, setCurrentPage] = React.useState('Logs'); // default

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Menu onChange={setCurrentPage} selected={currentPage} />

      <View style={{ flex: 1 }}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <LazyPage pageName={currentPage} />
        </Suspense>
      </View>
    </View>
  );
}
