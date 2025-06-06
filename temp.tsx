Yes, you can definitely optimize this logic:

✅ Final Plan (Your Preference)
	•	Avoid mapping the whole array.
	•	Find and update only the executing row.
	•	Keep logic outside updateExecution() for clarity.

✅ Optimized Code

🧠 calculateProgress.ts (utility)

export function getProgressPercentage(startedOn: string, totalMinutes: number): string {
  const start = new Date(startedOn).getTime();
  const now = Date.now();
  const durationMs = totalMinutes * 60 * 1000;
  const elapsed = now - start;
  const percent = Math.min((elapsed / durationMs) * 100, 99);
  return `${Math.floor(percent)}%`;
}

✨ In ExecutionStatus.tsx

At the top:

import { getProgressPercentage } from '../utils/calculateProgress';

Then inside updateExecution:

const updateExecution = (data: any) => {
  executionId.current = data.execution_id;

  const executingIndex = data.test_cases.findIndex(
    (t: any) => t.status?.toLowerCase() === 'executing'
  );

  let testCases = data.test_cases;
  if (executingIndex !== -1) {
    const executing = testCases[executingIndex];
    if (executing.started_on && executing.total_time_required) {
      testCases = [...testCases]; // clone to avoid mutating original
      testCases[executingIndex] = {
        ...executing,
        status: getProgressPercentage(executing.started_on, executing.total_time_required),
      };
    }
  }

  setData(testCases);
  setExecutionState(StateMap[data.status]);
};

✅ Benefits:
	•	Only modifies the executing row.
	•	Keeps progress logic separate.
	•	Keeps updateExecution clean and efficient.

Let me know if you want to show a small visual bar instead of %.