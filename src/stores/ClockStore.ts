import { observable, computed } from 'mobx';
import moment, { Moment } from 'moment-timezone';
import 'moment/locale/de';
import ConfigStore from './ConfigStore';
import Store from './Store';

export class Clock {
    private static _instance: Clock;

    @observable now: Moment;
    locale: string = 'de';
    timezone: string = "Europe/Berlin";

    constructor() {
        this.now = moment().locale(this.locale).tz(this.timezone);
        setInterval(() => { this.now = moment().locale(this.locale).tz(this.timezone) }, 1000);
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

export default class ClockStore extends Store {

    @observable clock: Clock;

    configStore: ConfigStore;

    constructor(configStore: ConfigStore) {
        super();
        this.configStore = configStore;
        this.clock = Clock.Instance;
    }

    @computed get now() {
        return this.clock.now;
    }
}