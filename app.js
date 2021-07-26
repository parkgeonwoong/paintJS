const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d")         // MDN에 canvas 검색

ctx.strokeStyle = "#2c2c2c"                 // 처음 그림 시작 시 색깔
ctx.lineWidth = 2.5;                        // 시작할떄 선 굵기 

let painting = false;

//painting이 멈출 때 쓸라고 만드는 함수
function stopPainting() {       
    painting = false
}

function startPainting() {
    painting = true;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){                          // 선을 그릴때 시작점 그리고 선을 그린다.
        ctx.beginPath()
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y);
        ctx.stroke()
    }
}

function onMouseDown(event) {
    // console.log(event)
    painting = true;
}



if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)     // 마우스가 캔버스에서 나가게 되면 paingting false 설정
}