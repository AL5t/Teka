export default function changeColorShade(hex, number) {
  if(!hex) {
    return "#fff";
  }
  let color = hex.startsWith("#") ? hex.slice(1) : hex;

  if(!number || !Number.isFinite(number)) {
    return "#" + color;
  }

  let r = parseInt(color.slice(0,2), 16);
  let g = parseInt(color.slice(2,4), 16);
  let b = parseInt(color.slice(4), 16);
  
  let newR = Math.min(255, Math.max(0, r + number));
  let newG = Math.min(255, Math.max(0, g + number));
  let newB = Math.min(255, Math.max(0, b + number));
  
  return "#" + newR.toString(16) + newG.toString(16) + newB.toString(16);
}