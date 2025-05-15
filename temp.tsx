export const HistoricLogSchema = z.string().refine(val => {
  const lines = val.trim().split('\n');
  for (const line of lines) {
    if (!logLineRegex.test(line.trim())) {
      console.log('Invalid Line:', JSON.stringify(line));
      return false;
    }
  }
  return true;
}, {
  message: 'One or more lines in log do not match expected format (timestamp [TYPE] :: message)',
});