Here’s the fully updated functional version of PollingManager using your Network.getStatus method with a callback-based mechanism, no class:

✅ PollingManager.ts

type DataCallback = (data: any) => void;

let pollingTimer: NodeJS.Timeout | null = null;
let isPolling = false;
let internalCallback: DataCallback | null = null;
const delay = 5000;

function pollOnce() {
  if (!internalCallback) return;

  const callbackWrapper = (data: any) => {
    internalCallback?.(data);

    if (!data || !data.test_cases || data.test_cases.length === 0) {
      stopPolling();
    } else {
      pollingTimer = setTimeout(pollOnce, delay);
    }
  };

  // Your Network module call
  import('../utils/Network').then(Network => {
    Network.default.getStatus(callbackWrapper);
  });
}

export function startPolling(callback: DataCallback) {
  if (isPolling) return;
  isPolling = true;
  internalCallback = callback;
  pollOnce();
}

export function stopPolling() {
  if (pollingTimer) clearTimeout(pollingTimer);
  pollingTimer = null;
  isPolling = false;
  internalCallback = null;
}

export function isPollingActive() {
  return isPolling;
}

You can now use it like this in your page:

useEffect(() => {
  startPolling(handlePollingData);
  return () => stopPolling();
}, []);

Let me know if you want to expose logging or last fetch time too.