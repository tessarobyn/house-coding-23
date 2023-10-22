import { setCanvasSize } from "./utils.js";

const canvas = document.getElementById("gameCanvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(31, 35, 51)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
