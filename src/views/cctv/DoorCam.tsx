import React from 'react';


class DoorCam extends React.Component {

    state = {
        url: "http://frontdoor1.live.cctv.home",
        loading: false
    }

    render() {
        return (
            <div>
                <img
                    width="100%"
                    src={this.state.url}
                    alt=""
                />
            </div>
        );

    }
}


export default DoorCam;