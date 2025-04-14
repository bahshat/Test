const suites = [
  {
    id: 'suite1',
    name: 'Suite 1',
    tests: [
      { id: 'test1', name: 'Test 1' },
      { id: 'test2', name: 'Test 2' },
    ],
  },
  {
    id: 'suite2',
    name: 'Suite 2',
    tests: [
      { id: 'test3', name: 'Test 3' },
      { id: 'test4', name: 'Test 4' },
    ],
  },
];

const [selectedSuiteId, setSelectedSuiteId] = useState<string>('suite1');
const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);

const currentSuite = suites.find(s => s.id === selectedSuiteId);

return (
  <>
    {/* Suite Selector */}
    <FlatList
      data={suites}
      horizontal
      renderItem={({ item }) => (
        <Button title={item.name} onPress={() => setSelectedSuiteId(item.id)} />
      )}
    />

    {/* Test List */}
    <FlatList
      data={currentSuite?.tests || []}
      renderItem={({ item }) => {
        const isSelected = selectedTestIds.includes(item.id);

        const toggleSelection = () => {
          setSelectedTestIds(prev =>
            isSelected
              ? prev.filter(id => id !== item.id)
              : [...prev, item.id]
          );
        };

        return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.name}</Text>
            <Switch value={isSelected} onValueChange={toggleSelection} />
            <Button title="View" onPress={() => console.log('View', item.id)} />
          </View>
        );
      }}
    />
  </>
);



