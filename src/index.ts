import GameObject from './core/gameObject.ts';
import Camera from './core/camera.ts';
import { Vector3 } from './utils/math.ts';
import { Renderer } from './renderer/renderer.ts';
import Mesh from './core/mesh.ts';
import Scene from './core/scene.ts';


const r = new Renderer(document.querySelector('canvas')!);
const camera = new Camera('main');
const coob = new GameObject('coob').setMesh(Mesh.Cube());
const pymid = new GameObject('pymid').setMesh(Mesh.Pyramid());
const scene = new Scene(coob, pymid);

camera.setPosition(new Vector3(0, 0, -6));
coob.setPosition(new Vector3(1, 0, 0));
pymid.setPosition(new Vector3(-1, 0, 0));

function draw(time: number) {
    
    
    coob.setRotation(new Vector3(0, time / 10, 0));
    pymid.setRotation(new Vector3(0, -time / 10, 0));
    // camera.setPosition(new Vector3(Math.sin(time/500) * 10, 1, Math.cos(time/500) * 10));

    r.render(scene, camera);
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)