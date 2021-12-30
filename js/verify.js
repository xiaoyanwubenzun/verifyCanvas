let canvas = document.querySelector(".canvas");
let block = document.querySelector(".block");
let saber = document.querySelector(".saber");
let canvas_ctx = canvas.getContext("2d");
let block_ctx = block.getContext("2d");
let c_x = parseInt(Math.random() * 100 + 150), b_x = c_x, y = parseInt(Math.random() * 100 + 20), w = 42, r = 10, PI = Math.PI;
let move = false;
function drawBackground() {
	let img = document.createElement("img")
	img.onload = function () {
		canvas_ctx.drawImage(img, 0, 0, 310, 155)
		block_ctx.drawImage(img, 0, 0, 310, 155)
	};
	img.src = "../img/img.jpg";
}
function drawCircle(ctx, op, x) {
	ctx.beginPath()
	ctx.moveTo(x, y)
	ctx.lineTo(x + w / 2, y)
	// 上邊和右邊突出圓
	ctx.arc(x + w / 2, y - r + 2, r, 0, 2 * PI) //
	ctx.lineTo(x + w / 2, y)
	ctx.lineTo(x + w, y)
	ctx.lineTo(x + w, y + w / 2)
	ctx.arc(x + w + r - 2, y + w / 2, r, 0, 2 * PI) //
	ctx.lineTo(x + w, y + w / 2)
	ctx.lineTo(x + w, y + w)
	ctx.lineTo(x, y + w)
	ctx.lineTo(x, y)
	// 一個裁剪一個填充
	ctx[op]()
	// 左邊空缺半圓
	ctx.beginPath()
	ctx.arc(x, y + w / 2, r, 1.5 * PI, 0.5 * PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
	ctx.globalCompositeOperation = "xor"
	ctx.fillStyle = "#fff"
	ctx.fill()
}
drawCircle(block_ctx, "clip", b_x)
drawCircle(canvas_ctx, "fill", c_x)
drawBackground();
function downSaber(event) {
	move = true;
}
function moveSaber(event) {
	let saber_rect_left_distance, real_distance, block_left;
	if (move) {
		saber_rect_left_distance = document.querySelector(".saber-rect").getBoundingClientRect().left;
		real_distance = event.pageX - saber_rect_left_distance;
		if (30 < real_distance <= 250) {
			saber.style.marginLeft = real_distance - 30 + "px";
			block.style.left = -155 + real_distance - 30 + "px";
		}
		if (real_distance > 270) {
			saber.style.marginLeft = "246px"
		}
		if (real_distance < 30) {
			saber.style.marginLeft = "0"
		}
	}
}
function upSaber() {
	move = false;
	if (Math.abs(block.style.left.slice(0, -2)) < 2) {
		alert("验证通过")
	}
}
saber.addEventListener("mousedown", downSaber);
saber.addEventListener("mousemove", moveSaber);
saber.addEventListener("mouseup", upSaber);