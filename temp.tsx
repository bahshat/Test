Here’s how we can implement the progress logic:

✅ Assumptions
	•	Each test row has:
	•	total_time_required (in minutes)
	•	started_on (timestamp string)
	•	status (e.g. “executing”, “passed”, “failed”)
	•	Only 1 test row at a time will be in executing state.
	•	You want to:
	•	Show percentage based on elapsed time.
	•	But keep showing percentage until the status becomes pass/fail — not 100%.

✅ What to Add in ExecutionStatus.tsx

Add a helper function:

function getProgressPercentage(startedOn: string, totalTime: number): string {
  const startTime = new Date(startedOn).getTime();
  const now = Date.now();
  const durationMs = totalTime * 60 * 1000;
  const elapsedMs = now - startTime;

  const percentage = Math.min((elapsedMs / durationMs) * 100, 99);
  return `${Math.floor(percentage)}%`;
}

✅ Modify the Table Rows Before Passing to UI

Inside updateExecution() in ExecutionStatus.tsx:

const updateExecution = (data: any) => {
  executionId.current = data.execution_id;

  const updatedRows = data.test_cases.map((row: any) => {
    if (
      row.status.toLowerCase() === 'executing' &&
      row.total_time_required &&
      row.started_on
    ) {
      return {
        ...row,
        status: getProgressPercentage(row.started_on, row.total_time_required),
      };
    }
    return row;
  });

  setData(updatedRows);
  setExecutionState(StateMap[data.status]);
};

Let me know if you want this percentage to be shown as a bar (graphical) or just text.