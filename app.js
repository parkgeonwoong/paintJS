const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d")                         // MDN에 canvas 검색
const colors = document.querySelectorAll(".jsColor")        // 색 변경에 쓸 거
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")              // Fill btn
const saveBtn = document.querySelector("#jsSave")           // Save

// 자주 쓰는 것 지정
const INITIAL_COLOR = "2c2c2c"
const CANVAS_SIZE = '700';

// js는 html canvas element 가져올 때 css에서 지정한 width, height는 받아오지 않는다. 그래서 크기 정해줌
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = 'white'                     // 저장할 때 처음에 투명색 배경 버그 고치기 위한
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR              // 처음 그림 시작 시 색깔
ctx.fillStyle = INITIAL_COLOR;              // 색, 스타일 모양을 지정
ctx.lineWidth = 2.5;                        // 시작할떄 선 굵기 

    // Filling Mode 
// ctx.fillStyle = "green"
// ctx.fillRect(50, 20, 100, 49)

let painting = false;
let filling = false;


//painting이 멈출 때 쓸라고 만드는 함수
function stopPainting() {       
    painting = false
}

function startPainting() {
    painting = true;
}

// 1. x,y 좌표 & 선 그리기
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

// 2. 색을 클릭시 바꾸는 함수
function handleColorClick(event) {
    // console.log(event.target.style)
    const color = event.target.style.backgroundColor
    // console.log(color)
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle
}

// 3. 선의 굵기 
function handleRangeChange(event) {
    // console.log(event.target.value)
    const size = event.target.value
    ctx.lineWidth = size
}

// 4. FILL 버튼 기능
function handleModeClick() {
    if(filling === true) {
        filling = false
        mode.innerText = "Fill"
    } else {
        filling = true
        mode.innerText = "Paint"
    }
}

// 5. 캔버스에 fill 채우기 위한 함수
function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

// 6. 우클릭 방지 함수
function handleRightControl(event) {
    event.preventDefault()
}

// 7. Save 버튼의 저장하는 기능
function handleSaveClick() {
    const image = canvas.toDataURL("image/jped")
    // const image = canvas.toDataURL()  아무것도 없으면 PNG
    // console.log(image)
    const link = document.createElement("a")
    link.href = image;
    link.download = "👉PaintJS[EXPORT]";                          // download는 a태그의 속성 이름을 가져와야 한다
    link.click()
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)     // 마우스가 캔버스에서 나가게 되면 paingting false 설정
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleRightControl) // 우클릭 
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

// Save Button
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}