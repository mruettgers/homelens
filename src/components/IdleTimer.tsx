import React, { createRef } from 'react';
import { default as ReactIdleTimer } from 'react-idle-timer';
import { withRouterAndRef } from './helpers';
import { RouteComponentProps, withRouter } from 'react-router';

interface IdleTimerProps extends RouteComponentProps {
    timeout?: number
    redirectTo?: string
}

class IdleTimer extends React.Component<IdleTimerProps> {
    private timer = createRef<ReactIdleTimer>()

    handleOnAction(e: Event) {
    }

    handleOnActive(e: Event) {
    }

    handleOnIdle(e: Event) {
        const { location, redirectTo, history } = this.props;
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
        );

    }
}

export default withRouter(IdleTimer);
