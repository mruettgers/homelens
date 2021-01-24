import React from 'react';
import ClockStore from '../stores/ClockStore';
import ConfigStore from '../stores/ConfigStore';
import LayoutStore from '../stores/LayoutStore';

const configStore = new ConfigStore();
const clockStore = new ClockStore(configStore);
const layoutStore = new LayoutStore(configStore);

export const StoreContext = React.createContext({configStore, clockStore, layoutStore});

export const { Consumer: StoreConsumer, Provider: StoreProvider } = StoreContext;