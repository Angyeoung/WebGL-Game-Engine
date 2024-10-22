import { Vector3 } from './math.ts';

export class Input {
    
    movement: Vector3;
    rotation: Vector3;

    constructor() {
        this.movement = Vector3.zero;
        this.rotation = Vector3.zero;
        document.addEventListener('keydown', (e) => this.onKey(e));
        document.addEventListener('keyup', (e) => this.onKey(e));
    }

    private onKey(e: KeyboardEvent) {
        const isDown = e.type === 'keydown';
        switch (e.key) {
            case 'w': case 'W':
                this.movement.z = isDown ? 1 : 0; break;
            case 's': case 'S':
                this.movement.z = isDown ? -1 : 0; break;
            case 'a': case 'A':
                this.movement.x = isDown ? -1 : 0; break;
            case 'd': case 'D':
                this.movement.x = isDown ? 1 : 0; break;
            case 'ArrowUp':
                this.rotation.x = isDown ? 1 : 0; break;
            case 'ArrowDown':
                this.rotation.x = isDown ? -1 : 0; break;
            case 'ArrowLeft':
                this.rotation.y = isDown ? -1 : 0; break;
            case 'ArrowRight':
                this.rotation.y = isDown ? 1 : 0; break;
        }
    }

    
}