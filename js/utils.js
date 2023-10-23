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
