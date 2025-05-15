import { z } from 'zod';

const logLineRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \[[A-Z]+\]:: .+$/;

export const HistoricLogSchema = z.string().refine(val => {
  return val
    .trim()
    .split('\n')
    .every(line => logLineRegex.test(line));
}, {
  message: 'One or more lines in log do not match expected format (timestamp [TYPE]:: message)',
});