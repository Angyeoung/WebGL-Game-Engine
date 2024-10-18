import { assertEquals } from '@std/assert';
import { Matrix4, Vector3 } from '../src/utils/math.ts';

const rand = (): number => Math.round(Math.random() * 100) - 50;

Deno.test(function mathTest() {
    const r = rand();
    const a = new Vector3(rand(), rand(), rand());
    const b = new Vector3(rand(), rand(), rand());

    assertEquals(
        Vector3.add(a, b),
        new Vector3(a.x + b.x, a.y + b.y, a.z + b.z),
    );
    assertEquals(
        Vector3.sub(a, b),
        new Vector3(a.x - b.x, a.y - b.y, a.z - b.z),
    );
    assertEquals(Vector3.scale(a, r), new Vector3(a.x * r, a.y * r, a.z * r));
});
