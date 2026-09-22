import Sketch from "./Sketch.js";
import Emotion from "./Emotion.js";

const canvasA = document.querySelector("#canvasA");
const canvasB = document.querySelector("#canvasB");

const emotions = {
  clarity: new Emotion("Clarity", "../img/clarity/", 4),
  overstimulation: new Emotion("Overstimulation", "../img/overstimulation/", 4),
  order: new Emotion("Order", "../img/order/", 4),
  chaos: new Emotion("Chaos", "../img/chaos/", 4),
  soft: new Emotion("Soft", "../img/soft/", 6),
  harsh: new Emotion("Harsh", "../img/harsh/", 6),
  calm: new Emotion("Calm", "../img/calm/", 4),
  agitated: new Emotion("Agitated", "../img/agitated/", 4),
  deep: new Emotion("Deep", "../img/deep/", 4),
  shallow: new Emotion("Shallow", "../img/shallow/", 4),
};

const CONFIG = {
  WIDTH: 400,
  HEIGHT: 600,
};

const PAIRS = {
  CLARITY_OVERSTIMULATION: 1,
  ORDER_CHAOS: 2,
  SOFT_HARSH: 3,
  CALM_AGITATED: 4,
  DEEP_SHALLOW: 5,
}

let currentEmotionA = emotions.clarity;
let currentEmotionB = emotions.overstimulation;
let titleA = document.querySelector("#card-title-a");
let titleB = document.querySelector("#card-title-b");

Object.values(emotions).forEach((emotion) => {
  emotion.loadImages();
});

document.querySelectorAll('input[name="emotion"]').forEach(input => {
  input.addEventListener("change", () => {
    switch (parseInt(input.value)) {
      case PAIRS.CLARITY_OVERSTIMULATION:
        updateCurrentEmotions(emotions.clarity, emotions.overstimulation);
        break;
      case PAIRS.ORDER_CHAOS:
        updateCurrentEmotions(emotions.order, emotions.chaos);
        break;
      case PAIRS.SOFT_HARSH:
        updateCurrentEmotions(emotions.soft, emotions.harsh);
        break;
      case PAIRS.CALM_AGITATED:
        updateCurrentEmotions(emotions.calm, emotions.agitated);
        break;
      case PAIRS.DEEP_SHALLOW:
        updateCurrentEmotions(emotions.deep, emotions.shallow);
        break;
    }
  });
});

function updateCurrentEmotions(emotionA, emotionB) {
  currentEmotionA = emotionA;
  currentEmotionB = emotionB;
  titleA.textContent = emotionA.title;
  titleB.textContent = emotionB.title;
}


const skA = new Sketch({
  canvas: canvasA,
  width: CONFIG.WIDTH,
  height: CONFIG.HEIGHT,
});

const skB = new Sketch({
  canvas: canvasB,
  width: CONFIG.WIDTH,
  height: CONFIG.HEIGHT,
});


skA.setup(() => {
  skA.canvas.style.borderRadius = "1rem";
});

skA.update((dt) => {
  dt = Math.min(dt, 1 / 30);
  currentEmotionA.update(dt);
});

skA.draw(() => {
  currentEmotionA.draw(skA);
});

skB.setup(() => {
  skB.canvas.style.borderRadius = "1rem";
});

skB.update((dt) => {
  dt = Math.min(dt, 1 / 30);
  currentEmotionB.update(dt);
});

skB.draw(() => {
  currentEmotionB.draw(skB);
});

window.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector(".nl-wrap");
  if (wrap) {
    wrap.style.display = "none";
  }
})