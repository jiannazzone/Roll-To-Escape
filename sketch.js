// global constants
let cardWidth;
let cardHeight;
let spacing;
let allCards = [];
let currentCards;
let button;
let rolls = [1, 2, 3, 4, 5, 6];

//positions
let cardX;
let cardY = [];
let diceX;
let diceY = [];
let diceSize;

function preload() {
  // Load images for later use and create copy to edit as you go
  allCards.push(loadImage('assets/cards/Infirmary.png'));
  allCards.push(loadImage('assets/cards/Laundry.png'));
  allCards.push(loadImage('assets/cards/Library.png'));
  allCards.push(loadImage('assets/cards/Mess_Hall.png'));
  allCards.push(loadImage('assets/cards/Shower.png'));
  allCards.push(loadImage('assets/cards/Storehouse.png'));
  allCards.push(loadImage('assets/cards/Visitors_Center.png'));
  allCards.push(loadImage('assets/cards/Workshop.png'));
  allCards.push(loadImage('assets/cards/Yard.png'));
}

function setup() {
  rectMode(CENTER);
  createCanvas(windowHeight, windowHeight);
  currentCards = shuffle(allCards);
  makeScaling();
  addDecorations();
  makeButton();
}

function makeScaling() {
  // scale cards to screen size
  cardWidth = width / 2.5;
  cardHeight = cardWidth * 0.66;
  spacing = height / 32;

  //generate y-coordinates for the cards
  cardX = 2 * spacing + cardWidth / 2;
  let y = height / 2 - spacing / 2 - cardHeight;
  for (let i = 0; i < 3; i++) {
    cardY.push(y);
    y += cardHeight + spacing / 2;
  }

  // scale dice to screen size
  diceSize = width / 5;
  diceX = (3 / 4) * width;
  y = height / 2 - spacing - diceSize
  for (let i = 0; i < 3; i++) {
    diceY.push(y);
    y += diceSize + spacing;
  }
}

function makeDice() {
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(5);
  for (let i = 0; i < 3; i++) {
    rect(diceX, cardY[i], diceSize, diceSize, 20);
  }
}

function makeButton() {
  stroke(0);
  //strokeWeight(2);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(75);
  rect(width / 2, height - spacing / 2, width / 1.25, height / 10, 20);
  fill(255);
  textSize(26);
  text("Click to deal 3 new cards and roll 3d6", width / 2, height - spacing, width / 1.5, height / 10);
}

function addDecorations() {
  stroke(0);
  strokeWeight(2);
  textAlign(CENTER, TOP);
  textSize(24);
  rectMode(CENTER);
  background(75);
  fill(200);
  rect(width / 2, height / 2, width - spacing / 2, height - spacing / 2);
  fill(75)
  rect(width / 2, spacing / 2, width / 1.25, height / 10, 20)
  fill(255);
  text('\"Roll to Escape\" by Story Machine Games', width / 2, spacing / 2);
}

function dealAndRoll() {
  rectMode(CENTER);
  makeDice();
  textSize(64);
  textAlign(CENTER, CENTER);
  if (currentCards.length == 0) {
    currentCards = shuffle(allCards);
  }
  for (let i = 0; i < 3; i++) {
    let thisCard = currentCards.pop();
    image(thisCard, cardX - cardWidth / 2, cardY[i] - cardHeight / 2, cardWidth, cardHeight);
    fill(0);
    noStroke();
    text(random(rolls), diceX, cardY[i]);
  }
}

function mousePressed() {
  if (mouseY > (9 / 10) * height - spacing / 2 &&
    mouseX > width / 10 && mouseX < (9 / 10) * width) {
    dealAndRoll();
  }
}
