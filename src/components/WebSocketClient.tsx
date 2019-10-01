import React, { PropsWithChildren } from 'react';

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
    private reconnecting = false;

    constructor(props: PropsWithChildren<WebSocketClientProps>) {
        super(props)
        this.initWebSocket();
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
        this.socket = undefined;
        this.reconnectWebSocket();
    }

    handleOnError(ev: Event) {
        console.log('Error: ', ev);
    }

    handleOnEvent(ev: WebSocketClientEvent) {
        const { onEvent } = this.props;
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

    async initWebSocket(){
        this.socket = await this.connectWebSocket();
    } 

    reconnectWebSocket() {
        if (this.reconnecting) {
            console.log('Already reconnecting, will abort reconnect.');
            return;
        }
        const { delay = 5 } = this.props;
        this.reconnecting = true;

        setTimeout(async () => {
            try{
                this.socket = await this.connectWebSocket();
            } 
            catch (e){} 
            this.reconnecting = false;
        }, delay * 1000);
    }

    async connectWebSocket() {
        const { url } = this.props;
        console.log(`Connecting to ${url}.`);
        const socket = new WebSocket(url);
        socket.onclose = (ev) => this.handleOnClose(ev);
        socket.onerror = (ev) => this.handleOnError(ev);
        socket.onmessage = (message) => this.handleOnMessage(message);
        return socket;
    }

    render() {
        return <React.Fragment>
            {this.props.children}
        </React.Fragment>
    }
}


export default WebSocketClient;