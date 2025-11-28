// 전역 변수들
let bodyColor;
let targetBodyColor;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);

  // HSB 색상 모드로 변경 (색상 변화를 쉽게 하기 위해)
  colorMode(HSB, 360, 100, 100);

  // 처음 몸통 색과 목표 색 설정
  bodyColor = color(0, 80, 90); // 빨강 계열
  targetBodyColor = color(200, 80, 90); // 파랑 계열
}

function draw() {
  // 시간 값 (초 단위)
  let t = millis() * 0.001;

  // 배경은 살짝 밝은 하늘색 느낌
  background(200, 20, 95);

  // --------------------------
  // 1. 기본 애니메이션 (위아래로 살짝 움직임)
  // --------------------------
  // sin과 frameCount / millis 모두 사용
  let bobY = sin(t * 2.0) * 8; // 위아래로  -8 ~ +8 픽셀 흔들림

  // 눈이 좌우로 살짝 움직이도록 cos 사용
  let eyeOffsetX = cos(t * 2.5) * 3;

  // 코 크기 변화 (숨 쉬는 느낌)
  let noseScale = map(sin(t * 3.0), -1, 1, 0.85, 1.15);

  // --------------------------
  // 2. 색상 변화 (몸통 색이 천천히 바뀜)
  //    colorMode, lerpColor, random 사용
  // --------------------------
  // 일정 주기마다(대략 2초) 새로운 랜덤 목표 색 생성
  if (frameCount % 120 === 0) {
    targetBodyColor = color(random(360), 80, 90); // random으로 새로운 색상(hue) 선택
  }
  // 현재 색에서 목표 색으로 조금씩 섞어가기
  bodyColor = lerpColor(bodyColor, targetBodyColor, 0.02);

  // --------------------------
  // 그림 그리기 (과제1 코드 유지 + 약간의 애니메이션 값만 섞기)
  // --------------------------
  push();
  translate(100, bobY); // 전체 캐릭터를 위아래로 흔들기

  stroke(255, 0, 100); // 테두리 설정 (조금 색 바꿔봄)
  strokeWeight(1);
  fill(200);
  // 얼굴: 세로 크기를 살짝 변화
  let headH = 100 + sin(t * 1.5) * 5;
  ellipse(200, 200, 100, headH);

  // 위쪽 반원 (모자처럼)
  arc(50, 50, 80, 80, 0, PI);
  arc(350, 50, 80, 80, 0, PI);

  // 코 주변
  strokeWeight(10);
  point(200, 200);

  // 코 원: 크기 변화 적용
  let baseNoseSize = 100;
  circle(200, 200, baseNoseSize * noseScale);

  // 코 아래 점 (입 비슷한 포인트)
  strokeWeight(10);
  point(50 + eyeOffsetX, 250); // cos 기반으로 좌우로 살짝 움직이게

  // 목/몸통 사각형
  rectMode(CENTER);
  strokeWeight(1);
  stroke(30, 80, 40);
  fill(bodyColor); // lerpColor로 계속 바뀌는 색
  rect(200, 360, 300, 50);

  // 양쪽 몸(?) 타원
  strokeWeight(5);
  fill(100, 40, 80);
  ellipse(350, 200, 100, 200);

  strokeWeight(5);
  fill(40, 40, 80);
  ellipse(50, 200, 100, 200);

  // 눈 (좌우 진동)
  noStroke();
  fill(0);
  ellipse(50 + eyeOffsetX, 200, 20, 20);

  noStroke();
  fill(0);
  ellipse(350 + eyeOffsetX, 200, 20, 20);

  // 콧구멍 삼각형
  noStroke();
  fill(0);
  triangle(185, 300, 195, 230, 175, 230);
  triangle(215, 300, 225, 230, 205, 230);

  // 입 라인
  stroke(0);
  strokeWeight(10);
  line(60, 380, 340, 380);

  // 볼에 X 표시
  strokeWeight(1);
  line(90, 280, 130, 320);
  line(130, 280, 90, 320);

  line(270, 280, 310, 320);
  line(310, 280, 270, 320);

  pop();
}

function keyPressed() {
  if (key === "s") {
    saveGif("과제4", 10);
  }
}
