import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

type FileSelectorModalProps = {
  visible: boolean;
  files: string[];
  onSelect: (fileName: string) => void;
  onClose: () => void;
  title?: string;
};

export default function FileSelectorModal({
  visible,
  files,
  onSelect,
  onClose,
  title = 'Select a File',
}: FileSelectorModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView style={styles.scroll}>
            {files.map((file, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => {
                  onSelect(file);
                  onClose();
                }}
              >
                <Text style={styles.fileText}>{file}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  scroll: {
    marginVertical: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  fileText: {
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    padding: 8,
  },
  closeText: {
    color: 'blue',
  },
});