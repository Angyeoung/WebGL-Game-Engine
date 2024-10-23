import GameObject from './core/gameObject.ts';
import Camera from './core/camera.ts';
import { Vector3, Matrix4 } from './utils/math.ts';
import { Renderer } from './renderer/renderer.ts';
import Mesh from './core/mesh.ts';
import Scene from './core/scene.ts';
import { Input } from './utils/input.ts';
import { Clock } from './core/clock.ts';


const r = new Renderer(document.querySelector('canvas')!);

const camera = new Camera('main').setPosition(0, 2, -6);
const cube = new GameObject('cube').setMesh(Mesh.Cube());
const pyramid = new GameObject('pyramid', new Vector3(-1, 0, 0)).setMesh(Mesh.Pyramid());
const floor = new GameObject('floor').setMesh(Mesh.Plane()).setScale(10, 1, 10);

const scene = new Scene(cube, pyramid, floor);
const input = new Input();
const clock = new Clock();

let dT: number, eT: number;
function draw() {
    dT = clock.getDelta();
    eT = clock.elapsedTime;

    cube.rotate(0, 90 * dT, 0);
    pyramid.rotate(0, 90 * -dT, 0);

    cube.setPosition(1, Math.sin(2 * eT) + 1.5, 0);
    pyramid.setPosition(-1, Math.cos(2 * eT) + 1.5, 0);

    camera.rotate(Vector3.scale(input.rotation, dT * 80));
    movePlayer(dT);

    r.render(scene, camera);
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw);



function movePlayer(t: number): void {

    if (!(input.movement.x !== 0 || input.movement.z !== 0 || input.movement.z !== 0))
        return;

    const speed = 10;
    const nml = Vector3.normalize(input.movement);
    const dir = Vector3.transform(nml, Matrix4.rotate(Matrix4.identity(), camera.rotation))

    camera.translate(Vector3.scale(dir, t * speed));

}