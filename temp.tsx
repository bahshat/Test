const logLineRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2} \[[A-Z]+\] :: .+$/;

export const HistoricLogSchema = z.string().refine(val => {
  const logLines = val
    .trim()
    .split(/(?=\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})/)
    .map(line => line.trim());

  for (const line of logLines) {
    if (!logLineRegex.test(line)) {
      console.log('Invalid log line:', JSON.stringify(line));
      return false;
    }
  }
  return true;
}, {
  message: 'One or more log entries do not match expected format (timestamp [TYPE] :: message)',
});