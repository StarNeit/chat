import type React from 'react';
import { Route } from 'react-router-dom';

export interface AppMenu {
  key: string;
  to?: string;

  target?: string;
  order?: number;
  title?: string;
  icon?: React.ReactNode;

  /**
   * Children Menu
   */
  submenu?: AppMenu[];
}

export type AppRoute = React.ComponentProps<typeof Route> & {
  key: string;
  menu?: AppMenu;
  routes?: AppRoute[];
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Channel = {
  id: string;
  name: string;
  private: boolean;
  createdAt: string;
};

export type CreateChannel = {
  name: string;
  private: boolean;
  password?: string;
};

export type DetailedChannel = Channel & {
  users: Array<{
    id: string;
    name: string;
  }>;
};

export type Message = {
  id: string;
  message: string;
  createdAt: string;
  userId: User;
};

export type ChannelInfo = {
  channel: DetailedChannel;
  total: number;
  last: Message[];
};
