Great! Here’s the revised code with PollingManager using your existing Network module’s getStatus method instead of using fetch directly.

✅ PollingManager.ts

import Network from '../utils/Network';

type Callback = (data: any) => void;

class PollingManager {
  private intervalId: NodeJS.Timeout | null = null;
  private delay = 5000;
  private onData: Callback;
  private shouldPoll = false;

  constructor(onData: Callback) {
    this.onData = onData;
  }

  private async poll() {
    try {
      const data = await Network.getStatus(); // Uses Network module
      this.onData(data);

      // Stop polling if no data
      if (!data || !data.test_cases || data.test_cases.length === 0) {
        this.stop();
        return;
      }

      // Otherwise schedule next fetch
      if (this.shouldPoll) {
        this.intervalId = setTimeout(() => this.poll(), this.delay);
      }
    } catch (err) {
      console.error('Polling error:', err);
      this.stop(); // Stop polling on failure
    }
  }

  public start() {
    if (this.shouldPoll) return;
    this.shouldPoll = true;
    this.poll();
  }

  public stop() {
    this.shouldPoll = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  public isRunning() {
    return this.shouldPoll;
  }
}

export default PollingManager;

You can now instantiate this in your page/component like:

const polling = useRef<PollingManager | null>(null);

useEffect(() => {
  polling.current = new PollingManager(handlePollingData);
  polling.current.start();

  return () => polling.current?.stop();
}, []);

Let me know when you’re ready to integrate controller logic next.