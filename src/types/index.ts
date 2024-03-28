
export interface NotifyMessageType {
    id: number;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }