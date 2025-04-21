import { useEffect } from 'react';
import { initWebSocket, subscribeTo, unsubscribe } from '../common/Network';

export const useExecutionStatus = (onUpdate: (data: any) => void) => {
  useEffect(() => {
    initWebSocket();
    subscribeTo('statusUpdate', onUpdate);
    return () => unsubscribe('statusUpdate');
  }, []);
};