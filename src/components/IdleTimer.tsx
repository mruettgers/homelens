import React, { createRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { default as ReactIdleTimer } from 'react-idle-timer';

interface IdleTimerProps extends RouteComponentProps {
    redirectTo?: string
    timeout?: number
    /*
    onAction?: (e: Event) => void
    onActive?: (e: Event) => void
    onIdle?: (e: Event) => void
    */
}


class IdleTimer extends React.Component<IdleTimerProps> {
    private timer = createRef<ReactIdleTimer>()


    handleOnAction(e: Event) {
    }

    handleOnActive(e: Event) {
    }

    handleOnIdle(e: Event) {
        const {location, redirectTo, history} = this.props;
        if (!location || !redirectTo) {
            return;
        } 

        if (location.pathname === redirectTo) {
            return;
        }
        history.push(redirectTo);
    }

    render() {
        return (
            <div>
                <ReactIdleTimer
                    ref={this.timer}
                    element={document}
                    onActive={(e) => this.handleOnActive(e)}
                    onIdle={(e) => this.handleOnIdle(e)}
                    onAction={(e) => this.handleOnAction(e)}
                    debounce={250}
                    timeout={this.props.timeout || (1000 * 60 * 3)}
                >
                    {this.props.children}
                </ReactIdleTimer>
            </div>
        );

    }
}


export default withRouter(IdleTimer);