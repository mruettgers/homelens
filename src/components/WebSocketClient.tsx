import React, { PropsWithChildren } from 'react'

export class WebSocketClientEvent {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}

interface WebSocketClientProps {
    url: string;
    reconnect?: boolean;
    delay?: number;
    parseJSON?: boolean;
    onMessage?: (event: MessageEvent) => void
    onEvent?: (event: WebSocketClientEvent) => void
}



class WebSocketClient extends React.Component<WebSocketClientProps> {

    private socket?: WebSocket;

    constructor(props: PropsWithChildren<WebSocketClientProps>) {
        super(props)


        this.connectWebSocket();
    }

    handleOnMessage(message: MessageEvent) {
        const { onMessage } = this.props;
        if (onMessage) {
            onMessage(message);
        }
        this.parseAndProcessMessage(message);
    }

    handleOnClose(ev: CloseEvent) {
        console.log('Close: ', ev);
        this.reconnectWebSocket();
    }

    handleOnError(ev: Event) {
        console.log('Error: ', ev);
        this.reconnectWebSocket();
    }

    handleOnEvent(ev: WebSocketClientEvent) {
        const {onEvent} = this.props;
        if (onEvent) {
            onEvent(ev);
        }
    }

    parseAndProcessMessage(message: MessageEvent) {
        try {
            const parsed = JSON.parse(message.data);
            const { type } = parsed;
            switch (type) {
                case 'event': const { name } = parsed;
                    this.handleOnEvent(new WebSocketClientEvent(name));
                    break;

            }
        }
        catch (e) {
            console.log('Error while parsing message.', message);
        }
    }


    reconnectWebSocket() {
        const { delay = 5 } = this.props;
        console.log(`Reconnecting in ${delay} seconds.`)
        setTimeout(() => this.connectWebSocket(), delay * 1000);
    }

    connectWebSocket() {
        const { url } = this.props;
        console.log(`Connecting to ${url}.`);
        this.socket = new WebSocket(url);
        this.socket.onclose = (ev) => this.handleOnClose(ev);
        this.socket.onerror = (ev) => this.handleOnError(ev);
        this.socket.onmessage = (message) => this.handleOnMessage(message);
    }

    render() {
        return <React.Fragment>
            {this.props.children}
        </React.Fragment>
    }
}


export default WebSocketClient;