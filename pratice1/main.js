function draw() {
  createCanvas(600, 400);
  pixelDensity(1);
  background(650, 200, 50);

  translate(100, 0);

  stroke(255, 255, 255); //테두리 설정
  strokeWeight(1);
  fill(200);
  ellipse(200, 200, 100, 100);

  arc(50, 50, 80, 80, 0, PI);
  arc(350, 50, 80, 80, 0, PI);

  strokeWeight(10);
  point(200, 200);
  circle(200, 200, 40);

  strokeWeight(10);
  point(50, 250);
  fill(0); //코

  rectMode(CENTER);
  strokeWeight(1);
  stroke(155, 100, 10);
  fill(255, 0, 0);
  rect(200, 360, 300, 50);

  strokeWeight(5);
  fill(150, 200, 23);
  ellipse(350, 200, 100, 200);

  strokeWeight(5);
  fill(150, 130, 21);
  ellipse(50, 200, 100, 200);

  noStroke();
  fill(0);
  ellipse(50, 200, 20, 20);

  noStroke();
  fill(0);
  ellipse(350, 200, 20, 20);

  noStroke();
  fill(0);

  triangle(185, 300, 195, 230, 175, 230); //콧구멍
  triangle(215, 300, 225, 230, 205, 230);

  stroke(0);
  strokeWeight(10);
  line(60, 380, 340, 380);

  strokeWeight(1);
  line(90, 280, 130, 320); //볼
  line(130, 280, 90, 320);

  line(270, 280, 310, 320);
  line(310, 280, 270, 320);
  noLoop(); // draw 반복 멈춤
}
