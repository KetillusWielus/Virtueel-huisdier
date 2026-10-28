let hungerStat;
let happyStat;
let healthStat;
let energyStat;
let overfedCounter;
let randomNum;
let randomVel;
let chanceVar;

let spawnButton;
let feedButton;
let cleanButton;
let sleepButton;
let minigameButton;
let saveButton;
let loadButton;
let country1Button;
let country2Button;
let country3Button;
let country4Button;
let bomb;
let bg;
let bg2;
let gameOverScreen;
let gameOverScreen2;

let petY;
let petX;
let rect1Y = 0;
let rect2Y = 0;
let score1 = 0;
let score2 = 0;
let timer = 0;
let timer2 = 0;
let timer3 = 130; 
let counter = 0;
let cash = 3000;
let radiationVar;
let radiationAccel;

let playingMinigame = false;
let moneyMinigame = false;
let cleaningMinigame = false;
let isSleeping = false;
let spawnedPet = false;
let isDepressed = false;
let isHungry = false;
let isSick = false;
let isTired = false;
let notGuessed = true;
let gameOver = false;

function setup() {
  createCanvas(600, 600);

  // alle buttons

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

  country1Button = createButton("VATICAN CITY");
  country1Button.mouseClicked(country1);

  country2Button = createButton("DENMARK");
  country2Button.mouseClicked(country2);

  country3Button = createButton("FRANCE");
  country3Button.mouseClicked(country3);

  country4Button = createButton("USA");
  country4Button.mouseClicked(country4);
}


function preload() {
 bomb = loadImage("bomb.png");
 bg = loadImage("bg.png");
 bg2 = loadImage("bg2.png");
 gameOverScreen = loadImage("game_over.png");
 gameOverScreen2 = loadImage("game_over2.png");
 
}

function spawnFunction() {
// als je op de spawnfunctie klikt dan reset alles
spawnedPet = true;

 hungerStat = 0;
 happyStat = 100;
 healthStat = 100;
 energyStat = 100;

 overfedCounter = 0;
 petY = -150;
 petX = 700;

 radiationVar = 1.9;
 cash = 4500;
 gameOver = false;
}

