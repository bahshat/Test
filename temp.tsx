import RNFS from 'react-native-fs';

const readLogFile = async (path: string) => {
  try {
    const content = await RNFS.readFile(path, 'utf8');
    return content;
  } catch (err) {
    console.error('File read error:', err.message);
    return '';
  }
};