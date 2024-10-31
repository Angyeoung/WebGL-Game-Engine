// https://github.com/mrdoob/three.js/blob/dev/src/core/EventDispatcher.js

type Listener = (ev: Event) => any;

export default class EventDispatcher {

    private listeners?: Map<string, Listener[]>;

    addEventListener(type: string, listener: Listener): void {

        if (this.listeners === undefined)
            this.listeners = new Map();

        if (this.listeners.get(type) === undefined)
            this.listeners.set(type, []);
        
        const listenerArray = this.listeners.get(type)!;

        if (listenerArray.indexOf(listener) === -1)
            listenerArray.push(listener);

    }


    hasEventListener(type: string, listener: Listener) {
        if (this.listeners === undefined) return false;
        const listenerArray = this.listeners.get(type);
        return listenerArray !== undefined && listenerArray.indexOf(listener) !== -1;
    }

    removeEventListener( type: string, listener: Listener ) {
        if ( this.listeners === undefined ) return;
        const listenerArray = this.listeners.get(type);

        if ( listenerArray !== undefined ) {

            const index = listenerArray.indexOf( listener );

            if ( index !== - 1 ) {

                listenerArray.splice( index, 1 );

            }

        }

    }
}
