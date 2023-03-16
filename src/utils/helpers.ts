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

export function pickChakraRandomColor(variant: string = "") {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color + variant;
}

export function swap<T>(arr: T[], i: number, j: number) {
  const copy = [...arr];
  const temp = copy[i];
  copy[i] = copy[j];
  copy[j] = temp;

  return copy;
}
