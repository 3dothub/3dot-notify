import type { Meta, StoryObj } from '@storybook/react';
import Toaster from './Toaster';
import React, { useState } from 'react';

const meta = {
    title: '3DotHub/Toaster',
    component: Toaster,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {}
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        messages: {
            id: Math.random(),
            message: 'errorMessage',
            title: 'Error',
            type: 'error' as const
        }
    }
};
