import { Matrix, Vector } from "./math.js";

/**
 * Generates a random number from a standard normal distribution using the Box-Muller transform.
 * @returns {number} A random number sampled from a standard normal distribution.
 */
export function randnBm() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Avoid zeros
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Creates an n-dimensional matrix with values generated by a function.
 * @param {number[]} lengths - An array of numbers representing the dimensions of the resulting matrix.
 * @param {() => number} fn - A function that returns a number, used to populate the matrix.
 * @returns {Matrix|Vector} An n-dimensional matrix or vector filled with values generated by the function `fn`.
 */
export function createNDArray(lengths, fn) {
    function helper(lengths, depth) {
        const len = lengths[depth];
        if (depth === lengths.length - 1) {
            const arr = Array.from({ length: len }, () => fn());
            return new Vector(...arr);
        } else {
            const arr = Array.from({ length: len }, () => helper(lengths, depth + 1));
            return new Matrix(...arr);
        }
    }
    return helper(lengths, 0);
}

/**
 * Generates an n-dimensional array (or matrix) of random numbers from a standard normal distribution.
 * @param  {...number} dims Dimensions of the matrix to generate.
 * @returns { Matrix|Vector } A matrix or vector filled with random numbers.
 */
export function randn(...dims) {
    if (dims.length === 0) {
        return randnBm();  // Return a single random number if no dimensions provided
    }
    return createNDArray(dims, randnBm);
}