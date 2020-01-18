import React, { createRef } from 'react';
import { default as ReactIdleTimer } from 'react-idle-timer';
import { withRouterAndRef } from '../helpers';
import { RouteComponentProps } from 'react-router';

export class TimerEvent extends Event {
    public remaining = 0;
    constructor(remaining: number) {
        super('timer');
        this.remaining = remaining;
    }
}

export class IdleEvent extends Event {
    constructor() {
        super('idle');
    }
}


interface IdleTimerProps extends RouteComponentProps {
    timeout: number
    redirectTo?: string
    onTimer?: (event: TimerEvent) => void
    onIdle?: (event: IdleEvent) => void
}

class IdleTimer extends React.Component<IdleTimerProps> {
    private ref = createRef<ReactIdleTimer>()
    private timer: NodeJS.Timeout | undefined = undefined;

    handleOnAction(e: Event) {
        if (!this.timer) {
            const { onTimer } = this.props;
            this.timer = setInterval(() => {
                if (onTimer) {
                    if (this.ref.current) {
                        const remaining = this.ref.current.getRemainingTime();
                        onTimer(new TimerEvent(remaining));
                    }
                }
            }, 1000);
        }
    }

    handleOnActive(e: Event) {
    }

    handleOnIdle(e: Event) {
        const { location, redirectTo, history, onTimer, onIdle } = this.props;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
            onTimer && onTimer(new TimerEvent(0));
        }

        onIdle && onIdle(new IdleEvent());

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
                ref={this.ref}
                element={document}
                onActive={(e) => this.handleOnActive(e)}
                onIdle={(e) => this.handleOnIdle(e)}
                onAction={(e) => this.handleOnAction(e)}
                debounce={250}
                timeout={this.props.timeout}
            >
                {this.props.children}
            </ReactIdleTimer>
        );

    }

    reset() {
        if (this.ref.current) {
            this.ref.current.reset();
        }
    }

}

export default withRouterAndRef(IdleTimer);
