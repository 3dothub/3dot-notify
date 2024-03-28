import React, { useState, useEffect, useRef } from 'react';
import './Notify.css';
import { NotifyMessageType } from '../types';
import CancelSVG from '../../assets/cancel.svg';
import ExpandSVG from '../../assets/expand.svg';
import SuccessSVG from '../../assets/success.svg'
import ErrorSVG from '../../assets/error.svg'
import WarningSVG from '../../assets/warning.svg'
import NotificationSVG from '../../assets/notification.svg'
import InfoSVG from '../../assets/info.svg'

interface NotifyProps {
  messages: NotifyMessageType | null;
}

const Notify: React.FC<NotifyProps> = React.memo(({ messages }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [removeAll, setRemoveAll] = useState<boolean>(false);
  const [toastMessages, setToastMessages] = useState<NotifyMessageType[]>([]);
  const [removingMessage, setRemovingMessage] = useState<number>()
  const notifyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages) {
      setTimeout(() => {
        const toastValue = { ...messages }
        setToastMessages(prevMessages => {
          const updatedMessages = [toastValue, ...prevMessages.slice(0, 3)]; // its only store new 4 messages
          return updatedMessages;
        });
      }, 250);
    }
  }, [messages])


  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return SuccessSVG;
      case 'error':
        return ErrorSVG;
      case 'info':
        return InfoSVG;
      case 'warning':
        return WarningSVG;
      default: NotificationSVG
        return;
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
          <img className="message-icon" src={getIcon(message.type)} />
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
