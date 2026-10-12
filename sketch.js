let hungerStat;
let happyStat;
let healthStat;
let energyStat;
let overfedCounter;

let spawnButton;
let feedButton;
let cleanButton;
let sleepButton;
let minigameButton;

let petY;

let playingMinigame = false;
let spawnedPet = false;
let isDepressed = false;

function setup() {
  createCanvas(600, 600);

  spawnButton = createButton("SPAWN PET");
  spawnButton.mouseClicked(spawnFunction);

  feedButton = createButton("FEED PET");
  feedButton.mouseClicked(feedFunction);

  cleanButton = createButton("CLEAN PET");
  cleanButton.mouseClicked(cleanFunction);

  sleepButton = createButton("SLEEP");
  sleepButton.mouseClicked(sleepFunction);

  minigameButton = createButton("MINIGAME");
  minigameButton.mouseClicked(minigameFunction);
}

function spawnFunction() {
spawnedPet = true;

 hungerStat = 0;
 happyStat = 100;
 healthStat = 100;
 energyStat = 100;

 overfedCounter = 0;
 petY = -50;
}

function feedFunction() {
 if (isDepressed == false) {
  if (hungerStat <= 20) {
    hungerStat = 0;
    overfedCounter ++;
  } else if (hungerStat >= 40) {
    hungerStat -= 40;
  } else {
    hungerStat = 0;
  }

 if (energyStat >= 80) {
  energyStat = 100;
 } else {
  energyStat += 20;
 }

 if (healthStat >= 98) {
  healthStat = 100;
 } else {
  healthStat += 2;
 }
}
}

function cleanFunction() {
 if (isDepressed == false) {
  if (healthStat >= 90) {
    healthStat = 100;
  } else {
    healthStat += 10;
  }

 if (happyStat >= 98) {
  happyStat = 100;
 } else {
  happyStat += 2
 }
}
}

function sleepFunction() {
if (isDepressed == false) {
  if (energyStat >= 50) {
    energyStat = 100;
  } else {
    energy += 50;
  }
}
}

function minigameFunction() {
  playingMinigame = true;
  energyStat -= 20;
  hungerStat -= 10;

  if (happyStat <= 20) {
  happyStat += 80
  } else {
    happyStat = 100;
  }
}

function draw() {
  background("blue");

  if (spawnedPet == false) {
    text("Click the 'SPAWN PET' button to play", 200,220)
    spawnButton.position(250,250);
    spawnButton.show();

    //buttons verstoppen
    feedButton.hide();
    cleanButton.hide();
    sleepButton.hide();
    minigameButton.hide();

  } else if (playingMinigame == false) {
    fill("black");
    circle(300,petY,50);
    if (petY != 575) {
      petY += 1;
    }

    feedButton.show();
    cleanButton.show();
    sleepButton.show();
    minigameButton.show();

    spawnButton.hide();

    feedButton.position(10,10);
    cleanButton.position(10,50);
    sleepButton.position(10,90);
    minigameButton.position(10,130);

    //statistics
    text("STATS",10,490);
    text("================",10,510);
    text("HUNGER: " + round(hungerStat) + "%",10,530);
    text("ENERGY: " + round(energyStat) + "%",10,550);
    text("HEALTH: " + round(healthStat) + "%",10,570);
    text("HAPPINESS: " + round(happyStat) + "%",10,590);

    hungerStat += 0.02;
    energyStat -= 0.01;
    healthStat -= 0.01 * overfedCounter + 0.001;

    if (happyStat >= 0 ) {
      happyStat -= 0.015;
    }

    if (round(hungerStat) >= 100) {
      spawnedPet = false;
    } else if (round(energyStat) <= 0) {
      spawnedPet = false;
    } else if (round(healthStat) <= 0) {
      spawnedPet = false;
    } else if (round(happyStat) <= 0) {
      isDepressed = true;
    }

  } else if (playingMinigame == true) {
    background("black")
    spawnButton.hide();
    feedButton.hide();
    cleanButton.hide();
    sleepButton.hide();
    minigameButton.hide();
  }
}