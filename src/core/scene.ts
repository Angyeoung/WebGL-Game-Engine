
import GameObject from './gameObject.ts';

export default class Scene {

    objects: GameObject[] = [];

    constructor(...objects: GameObject[]) {
        
        for (const object of objects) {
            this.add(object);
        }

    }

    add(object: GameObject) {
        this.objects.push(object);
    }

}
