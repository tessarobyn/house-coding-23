export const setCanvasSize = (canvas) => {
  canvas.width = window.innerWidth - 1;
  canvas.height = window.innerHeight - 1;
};

function getOffset(canvas) {
  const rect = canvas.getBoundingClientRect();
  return [rect.left + window.scrollX, rect.top + window.scrollY];
}

export function mouseDown(event, canvas) {
  const pos = getOffset(canvas);
  const mouseX = event.clientX - pos[0];
  const mouseY = event.clientY - pos[1];
  return [mouseX, mouseY];
}

export function randInt(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}

export function randFloat(num1, num2) {
  return Math.random() * (num2 - num1) + num1;
}
