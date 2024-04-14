import React, { useState, useEffect, useRef, memo } from 'react';
import './Notify.css';
import { NotifyMessageType } from '../../types';
import CancelSVG from '../../assets/cancel.svg';
import SuccessSVG from '../../assets/success.svg';
import ErrorSVG from '../../assets/error.svg';
import WarningSVG from '../../assets/warning.svg';
import NotificationSVG from '../../assets/notification.svg';
import InfoSVG from '../../assets/info.svg';

interface State {
    expanded: boolean;
    removeAll: boolean;
    toastMessages: NotifyMessageType[];
    removingMessage: number | null;
}

export interface NotifyProps {
    messages: NotifyMessageType | null;
}

const Notify: React.FC<NotifyProps> = ({ messages }) => {
    const initialState: State = {
        expanded: false,
        removeAll: false,
        toastMessages: [],
        removingMessage: null
    };
    const [state, setState] = useState<State>(initialState);

    const notifyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages) {
            setTimeout(() => {
                setState((prevState) => {
                    let updatedMessages = [...prevState.toastMessages];
                    if (!prevState.toastMessages.find((msg) => msg.id === messages.id)) {
                        updatedMessages = [messages, ...prevState.toastMessages.slice(0, 3)];
                    }
                    if (updatedMessages.length === 1) {
                        return { ...prevState, expanded: true, toastMessages: updatedMessages };
                    }
                    return { ...prevState, toastMessages: updatedMessages };
                });
            }, 500);
        }
    }, [messages]);

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
            default:
                return NotificationSVG;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
                setState((prevState) => ({ ...prevState, expanded: false }));
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
        setState((prevState) => ({ ...prevState, removeAll: true }));
        setTimeout(() => {
            setState((prevState) => ({ ...prevState, toastMessages: [], removeAll: false }));
        }, 500);
    };

    const handleRemoveMessage = (id: number) => {
        if (state.expanded) {
            setState((prevState) => ({ ...prevState, removingMessage: id }));
            setTimeout(() => {
                const filteredMessage = state.toastMessages.filter((message) => message.id !== id);
                setState((prevState) => ({ ...prevState, toastMessages: filteredMessage }));
            }, 500);
        } else {
            setState((prevState) => ({ ...prevState, expanded: !prevState.expanded }));
        }
    };

    return (
        <div ref={notifyRef} id={`${state.expanded ? 'notify-expanded' : 'notify'}`} className={state.removeAll ? 'message-remove' : ''}>
            {!!state.toastMessages.length && (
                <img
                    id="expand-button"
                    onClick={handleToggleExpand}
                    className={`notify-message ${state.removeAll || (state.toastMessages.length === 1 && state.toastMessages[0].id === state.removingMessage) ? 'message-remove' : ''}`}
                    src={CancelSVG}
                    alt={'cancel'}
                    style={state.expanded ? { bottom: `${state.toastMessages.length * 5}rem` } : {}}
                />
            )}
            {state.toastMessages.map((message, index) => (
                <div
                    onClick={() => handleRemoveMessage(message.id)}
                    key={message.id}
                    className={`notify-message ${message.type} message-${3 - index} ${state.removingMessage === message.id || state.removeAll ? 'message-remove' : ''}`}
                    style={state.expanded ? { bottom: `${(state.toastMessages.length - 1 - index) * 5}rem`, filter: 'brightness(100%)' } : {}}
                >
                    <img className="message-icon" src={getIcon(message.type)} alt="icon" />
                    <div className="message-content">
                        <div className="message-title">{message.title}</div>
                        <div className="message">{truncateMessage(message.message)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default memo(Notify);
