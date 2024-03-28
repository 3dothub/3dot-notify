
interface NotifyMessageType {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timeStamp?: number;
}

export type { NotifyMessageType }