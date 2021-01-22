import React from 'react';
import ClockStore from '../stores/ClockStore';
import ConfigStore from '../stores/ConfigStore';

const configStore = new ConfigStore();
const clockStore = new ClockStore(configStore);

export const StoreContext = React.createContext({configStore, clockStore});

export const { Consumer: StoreConsumer, Provider: StoreProvider } = StoreContext;