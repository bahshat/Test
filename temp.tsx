import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Status from '../src/pages/Status';

describe('Status Buttons', () => {
  const mockAlert = jest.spyOn(Alert, 'alert');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const simulateAlertChain = (action: string) => {
    // Simulate the confirmation popup and user pressing OK
    const confirmCallback = mockAlert.mock.calls[0][2]?.find(b => b.text === 'OK')?.onPress;
    confirmCallback?.();

    // Then success message should show up
    expect(mockAlert).toHaveBeenCalledWith('Success', `${action} action performed successfully`);
  };

  it('handles Resume button correctly', async () => {
    const { getByText } = render(<Status />);
    fireEvent.press(getByText('Resume'));

    expect(mockAlert).toHaveBeenCalledWith('Confirm', expect.stringContaining('Resume'), expect.any(Array));
    simulateAlertChain('Resume');
  });

  it('handles Pause button correctly', async () => {
    const { getByText } = render(<Status />);
    fireEvent.press(getByText('Pause'));

    expect(mockAlert).toHaveBeenCalledWith('Confirm', expect.stringContaining('Pause'), expect.any(Array));
    simulateAlertChain('Pause');
  });

  it('handles Stop button correctly', async () => {
    const { getByText } = render(<Status />);
    fireEvent.press(getByText('Stop'));

    expect(mockAlert).toHaveBeenCalledWith('Confirm', expect.stringContaining('Stop'), expect.any(Array));
    simulateAlertChain('Stop');
  });
});