class PresenceEvent extends Event {

    public readonly location: string;

    constructor(location: string) {
        super('presence');
        this.location = location;
    }

}

export default PresenceEvent;