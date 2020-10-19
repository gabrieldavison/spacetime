export const colors = {
  light: getComputedStyle(document.documentElement).getPropertyValue(
    "--color-light"
  ),
  dark: getComputedStyle(document.documentElement).getPropertyValue(
    "--color-dark"
  ),
  accent: getComputedStyle(document.documentElement).getPropertyValue(
    "--color-accent"
  ),
};
console.log(colors);
