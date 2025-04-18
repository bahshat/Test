<PrimaryButton
  title="Start"
  onClick={() => handleAction('Start')}
  disabled={execState !== ExecutionState.Idle}
/>

<PrimaryButton
  title={execState === ExecutionState.Paused ? 'Resume' : 'Pause'}
  onClick={() => handleAction(execState === ExecutionState.Paused ? 'Resume' : 'Pause')}
  disabled={execState === ExecutionState.Idle}
/>

<PrimaryButton
  title="Stop"
  onClick={() => handleAction('Stop')}
  disabled={execState === ExecutionState.Idle}
/>