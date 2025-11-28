let t = 0; // 시간
let talk = false; // 말하기
let mouthMode = 0; // 0: 기본, 1: 웃기, 2: 찡긋
let mouthW = 90; // 입 너비
let blinkStart = -1; // 깜빡임 시작(ms)
let blinkDur = 150; // 깜빡임 길이(ms)

let eyeLX = 150,
  eyeLY = 170,
  eyeLW = 50,
  eyeLH = 40;
let eyeRX = 250,
  eyeRY = 170,
  eyeRW = 50,
  eyeRH = 40;

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
}

function draw() {
  background(220);

  fill(255, 224, 189);
  noStroke();
  ellipse(200, 200, 220, 250);

  // 머리
  fill(0);
  arc(200, 170, 200, 200, PI + PI / 6, TWO_PI - PI / 6, CHORD);
  ellipse(200, 50, 80, 80);

  //눈썹
  fill(0);
  for (let i = 0; i < 2; i++) {
    let bx = 130 + i * 90;
    rect(bx, 130, 50, 10, 6);
  }

  // 눈(흰자)
  fill(255);
  ellipse(eyeLX, eyeLY, eyeLW, eyeLH);
  ellipse(eyeRX, eyeRY, eyeRW, eyeRH);

  // 동공
  drawPupil(eyeLX, eyeLY, eyeLW, eyeLH);
  drawPupil(eyeRX, eyeRY, eyeRW, eyeRH);

  // 속눈썹
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < 3; i++) {
    let x = 130 + i * 15;
    line(x, 155, x - 10 + i * 2, 140);
  }
  for (let i = 0; i < 3; i++) {
    let x = 230 + i * 20;
    line(
      x,
      155 - (i === 1 ? 5 : 0),
      x + (i === 1 ? 0 : 10),
      140 - (i === 1 ? 5 : 0)
    );
  }

  // 코
  noStroke();
  fill(200, 200, 100);
  triangle(200, 180, 190, 220, 210, 220);

  // 볼
  fill(255, 100, 100, 150);
  ellipse(120, 220, 55, 50);
  ellipse(280, 220, 55, 50);

  drawBlink(eyeLX, eyeLY, eyeLW, eyeLH);
  drawBlink(eyeRX, eyeRY, eyeRW, eyeRH);

  // ---------- 입 ----------
  t += 0.02;
  let s = (sin(t) + 1) / 2;
  let mouthY = 260;
  let minH = 0;
  let maxH = 45;
  let mouthH = minH + (maxH - minH) * s;

  switch (mouthMode) {
    case 1: //웃기
      stroke(0);
      strokeWeight(3);
      noFill();
      arc(200, mouthY, mouthW, 60, 0, PI);
      break;
    case 2: // 찡그리기
      stroke(0);
      strokeWeight(3);
      noFill();
      arc(200, mouthY + 30, mouthW, 50, PI, TWO_PI);
      break;
    default:
      if (talk) {
        //말하기
        noStroke();
        fill(180, 0, 0);
        ellipse(200, mouthY + 10, 40, 40);
      } else {
        //기본 입
        stroke(0);
        strokeWeight(3);
        noFill();
        arc(200, mouthY, mouthW, mouthH, 0, PI);
      }
  }
}

function drawPupil(cx, cy, w, h) {
  let dx = mouseX - cx;
  let dy = mouseY - cy;
  let rx = w * 0.22;
  let ry = h * 0.22;
  let mag = sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry));
  if (mag < 1) mag = 1;
  let px = cx + dx / mag;
  let py = cy + dy / mag;

  fill(0);
  noStroke();
  ellipse(px, py, 20, 20);
}

function drawBlink(cx, cy, w, h) {
  if (blinkStart < 0) return;
  let elapsed = millis() - blinkStart;
  if (elapsed > blinkDur) {
    blinkStart = -1;
    return;
  }
  let p = elapsed / blinkDur;
  let k = p < 0.5 ? p * 2 : (1 - p) * 2;

  noStroke();
  fill(255, 224, 189);
  let cover = h * k;
  rect(cx - w / 2, cy - h / 2, w, cover);
  rect(cx - w / 2, cy + h / 2 - cover, w, cover);
}

function mousePressed() {
  blinkStart = millis();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      mouthMode = 1;
      break;
    case DOWN_ARROW:
      mouthMode = 2;
      break;
    case LEFT_ARROW:
      if (mouthW > 50) mouthW -= 10;
      break;
    case RIGHT_ARROW:
      if (mouthW < 140) mouthW += 10;
      break;
    default:
      if (key === " ") {
        talk = !talk;
      }
      if (key === "s") {
        //gif저장
        saveGif("mySketch", 10);
      }
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) mouthMode = 0;
}
