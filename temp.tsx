const [modalVisible, setModalVisible] = useState(false);
const [files, setFiles] = useState<string[]>([]);

// API call
useEffect(() => {
  Network.getAvailableFiles().then(setFiles);
}, []);

<FileSelectorModal
  visible={modalVisible}
  files={files}
  onSelect={(fileName) => {
    console.log('Selected:', fileName);
    // do something with fileName
  }}
  onClose={() => setModalVisible(false)}
/>