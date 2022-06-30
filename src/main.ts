import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});
import { Car, getRandomColor, NeuralNetwork, Road, Visualizer } from "./app";
export default app;

const carCanvas = document.getElementById('carCanvas') as HTMLCanvasElement; //prettier-ignore
carCanvas.width = 200;
const btnBrainSave = document.getElementById('btnBrainSave') as HTMLElement; //prettier-ignore
export const btnBrainDiscard = document.getElementById('btnBrainDiscard') as HTMLElement; //prettier-ignore
const networkCanvas = document.getElementById('networkCanvas') as HTMLCanvasElement; //prettier-ignore
networkCanvas.width = 300;
const carCtx = carCanvas.getContext("2d") as CanvasRenderingContext2D;
export const networkCtx = networkCanvas.getContext('2d') as CanvasRenderingContext2D; //prettier-ignore
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9); // 0.9 reduces the width for showing road borders
const N = 100; // 100 cars going in parallel
const cars = generateCars(N);
let bestCar = cars[0]; // first car but it will update on every frame

if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i += 1) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i !== 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
}
const traffic: Car[] = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
];

function generateCars(N: number) {
  const cars = [];
  for (let i = 0; i <= N; i += 1) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
  }
  return cars;
}

btnBrainSave.addEventListener<"click">("click", () => {
  save(); // console.log("save");
});
btnBrainDiscard.addEventListener<"click">("click", () => {
  discard(); // console.log("discard");
});

// code to save the best car in local storage
function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}
function discard() {
  localStorage.removeItem("bestBrain");
}

function animate(time?: number): void {
  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].update(road.borders, []); // traffic to not damage itself
  }
  for (let i = 0; i < cars.length; i += 1) {
    cars[i].update(road.borders, traffic);
  }
  bestCar = cars.find(
    (c) => (c.y === Math.min(...cars.map((c) => c.y))) as boolean
  );
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  carCtx.save();
  const carPositionNearBottom = -1 * bestCar.y + (carCanvas.height * 70) / 100;
  carCtx.translate(0, carPositionNearBottom);
  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].draw(carCtx, "red");
  }
  carCtx.globalAlpha = 0.2; // decrease opacity of N=100 clone cars
  for (let i = 0; i < cars.length; i += 1) {
    cars[i].draw(carCtx, "blue"); /* draw car on the canvas in the DOM */
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true);
  carCtx.restore();
  networkCtx.lineDashOffset = (-1 * time) / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  requestAnimationFrame(animate);
}

animate();
