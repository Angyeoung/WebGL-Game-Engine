import GameObject from './core/gameObject.ts';
import Camera from './core/camera.ts';
import { Vector3 } from './utils/math.ts';
import { Renderer } from './renderer/renderer.ts';


const r = new Renderer(document.querySelector('canvas')!);
const camera = new Camera('main');
const cube = new GameObject('coob').addMesh();

camera.setPosition(new Vector3(0, 1, -5));

r.enableAutoResizing(1);

function draw(time: number) {
    
    cube.setRotation(new Vector3(0, time / 50, 0));
    
    r.render(cube, camera);
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)