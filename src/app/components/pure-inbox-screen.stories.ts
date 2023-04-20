import type { Meta, StoryObj } from '@storybook/angular';

import { fireEvent, within } from '@storybook/testing-library';

import { importProvidersFrom } from '@angular/core';

import { moduleMetadata, applicationConfig } from '@storybook/angular';

import { CommonModule } from '@angular/common';

import PureInboxScreenComponent from './pure-inbox-screen.component';

import { Store, NgxsModule } from '@ngxs/store';
import { TasksState } from '../state/task.state';
import { TaskModule } from './task.module';

const meta: Meta<PureInboxScreenComponent> = {
  component: PureInboxScreenComponent,
  title: 'PureInboxScreen',
  // tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TaskModule],
      providers: [Store],
    }),
    applicationConfig({
      providers: [importProvidersFrom(NgxsModule.forRoot([TasksState]))],
    }),
  ],
};

export default meta;
type Story = StoryObj<PureInboxScreenComponent>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const WithInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulates pinning the first task
    await fireEvent.click(canvas.getByLabelText('pinTask-1'));
    // Simulates pinning the third task
    await fireEvent.click(canvas.getByLabelText('pinTask-3'));
  },
};
