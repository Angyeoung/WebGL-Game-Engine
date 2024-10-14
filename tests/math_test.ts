import { assertEquals } from "@std/assert";
import { Vector3, Matrix4 } from "../src/utils/math.ts";

const rand = (): number => Math.round(Math.random() * 100) - 50;

Deno.test(function mathTest() {
    const r = rand();
    const a = new Vector3(rand(), rand(), rand());
    const b = new Vector3(rand(), rand(), rand());

    assertEquals(a.add(b), new Vector3(a.x + b.x, a.y + b.y, a.z + b.z));
    assertEquals(a.sub(b), new Vector3(a.x - b.x, a.y - b.y, a.z - b.z));
    assertEquals(a.mul(r), new Vector3(a.x * r, a.y * r, a.z * r));
});
