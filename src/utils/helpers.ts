const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

/**
 * @function pickChakraRandomColor
 * @property {string} variant - define color gradient
 *  @return {string} - ChakraUI color
 */
export function pickChakraRandomColor(variant = ""): string {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color + variant;
}

/**
 * @function swap
 * @description props 3 variable to moving columns type section
 * @property {array} arr
 * @property {number} i
 * @property {number} j
 * @return {array}
 */
export function swap<T>(arr: T[], i: number, j: number): T[] {
  const copy = [...arr];
  const temp = copy[i];
  copy[i] = copy[j];
  copy[j] = temp;
  console.log(copy);
  return copy;
}
