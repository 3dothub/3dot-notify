import type { Meta, StoryObj } from '@storybook/react';
import Notify from './Notify';

const meta = {
    title: '3DotHub/Notify',
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

export const Success: Story = {
    args: {
        message: {
            id: Math.random(),
            text: 'Response 200 successfully fetched'
        }
    }
};

export const Error: Story = {
    args: {
        message: {
            id: Math.random(),
            text: 'Error occurred while fetching the data'
        }
    }
};