function feedFunction() {
  /*deze spaghetti gebeurt er als je op de feed knop drukt hij
   gaat langs heelveel variabelen en je hebt geld nodig*/
  
  if (isDepressed == false && cash < 1000) {
     moneyMinigame = true;
   } else if (isDepressed == false && cash >= 1000 && cash < 5000) {
     cash -= 1000
     radiationVar += 0.0029;
  
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
 } else if (isDepressed == false && cash >= 5000) {
    cash -= 5000;
    radiationVar += 0.029;
  
  if (hungerStat <= 40) {
      hungerStat = 0;
      overfedCounter ++;
    } else if (hungerStat >= 60) {
      hungerStat -= 60;
    } else {
      hungerStat = 0;
    }

 if (energyStat >= 70) {
  energyStat = 100;
 } else {
  energyStat += 30;
 }

 if (healthStat >= 95) {
  healthStat = 100;
 } else {
  healthStat += 5;
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
  if (cash > 5000) {
  cash -= 5000;
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
 } else {
  moneyMinigame = true;
 }
}

function saveFunction() {
  storeItem("h",hungerStat);
  storeItem("e",energyStat);
  storeItem("he",healthStat);
  storeItem("ha",happyStat);
  storeItem("o",overfedCounter);
  storeItem("c",cash);
  storeItem("r",radiationVar);
  storeItem("ra",radiationAccel);
  timer3 = 0;
}

function loadFunction() {

 hungerStat = getItem("h");
 happyStat = getItem("ha");
 healthStat = getItem("he");
 energyStat = getItem("e");
 overfedCounter = getItem("o");
 cash = getItem("c");
 radiationVar = getItem("r");
 radiationAccel = getItem("ra")

 spawnedPet = true;
 petY = 350;
 petX = 200;
}

function country1() {
  chanceVar = round(random(2))
  chanceVar = round(chanceVar * radiationVar + 0.2)

  if (chanceVar == 1) {
    cash += 1000
  } else if (chanceVar >= 2) {
    cash += 1500
  } else {
    gameOver = true;
  }
}

function country2() {
  chanceVar = round(random(10))
  chanceVar = round(chanceVar * (radiationVar + 1))

  if (chanceVar >= 5 & chanceVar < 10) {
    cash += 3000
  } else if (chanceVar >= 10) {
    cash += 3500
  } else {
    gameOver = true;
  }
}

function country3() {
  chanceVar = round(random(50))
  chanceVar = round(chanceVar * (radiationVar - 50))

  if (chanceVar >= 35 & chanceVar < 45) {
    cash += 6000
  } else if (chanceVar >= 45) {
    cash += 10000
  } else {
    gameOver = true;
  }
}

function country4() {
    chanceVar = round(random(100))
    chanceVar = round(chanceVar * (radiationVar - 100))

  if (chanceVar >= 90 & chanceVar < 99) {
    cash += 50000
  } else if (chanceVar >= 99) {
    cash += 1000000
  } else {
    gameOver = true;
  }
}

function draw() {
  background("lime");

  if (spawnedPet == false) {
    image(bg,0,0,600,600);
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

    country1Button.hide();
    country2Button.hide();
    country3Button.hide();
    country4Button.hide();

  } else if (gameOver == true) {
    feedButton.hide();
    cleanButton.hide();
    sleepButton.hide();
    minigameButton.hide();
    saveButton.hide();

    spawnButton.hide();
    loadButton.hide();

    country1Button.hide();
    country2Button.hide();
    country3Button.hide();
    country4Button.hide();

      if (moneyMinigame == true) {
        image(gameOverScreen2,0,0,600,600);
        text("Your nuke got taken away",120,580);
      } else {
        image(gameOverScreen,0,0,600,600);
        text("Your pet exploded in a plinian explosion",120,580);
      }

     if (timer2 >= 300) {
       playingMinigame = false
       spawnedPet = false;
       cleaningMinigame = false;
       moneyMinigame = false;
        timer2 = 0;
       gameOver = false;
     } else {
        timer2 ++;
    }

  } else if (playingMinigame == false && moneyMinigame == false && cleaningMinigame == false) {
    
   if (mouseIsPressed == true && mouseX >= petX && mouseX <= petX + 200 && mouseY >= petY && mouseY <= petY + 250) {
     radiationVar += 0.05
   }
  
    image(bg,0,0,600,600);
    radiationVar += (0.000024 * radiationVar);
    fill("black");
    image(bomb,petX,petY,200,250);
    if (petY != 350) {
      petY += 1;
      petX -= 1;
    }

  if (timer3 <= 120) {
    fill("white");
    rect(490,50,100,35,5);

    fill("black");
    text("Game is saved", 500,70);
  } if (timer3 <= 120) {
    timer3 ++
  }

    feedButton.show();
    cleanButton.show();
    sleepButton.show();
    minigameButton.show();
    saveButton.show();

    spawnButton.hide();
    loadButton.hide();

    country1Button.hide();
    country2Button.hide();
    country3Button.hide();
    country4Button.hide();

    feedButton.position(10,10);
    cleanButton.position(10,50);
    sleepButton.position(10,90);
    minigameButton.position(10,130);
    saveButton.position(500,10);

    //statistics
    fill("white");
    rect(0,340,200,260,5)
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


    fill("black");
    textSize(12);
    text("MISC",10,360)
    text("=================",10,380)
    text("Times overfed = " + overfedCounter, 10,400);
    text("Background radiation = " + round(radiationVar,1) + " mSv",10,420)
    text("Cash = $" + cash,10,440)
    hungerStat += 0.02;
    energyStat -= 0.01;
    healthStat -= 0.01 * overfedCounter + 0.01;

    if (happyStat >= 0 ) {
     happyStat -= 0.015;
    }

    if (round(hungerStat) >= 100) {
      gameOver = true;
    } else if (round(energyStat) <= 0) {
      gameOver = true;
    } else if (round(healthStat) <= 0) {
      gameOver = true;
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
   } else if (isDepressed == true) {

   }

  } else if (playingMinigame == true || moneyMinigame == true || cleaningMinigame == true) {
    background("black")
    spawnButton.hide();
    feedButton.hide();
    cleanButton.hide();
    sleepButton.hide();
    minigameButton.hide();
    saveButton.hide();

       if (keyIsPressed == true) {
        if (keyCode == ESCAPE && counter == 10 && notGuessed == false) {
          playingMinigame = false;
        } else if (keyCode == ENTER && playingMinigame == true) {
          notGuessed = false;
        } else if (keyCode == ESCAPE && playingMinigame == false) {
          cleaningMinigame = false;
          moneyMinigame = false;
        }
      }
   
    if (playingMinigame == true) {
      if (counter >= randomNum && notGuessed == true) {
        fill("black");
      } else if (notGuessed == true) {
        fill("white");
      } else if (notGuessed == false && counter == 10) {
        fill("green");
        textSize(20);
        text("You decoded the bomb, poggers",140,300);
      } else {
        gameOver = true;
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
      text("The text will fade when the counter hits " + randomNum, 110,350);

    } else if (moneyMinigame == true) {
      image(bg2,0,0,600,600);
      country1Button.show();
      country2Button.show();
      country3Button.show();
      country4Button.show();

      country1Button.position(250,170);
      country2Button.position(250,200);
      country3Button.position(250,230);
      country4Button.position(250,260);
      
      fill("white");
      textSize(15)
      text("You dont have enough money, so which country do you want to intimidate?", 50,100)
      textSize(30)
      text("Cash = $" + cash, 200,350);
  } else if (cleaningMinigame == true) {
    
  }
 }
}