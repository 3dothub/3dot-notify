import React, { useState, useEffect, useRef } from 'react';
import './Notify.css';
import { NotifyMessageType } from '../../types';
import CancelSVG from '../../assets/cancel.svg';
import ExpandSVG from '../../assets/expand.svg';

interface NotifyProps {
  onClose: () => void;
  messages: NotifyMessageType[];
}

const Notify: React.FC<NotifyProps> = React.memo(({ onClose, messages }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [removeAll, setRemoveAll] = useState<boolean>(false);
  const [toastMessages, setToastMessages] = useState<NotifyMessageType[]>(messages);
  const [removingMessage, setRemovingMessage] = useState<number>()
  const notifyRef = useRef<HTMLDivElement>(null);


  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✔️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      default:
        return '';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const truncateMessage = (message: string): string => {
    return message.length > 100 ? message.slice(0, 100) + '...' : message;
  };

  const handleToggleExpand = () => {
    if (expanded) {
      setRemoveAll(true)
      setTimeout(() => { setToastMessages([]) }, 200)
    } else {
      setExpanded(!expanded)
    }
  };
  const handleRemoveMessage = (id: number) => {
    if (expanded) {
      setRemovingMessage(id)
      setTimeout(() => {
        const filteredMessage = toastMessages.filter(message => message.id !== id)
        setToastMessages(filteredMessage)
      }, 200);
    } else {
      setExpanded(!expanded)
    }
  };

  return (
    <div ref={notifyRef} id={`${expanded ? 'notify-expanded' : 'notify'}`}>
      {!!toastMessages.length && (
        <img
          id='expand-button'
          onClick={handleToggleExpand}
          className={`notify-message ${removeAll || (toastMessages.length === 1 && toastMessages[0].id === removingMessage) ? 'message-remove' : ''}`}
          src={expanded ? CancelSVG : ExpandSVG}
          alt={expanded ? 'cancel' : 'expand'}
          style={expanded ? { bottom: `${toastMessages.length * 5}rem` } : {}}
        />
      )}
      {toastMessages.map((message, index) => (
        <div
          onClick={() => handleRemoveMessage(message.id)}
          key={message.id}
          className={`notify-message ${message.type} message-${3 - index} ${removingMessage === message.id || removeAll ? 'message-remove' : ''}`}
          style={expanded ? { bottom: `${(toastMessages.length - 1 - index) * 5}rem`, filter: 'brightness(100%)' } : {}}
        >
          <span className="message-icon">{getIcon(message.type)}</span>
          <div className="message-content">
            <div className='message-title'>{message.title}</div>
            <div className='message'>{truncateMessage(message.message)}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Notify;
