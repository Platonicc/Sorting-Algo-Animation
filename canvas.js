var canvas = document.getElementById("screen");
var startBtn = document.getElementById("start_btn");
var generateBtn = document.getElementById("generate_btn");

var c = canvas.getContext("2d");

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

//-----------------------------------------------------------------------------------------------------

var barWidth = 0;

var Bar = function (x, y, value, weight, color) {
  this.x = x;
  this.y = y;
  this.value = value;
  this.weight = weight;
  this.color = color;

  this.draw = function () {
    console.log(`${this.x} ${this.y} ${this.weight} ${this.color} ${barWidth}`);
    c.beginPath();
    c.fillRect(this.x, this.y, barWidth, this.weight);
    c.fillStyle = this.color;
    c.fill();
  };
};

var values = [];
var barsList = [];
var adjPercent;

var getRandom = (min, max) => min + Math.random() * (max - min);
var calculateBarWidth = () => (barWidth = canvas.width / values.length);

var getWeight = (value) => {
  return value - value * (adjPercent / 100);
};

function calculateAdjPercent() {
  var max = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }
  if (max > canvas.height) adjPercent = ((max - canvas.height) / max) * 100;
  else adjPercent = 0;
  console.log("Max: " + max);
  console.log("Adj: " + adjPercent);
}

function renderBars() {
  for (let i = 0; i < values.length; i++) {
    var obj = new Bar(
      barWidth * i,
      canvas.height,
      values[i],
      -getWeight(values[i]),
      `rgba(${Math.round(getRandom(50, 255))}, ${Math.round(
        getRandom(50, 255)
      )}, ${Math.round(getRandom(50, 255))}, 1)`
    );
    barsList.push(obj);
    obj.draw();
  }
  console.log(barsList);
}

function generateRandomValues() {
  for (let i = 0; i < 100; i++) {
    values.push(Math.round(getRandom(1, 1000)));
  }

  calculateBarWidth();
  calculateAdjPercent();
  console.log(barWidth);

  renderBars();
  console.log(values);
}

generateBtn.addEventListener("click", function () {
  generateRandomValues();
});

startBtn.addEventListener("click", function () {
  //   c.fillStyle = "#FFFFFF";
  //   c.fillRect(0, 615, 10, -75);
});
