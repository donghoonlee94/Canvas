const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// css 사이즈를 넣어줘야함.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 선 stroke color , 채우기 fill color 
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

// 선  size 
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}


function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // beginPath는 길을 시작하고, moveTo는 가는 길을 그리고 있는 것, 
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // lineTo는 마우스 위치에 lineTo를 하고, stroke를 줌으로 선을 그릴 수 있는 것.
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  console.log(event.target);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  // toDataURL image/jpeg 로도 가능, 기본은 png, 
  // href에 image URL이 들어가고, download는 파일 이름
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "CanvasJS";
  link.click();
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "채우기";
  } else {
    filling = true;
    mode.innerText = "선 그리기";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from은 Object를 Array로 변환. forEach로 각각의 아이템에게 Event를 줌.
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}