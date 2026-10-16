let hungerStat;
let happyStat;
let healthStat;
let energyStat;
let overfedCounter;
let randomNum;
let randomVel;

let spawnButton;
let feedButton;
let cleanButton;
let sleepButton;
let minigameButton;
let saveButton;
let loadButton;

let petY;
let rect1Y = 0;
let rect2Y = 0;
let score1 = 0;
let score2 = 0;
let timer = 0;
let counter = 0;

let playingMinigame = false;
let spawnedPet = false;
let isDepressed = false;
let isHungry = false;
let isSick = false;
let isTired = false;
let gameSaved = false;
let notGuessed = true;

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

  saveButton = createButton("SAVE GAME");
  saveButton.mouseClicked(saveFunction);

  loadButton = createButton("LOAD GAME");
  loadButton.mouseClicked(loadFunction);

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
  hungerStat += 10;

  if (happyStat <= 20) {
  happyStat += 80
  } else {
    happyStat = 100;
  }

  randomNum = round(random(3,8));
  counter = 0;
  timer = 0;
  notGuessed = true;
  randomVel = ceil(random(3))
}

function saveFunction() {
  storeItem("h",hungerStat);
  storeItem("e",energyStat);
  storeItem("he",healthStat);
  storeItem("ha",happyStat);
  storeItem("o",overfedCounter);
  gameSaved = true;
}

function loadFunction() {

 hungerStat = getItem("h");
 happyStat = getItem("ha");
 healthStat = getItem("he");
 energyStat = getItem("e");
 overfedCounter = getItem("o");

 spawnedPet = true;
 petY = 575;
}

function draw() {
  background("blue");

  if (spawnedPet == false) {
    fill("black");
     textSize(12)
    text("Click the 'SPAWN PET' button to play", 200,220)
    spawnButton.position(250,250);
    loadButton.position(250,290);
    spawnButton.show();
    loadButton.show();
    

    //buttons verstoppen
    feedButton.hide();
    cleanButton.hide();
    sleepButton.hide();
    minigameButton.hide();
    saveButton.hide();

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
    saveButton.show();

    spawnButton.hide();
    loadButton.hide();

    feedButton.position(10,10);
    cleanButton.position(10,50);
    sleepButton.position(10,90);
    minigameButton.position(10,130);
    saveButton.position(500,10);

    //statistics
    textSize(10);
    if (isHungry == true && isSick == true && isTired == true && isDepressed == true) {
      fill("red")
    } else {
      fill("black")
    }

    text("STATS",10,490);
    text("================",10,510);
    
    if (isHungry == true) {
      fill("red")
    }
    
    text("HUNGER: " + round(hungerStat) + "%",10,530);

    if (isTired == true) {
      fill("red")
    } else {
      fill("black")
    }

    text("ENERGY: " + round(energyStat) + "%",10,550);

    if (isSick == true) {
      fill("red")
    } else {
      fill("black")
    }


    text("HEALTH: " + round(healthStat) + "%",10,570);

    if (isDepressed == true) {
      fill("red")
    } else {
      fill("black")
    }


    text("HAPPINESS: " + round(happyStat) + "%",10,590);


    text("Times overfed = " + overfedCounter, 500,590);
    hungerStat += 0.02;
    energyStat -= 0.01;
    healthStat -= 0.01 * overfedCounter + 0.01;

    if (happyStat >= 0 ) {
     happyStat -= 0.015;
    }

    if (round(hungerStat) >= 100) {
      spawnedPet = false;
    } else if (round(energyStat) <= 0) {
      spawnedPet = false;
    } else if (round(healthStat) <= 0) {
      spawnedPet = false;
    } 

    //emoties en gedrag
   if (hungerStat <= 80) {
    isHungry = false;
   } else if (hungerStat > 80) {
    isHungry = true;
   }
   
   if (energyStat > 20) {
    isTired = false;
   } else if (energyStat <= 20) {
    isTired = true;
   }

   if (healthStat > 20) {
    isSick = false;
   } else if (healthStat <= 20) {
    isSick = true;
   }

   if (round(happyStat) <= 20) {
     isDepressed = true;
   } else if (round(happyStat) > 20) {
     isDepressed = false
   }


   if (isHungry == true) {
    console.log("pet is hungry")
   } else if (isTired == true) {
    console.log("pet is tired")
   } else if (isSick == true) {
    console.log("pet is sick")
   }

  } else if (playingMinigame == true) {
    background("black")
    spawnButton.hide();
    feedButton.hide();
    cleanButton.hide();
    sleepButton.hide();
    minigameButton.hide();
    saveButton.hide();


    if (counter >= randomNum && notGuessed == true) {
      fill("black");
    } else if (notGuessed == true) {
      fill("white");
    } else if (notGuessed == false && counter == 10) {
      fill("green");
      textSize(20);
      text("You decoded the bomb, poggers",140,300);
    } else {
      fill("red");
      textSize(20);
      text("The bomb exploded on your pet, awesome sauce!",80,300);
      playingMinigame = false
      spawnedPet = false;
    }

    textSize(60);

    if (timer % 60 == 0) {
      counter ++;
    }

    if (notGuessed == true) {
    timer += 1 * randomVel;
    }

    if (counter <= 9 ) {
      text("0" + counter, 250,250);
    } else {
      text(counter, 250,250);
    }

    textSize(20);
    fill ("white")
    text("Hit ENTER if the counter hits 10", 150,160);

    if (keyIsPressed == true) {
      if (keyCode == ESCAPE) {
        playingMinigame = false;
      } else if (keyCode == ENTER) {
        notGuessed = false;
      }
    }
  }
}