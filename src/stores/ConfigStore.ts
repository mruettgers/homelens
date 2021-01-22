import { observable } from 'mobx';
import Store from './Store';

interface BackendConfig {
    api: {
        websocket: {
            url: string
        }
    }
}

interface WeatherConfig {
    openWeather: {
        apiKey: string
    }
}

interface LocaleConfig {
    lang: String;
    timezone: String;
}

interface Config {
    backend: BackendConfig;
    weather: WeatherConfig;
    locale: LocaleConfig;
}

export default class ConfigStore extends Store {
    loaded: Boolean = false;

    @observable
    backend: BackendConfig = {
        api: { websocket: { url: "" } }
    }

    @observable
    weather: WeatherConfig = { openWeather: { apiKey: "" } }

    @observable
    locale: LocaleConfig = { lang: "de", timezone: "Europe/Berlin" }

    load(config: Config) {
        this.backend = { ...config.backend };
        this.weather = { ...config.weather };
        this.locale = { ...config.locale };
        this.loaded = true;
    }

}