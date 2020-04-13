// global constants
let cardWidth;
let cardHeight;
let spacing;
let allCards = [];
let currentCards;
let button;
let rolls = [1, 2, 3, 4, 5, 6];

//positions
let cardX = [];
let cardY;
let diceX = [];
let diceY; 

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
  createCanvas(windowWidth, windowHeight);
  currentCards = shuffle(allCards);
  makeScaling();
  addDecorations();
  makeButton();
}

function makeScaling() {
  // scale cards to screen size
  cardWidth = width/4;
  cardHeight = cardWidth * 0.66;
  spacing = width/16;
  cardY = spacing/1.25;
  
  //generate x-coordinates for the cards
  let x = spacing;
  for (let i = 0; i < 3; i++) {
    cardX.push(x);
    x += cardWidth + spacing;
  }
  
  // scale dice to screen size
  diceY = (9/12)*height;
  x = width/2 - height/4;
  for (let i = 0; i < 3; i++) {
    diceX.push(x);
    x += height/4;
  }
}
function makeDice() {
  rectMode(CENTER);
  let diceSize = height/6;
  fill(255);
  stroke(0);
  strokeWeight(5);
  for (let i = 0; i < 3; i++) {
    rect(diceX[i], diceY, diceSize, diceSize, 20);
  }
}
function makeButton() {
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(75);
  rect(width/2, height/2, width/3, height/8, 20);
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(26);
  text("Deal 3 new cards and roll 3d6", width/2, height/2, width/3, height/6);
}
function addDecorations() {
  textAlign(CENTER, TOP);
  textSize(32);
  rectMode(CENTER);
  background(60);
  fill(200);
  rect(width/2, height/2, width-spacing, height-spacing);
  fill(255);
  text('\"Roll to Escape\" by Story Machine Games', width/2, 0);
}
function dealAndRoll() {
  makeDice();
  textSize(64);
  textAlign(CENTER, CENTER);
  if (currentCards.length == 0){
    currentCards = shuffle(allCards);
  }
  for (let i = 0; i < 3 ; i++) {
    let thisCard = currentCards.pop();
    rectMode(CORNER);
    image(thisCard, cardX[i], cardY, cardWidth, cardHeight);
    rectMode(CENTER);
    fill(0);
    noStroke();
    text(random(rolls), diceX[i], diceY);
  }
}
function mousePressed() {
  if (mouseX >= width/3 && mouseX <= (2/3)*width) {
    if (mouseY >= (5/12)*height && mouseY <= (7/12)*height) {
      dealAndRoll();
    }
  }
}