const stateMap = {
  'running': Execution.RUNNING,
  'paused': Execution.PAUSE,
  'stopped': Execution.STOP,
  // Add other states here as needed
};

const executionStateToSet = stateMap[current_state];

if (executionStateToSet !== undefined) { // Check if the state exists in our map
  setExecutionState(executionStateToSet);
  // No explicit 'return' needed here unless you have other logic that depends on it
  // and needs to be skipped after setting the state.
  // In your original code, 'return' was used inside each if, suggesting
  // that once the state is set, no further processing related to state setting is needed.
} else {
  // Handle unknown state, e.g., log an error or throw an exception
  console.warn(`Unknown current_state: ${current_state}`);
}
