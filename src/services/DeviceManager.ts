import axios from 'axios';

class DeviceManager {

    public backlightIdleTimeout: number = 600000;

    public enableBacklight() {
        axios
            .get('http://127.0.0.1:42424/screen_ON')
            .then()
            .catch(e => {
                // Probably not an ambiHome panel or in dev mode
            });
    }

}

export default DeviceManager;