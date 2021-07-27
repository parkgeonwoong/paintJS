const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d")                         // MDN에 canvas 검색
const colors = document.querySelectorAll(".jsColor")        // 색 변경에 쓸 거
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")              // Fill btn


// js는 html canvas element 가져올 때 css에서 지정한 width, height는 받아오지 않는다. 그래서 크기 정해줌
canvas.width = 700;
canvas.height = 700;
// canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.strokeStyle = "#2c2c2c"                 // 처음 그림 시작 시 색깔
ctx.lineWidth = 2.5;                        // 시작할떄 선 굵기 

let painting = false;
let filling = false;


//painting이 멈출 때 쓸라고 만드는 함수
function stopPainting() {       
    painting = false
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // console.log(event) 이렇게 해서 event의 메소드 찾기
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){             // 경로를 만든다.
        ctx.beginPath()                     // 선을 그릴떄 시작하는 함수    path == line
        ctx.moveTo(x, y)                    // 선의 시작점
    } else {                   // 그린다.
        ctx.lineTo(x, y);                   // 선의 끝점
        ctx.stroke()                        // 현재까지 설정한 그림들을 그리는 함수
    }
}


function handleColorClick(event) {
    // console.log(event.target.style)
    const color = event.target.style.backgroundColor
    // console.log(color)
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value)
    const size = event.target.value
    ctx.lineWidth = size
}

function handleModeClick() {
    if(filling === true) {
        filling = false
        mode.innerText = "Fill"
    } else {
        filling = true
        mode.innerText = "Paint"
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)     // 마우스가 캔버스에서 나가게 되면 paingting false 설정
}

// Changing Color 
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)) 


// Brush Size
if(range) {
    range.addEventListener("input", handleRangeChange)
}

if(mode) {
    mode.addEventListener("click", handleModeClick)
}