import { assertEquals } from '@std/assert';
import { Matrix4, Vector3 } from '../src/utils/math.ts';

const rand = (): number => Math.round(Math.random() * 100) - 50;

Deno.test(function mathTest() {
    console.log(Matrix4.identity());
});
