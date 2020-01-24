import { observable } from 'mobx';


export default class WeatherStore {

    @observable openWeatherAPIKey?: String = undefined;
    
}