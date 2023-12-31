export function getRandomColor() {
  const getDarkShade = () => Math.floor(Math.random() * 128); // Limiting the range to create darker shades (0-127)

  const red = getDarkShade();
  const green = getDarkShade();
  const blue = getDarkShade();

  const color = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return color;
}
