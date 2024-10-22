import GameObject from './core/gameObject.ts';
import Camera from './core/camera.ts';
import { Vector3 } from './utils/math.ts';
import { Renderer } from './renderer/renderer.ts';
import Mesh from './core/mesh.ts';
import Scene from './core/scene.ts';
import { Input } from './utils/input.ts';
import { Clock } from './core/clock.ts';


const r = new Renderer(document.querySelector('canvas')!);

const camera = new Camera('main')
    .setPosition(0, 0, -6);

const cube = new GameObject('cube')
    .setPosition(1, 0, 0)
    .setMesh(Mesh.Cube());

const pyramid = new GameObject('pyramid', new Vector3(-1, 0, 0))
    .setPosition(-1, 0, 0)
    .setMesh(Mesh.Pyramid());

const scene = new Scene(cube, pyramid);
const input = new Input();
const clock = new Clock();

let dT: number;
function draw() {
    dT = clock.getDelta();

    cube.rotate(0, 100 * dT, 0);
    pyramid.rotate(0, 100 * -dT, 0);

    cube.setPosition(1, Math.sin(10 * dT), 0);
    pyramid.setPosition(-1, Math.cos(10 * dT), 0);

    camera.rotate(Vector3.scale(input.rotation, dT * 80));
    camera.translate(Vector3.scale(input.movement, dT * 10));

    r.render(scene, camera);
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)