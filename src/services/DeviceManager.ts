import axios from 'axios';

class DeviceManager {

    public backlightIdleTimeout: number = 5*60;

    public enableBacklight() {
        axios.get('http://127.0.0.1:42424/screen_ON');

    }

}

export default DeviceManager;