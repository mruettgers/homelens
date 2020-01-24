import { observable, computed } from 'mobx';
import moment, { Moment } from "moment-timezone";

const timezone = 'Europe/Berlin';

export class Clock {
    private static _instance: Clock;

    @observable now: Moment;
    constructor() {
        this.now = moment().tz(timezone);
        setInterval(() => { this.now = moment().tz(timezone) }, 1000);
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

export default class ClockStore {

    @observable clock: Clock;
    constructor() {
        this.clock = Clock.Instance;
    }

    @computed get now() {
        return this.clock.now;
    }
}