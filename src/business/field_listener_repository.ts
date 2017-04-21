export interface FieldListenerRepository {
    subscribe(field: string, callback: (value: any) => void): Listener;
    unsubscribe(toBeUnsubscribedListener: Listener);
    trigger(field: string, value: any);
}

export interface Listener {
    id: number;
    field: string;
    callback: (value: any) => void;
}

export class FieldListenerRepositoryImpl implements FieldListenerRepository {

    private listeners: { [field: string]: Listener[] } = {};

    private index = 1;

    public subscribe(field: string, callback: (value: any) => void): Listener {
        if (typeof this.listeners[field] === 'undefined') {
            this.listeners[field] = [];
        }
        const listener = {
            id: this.index++,
            field: field,
            callback: callback
        };
        this.listeners[field].push(listener);

        return listener;
    }

    public unsubscribe(toBeUnsubscribedListener: Listener) {
        if (typeof this.listeners[toBeUnsubscribedListener.field] === 'undefined') {
            throw new Error('Trying to unregister a listener for a field that is not registered');
        }
        this.listeners[toBeUnsubscribedListener.field] = this
            .listeners[toBeUnsubscribedListener.field]
            .filter(listener => listener.id !== toBeUnsubscribedListener.id);
    }

    public trigger(field: string, value: any) {
        if (typeof this.listeners[field] !== 'undefined') {
            this.listeners[field].forEach(listener => listener.callback(value));
        }
    }

    public getFieldListenersForFieldName(field: string): Array<(value: any) => void> | undefined {
        const listeners = this.listeners[field];
        if (typeof listeners !== 'undefined') {
            return listeners.map(fieldListener => fieldListener.callback);
        }
    }
}