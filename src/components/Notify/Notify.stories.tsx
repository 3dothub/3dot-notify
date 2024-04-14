import type { Meta, StoryObj } from '@storybook/react';
import Notify from './Notify';
import React, { useEffect, useState } from 'react';
import { NotifyMessageType } from '../../types';

const meta = {
    title: '3DotHub/Button',
    component: Notify,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {}
} satisfies Meta<typeof Notify>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
    args: {
        messages: {
            id: Math.random(),
            message: 'errorMessage',
            title: 'Error',
            type: 'error' as const
        }
    }
};

export const Info: Story = {
    args: {
        messages: {
            id: Math.random(),
            message: 'infoMessage',
            title: 'Info',
            type: 'info' as const
        }
    }
};

export const Success: Story = {
    args: {
        messages: {
            id: Math.random(),
            message: 'successMessage',
            title: 'Success',
            type: 'success' as const
        }
    }
};

export const Warning: Story = {
    args: {
        messages: {
            id: Math.random(),
            message: 'warningMessage',
            title: 'Warning',
            type: 'warning' as const
        }
    }
};
export const MultipleMessages = () => {
    const messages: NotifyMessageType[] = [
        {
            id: Math.random(),
            title: 'Warning 1',
            message: 'This is warning message 1.',
            type: 'warning'
        },
        {
            id: Math.random(),
            title: 'Error 2',
            message: 'This is error message 2.',
            type: 'error'
        },
        {
            id: Math.random(),
            title: 'Info 1',
            message: 'This is info message 1.',
            type: 'info'
        },
        {
            id: Math.random(),
            title: 'Success 1',
            message: 'This is success message 1.',
            type: 'success'
        }
    ];
    const [toastMessage, setToastMessage] = useState(messages[0]);
    const handleAddToaster = () => {
        setToastMessage(messages[Math.floor(Math.random() * messages.length)]);
    };
    return (
        <div>
            <button onClick={handleAddToaster}>Add Toaster</button>
            <Notify messages={toastMessage} />
        </div>
    );
};
