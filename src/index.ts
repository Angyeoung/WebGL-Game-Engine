import GameObject from './core/gameObject.ts';
import Camera from './core/camera.ts';
import { Vector3 } from './utils/math.ts';
import { Renderer } from './renderer/renderer.ts';
import Mesh from './core/mesh.ts';
import Scene from './core/scene.ts';


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



function draw(time: number) {

    cube.setRotation(0, time / 10, 0);
    pyramid.setRotation(0, -time / 10, 0);

    cube.setPosition(1, Math.sin(time / 1000), 0);
    pyramid.setPosition(-1, Math.cos(time / 1000), 0);

    r.render(scene, camera);
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)