enum ExecutionState {
  Idle,
  Running,
  Paused
}

const [execState, setExecState] = useState<ExecutionState>(ExecutionState.Idle);

const handleAction = (action: 'Start' | 'Pause' | 'Resume' | 'Stop') => {
  Network.changeExecution(action); // your API call

  switch (action) {
    case 'Start':
      setExecState(ExecutionState.Running);
      break;
    case 'Pause':
      setExecState(ExecutionState.Paused);
      break;
    case 'Resume':
      setExecState(ExecutionState.Running);
      break;
    case 'Stop':
      setExecState(ExecutionState.Idle);
      break;
  }
};