import "./style.scss";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error("failed to get 2d context");
}

// set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set canvas background to black
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// set circle radius to half the screen width
const CIRCLE_RADIUS = canvas.width / 8;
const CIRCLE_X = canvas.width / 2;
const CIRCLE_Y = canvas.height / 2;

// create 2 points on the circle, point A and point B
let pointA: { x: number; y: number };
let pointB: { x: number; y: number };

const speedA = 1;
let speedB: number;
const DEGREE_INTERVAL = 2; // degrees per frame
let degreeA: number;
let degreeB: number;

const setup = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  speedB =
    ((document.getElementById("speed") as HTMLInputElement)
      .value as unknown as number) || 1.5;
  ctx.beginPath();
  ctx.arc(CIRCLE_X, CIRCLE_Y, CIRCLE_RADIUS, 0, 2 * Math.PI);

  ctx.lineWidth = 1;
  ctx.strokeStyle =
    (document.getElementById("color") as HTMLInputElement)?.value || "#00ff41";
  ctx.stroke();

  // initial degrees
  degreeA = -90;
  degreeB = -90;
  pointA = getCirclePoint(degreeA);
  pointB = getCirclePoint(degreeB);
};
setup();

const drawLine = () => {
  ctx.beginPath();
  ctx.moveTo(pointA.x, pointA.y);
  ctx.lineTo(pointB.x, pointB.y);
  ctx.stroke();
};

var animating = false;
const toggleAnimation = () => {
  animating = !animating;
  if (animating) {
    animate();
  }
};

function getCirclePoint(dregrees: number) {
  // Convert degrees to radians
  const radian = degreesToRadians(dregrees);
  // Calculate the x-coordinate
  const x = CIRCLE_X + CIRCLE_RADIUS * Math.cos(radian);
  // Calculate the y-coordinate
  const y = CIRCLE_Y + CIRCLE_RADIUS * Math.sin(radian);
  // Return the coordinates as an object
  return { x, y };
}
function degreesToRadians(degrees: number) {
  const radians = (degrees % 360) * (Math.PI / 180);
  return radians;
}

function animate() {
  if (animating) {
    // call again next time we can draw
    requestAnimationFrame(animate);
  }
  // calculate the new position of point A on the circle

  pointA = getCirclePoint(degreeA);
  degreeA += speedA * DEGREE_INTERVAL;
  pointB = getCirclePoint(degreeB);
  degreeB += speedB * DEGREE_INTERVAL;

  drawLine();
}

const setupButton = document.getElementById("setup") as HTMLButtonElement;
setupButton.addEventListener("click", setup);
const switchButton = document.getElementById("switch") as HTMLButtonElement;
switchButton.addEventListener("click", toggleAnimation);
