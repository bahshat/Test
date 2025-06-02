Here’s how you can implement all your mentioned features clearly and safely:

✅ Goals Recap:
	1.	Replace WebSocket with polling.
	2.	Start/stop polling based on:
	•	Navigation away
	•	STOP/PAUSE actions
	•	RESUME should resume polling
	3.	Add progress % for currently executing row.
	4.	Stop polling and interval once all rows are PASSED or FAILED.

✅ Changes Needed (Short, Point-Wise):

1. Polling Setup

Inside useEffect, replace WebSocket with polling:

useEffect(() => {
  let interval: NodeJS.Timeout;

  const fetchStatus = () => {
    Network.getStatus(dataCallback);
  };

  // Start polling
  fetchStatus(); // initial
  interval = setInterval(fetchStatus, 3000); // every 3 sec

  return () => clearInterval(interval); // clear on unmount
}, []);

2. Control Polling Dynamically

Declare globally:

let pollingInterval: NodeJS.Timeout | null = null;

Add helper:

const startPolling = () => {
  if (pollingInterval) return;
  Network.getStatus(dataCallback);
  pollingInterval = setInterval(() => {
    Network.getStatus(dataCallback);
  }, 3000);
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

Use these inside button logic:

if (action === Execution.RESUME) startPolling();
else if (action === Execution.PAUSE || action === Execution.STOP) stopPolling();

Also call stopPolling() in useEffect cleanup.

3. Show Progress Percentage

In your dataCallback, after setting setData(), call:

updatePercentage();

Logic for that:

const updatePercentage = () => {
  const executingRow = data.find(row => row.status === 'Executing');
  if (!executingRow) return;

  const started = new Date(executingRow.started_on).getTime();
  const now = Date.now();
  const elapsed = (now - started) / 1000; // seconds
  const total = executingRow.total_time_required;

  const percent = Math.min(100, Math.floor((elapsed / total) * 100));
  executingRow.status = `${percent}%`;
  setData(prev => prev.map(row => row.test_id === executingRow.test_id ? executingRow : row));
};

4. Auto-stop When All Done

At the end of dataCallback:

const allCompleted = data.every(row => ['Passed', 'Failed'].includes(row.status));
if (allCompleted) stopPolling();

Let me know if you want me to update your code with these changes together.