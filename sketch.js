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
let tired;
let unhealthy;
let depressed;
let hunger;
let bg;
let bg2;
let bg3;
let gameOverScreen;
let gameOverScreen2;
let gameOverScreen3;
let gameOverScreen4;
let vaccine;
let jodium;
let radiationVar;
let radiationAccel;

let petY;
let petX;
let timer = 0;
let timer2 = 0;
let timer3 = 130; 
let timer4 = 0;
let counter = 0;
let cash = 3000;

let playingMinigame = false;
let moneyMinigame = false;
let cleaningMinigame = false;
let hotelRoom = false;
let spawnedPet = false;
let isDepressed = false;
let isHungry = false;
let isSick = false;
let isTired = false;
let notGuessed = true;
let gameOver = false;
let vaccineGiven = false;

function setup() {
  createCanvas(600, 600);

  // alle buttons

  spawnButton = createButton("SPAWN PET");
  spawnButton.mouseClicked(spawnFunction);

  feedButton = createButton("FEED PET");
  feedButton.mouseClicked(feedFunction);

  cleanButton = createButton("GIVE VACCINATION");
  cleanButton.mouseClicked(cleanFunction);

  sleepButton = createButton("HOTEL ROOM");
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
// player character
 bomb = loadImage("Assets/bomb.png");
 // normale achtergrond
 bg = loadImage("Assets/bg.png");
 // moneygame achtergrond
 bg2 = loadImage("Assets/bg2.png");
 // Ziekenhuis achtergrond
 bg3 = loadImage("Assets/bg3.png");
 // Hotel kamer
 bg4 = loadImage("Assets/bg4.png");
 //Mediocre ending
 gameOverScreen = loadImage("Assets/game_over.png");
 //bad ending
 gameOverScreen2 = loadImage("Assets/game_over2.png");
 //antivaxxer ending
 gameOverScreen3 = loadImage("Assets/game_over3.png");
 //good ending
 gameOverScreen4 = loadImage("Assets/game_over4.png");
 //indicators + health stuff
 hunger = loadImage("Assets/bomb_hungry.png");
 tired = loadImage("Assets/bomb_tired.png");
 depressed = loadImage("Assets/bomb_unhappy.png");
 unhealthy = loadImage("Assets/bomb_dirty.png");
 vaccine = loadImage("Assets/vaccine.png");
 jodium = loadImage("Assets/jodium.png");
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
 petX = 750;

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
  //als je de vaccine button klikt
 if (isDepressed == false) {
  if (cash >= 7500) {
  cash -= 7500;
  cleaningMinigame = true;
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
} else {
  moneyMinigame = true;
}
}
}

function sleepFunction() {
// als je de slaapbutton klikt
if (isDepressed == false) {
  hotelRoom = true;
 }
}

function minigameFunction() {
  //als je op de minigame button klikt
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
  // als je op de save button klikt
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
// als je op de load button klikt
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
  //optie 1 bij de money minigame
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
   //optie 2 bij de money minigame
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
   //optie 3 bij de money minigame
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
   //optie 4 bij de money minigame
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
    //startscherm
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
    //bij een gameover
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
        textSize(20);
        fill("white");
        image(gameOverScreen2,0,0,600,600);
        text("Your nuke got taken away. Bad ending",130,580);
      } else if (radiationVar >= 10000) {
        textSize(20);
        fill("white");
        image(gameOverScreen4,0,0,600,600);
        text("You have reached the fatal amount of radiation! Good ending",30,20);
      } else if (cleaningMinigame == false){
        textSize(20);
        fill("white");
        image(gameOverScreen,0,0,600,600);
        text("Your pet exploded in a plinian explosion! Mediocre ending",50,580);
      } else if (vaccineGiven == false) {
        textSize(20);
        fill("white");
        image(gameOverScreen3,0,0,600,600);
        text("You aren't an antivaxxer, right? Antivaxxer ending",80,20);
      }

     if (timer2 >= 300) {
       playingMinigame = false
       spawnedPet = false;
       cleaningMinigame = false;
       moneyMinigame = false;
       timer2 = 0;
       gameOver = false;
       hotelRoom = false;
     } else {
        timer2 ++;
    }

  } else if (playingMinigame == false && moneyMinigame == false && cleaningMinigame == false && hotelRoom == false) {
    // het spel
   if (radiationVar >= 10000) {
    gameOver = true;
   }
   //als je op de pet klikt krijg je meer radiatie
   if (mouseIsPressed == true && mouseX >= petX && mouseX <= petX + 200 && mouseY >= petY && mouseY <= petY + 250) {
     radiationVar += (0.0005 * radiationVar);
   }

   // als je op de jodiumtabletten klikt reset de radiatie
   if (mouseIsPressed == true && mouseX >= 490 && mouseX <= 600 && mouseY >= 500 && mouseY <= 600) {
     radiationVar = 1.9;
   }

   //achtergrond
   image(bg,0,0,600,600);

   // elke frame komt er radiatie bij
   radiationVar += (0.000024 * radiationVar);

   //huisdier
   image(bomb,petX,petY,200,250);

    //achtergrond voor jodiumtabletten
    fill("white");
    rect(490,500,110,100,5);
    
    //jodium tabletten
    image(jodium,500,525,100,75);

    //achtergrond word steeds groener met meer radiatie
    fill(32,200,32,radiationVar / 40);
    square(0,0,600)

    //zodat de pet naar beneden valt
    if (petY != 350) {
      petY += 1;
      petX -= 1;
    }

  //feedback voor de save button
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


    //misc statistics
    fill("black");
    textSize(12);
    text("MISC",10,360)
    text("=================",10,380)
    text("Times overfed = " + overfedCounter, 10,400);
    text("Background radiation = " + round(radiationVar,1) + " mSv",10,420)
    text("Cash = $" + cash,10,440);
    //text voor de jodiumtabletten
    text("Reset radiation",505,515)
    //stats die naar beneden gaan
    hungerStat += 0.02;
    energyStat -= 0.01;
    healthStat -= 0.01 * overfedCounter + 0.01;

    //happystat is de enige stat die geen game over geeft als je 0 haalt dit vermijd een - getal
    if (happyStat >= 0 ) {
     happyStat -= 0.015;
    }

    //je pet gaat dood als deze stats 0 zijn
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


   //visuele feedback voor gedrag
   if (isHungry == true) {
    image(hunger,petX - 50,petY,200,200);
   } 
   if (isTired == true) {
    image(tired,petX + 30,petY,200,200);
   }
   if (isSick == true) {
    image(unhealthy,petX - 10,petY,200,200);
   }
   if (isDepressed == true) {
    image(depressed,petX -11,petY + 10,200,200);
   }

  } else if (playingMinigame == true || moneyMinigame == true || cleaningMinigame == true || hotelRoom == true) {
    //dit is bij alle minigames zo
    background("black")
    spawnButton.hide();
    feedButton.hide();
    cleanButton.hide();
    sleepButton.hide();
    minigameButton.hide();
    saveButton.hide();

      //ENTER word alleen uitgevoerd als de minigame word gespeeld en ESCAPE doet andere dingen bij andere minigames
       if (keyIsPressed == true) {
        if (keyCode == ESCAPE && counter == 10 && notGuessed == false) {
          playingMinigame = false;
        } else if (keyCode == ENTER && playingMinigame == true) {
          notGuessed = false;
        } else if (keyCode == ESCAPE && playingMinigame == false && cleaningMinigame == false) {
          moneyMinigame = false;
          hotelRoom = false;
        } else if ( cleaningMinigame == true && vaccineGiven == false) {
           gameOver = true;
        } else if(cleaningMinigame == true) {
          cleaningMinigame = false;
          vaccineGiven = false;
          timer4 = 0; 
        }
      }
   
    if (playingMinigame == true) {
      //minigame en de tekst checker eerst was bij de else rode tekst dus daarom staat de gameover hier
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

      //na 60 frames gaat de counter omhoog
      if (timer % 60 == 0) {
        counter ++;
      }

      //als je nog niet hebt gegokt gaan de frames naarboven
      if (notGuessed == true) {
        timer += 1 * randomVel;
      }

      //zodat het meer uniform eruit ziet dit laat 09 zien inplaats van 9 hetzelfde met alle getallen daaronder
      if (counter <= 9 ) {
        text("0" + counter, 250,250);
      } else {
        text(counter, 250,250);
      }

      //voor de duidelijkheid van de minigame
      textSize(20);
      fill ("white")
      text("Hit ENTER if the counter hits 10", 150,160);
      text("The text will fade when the counter hits " + randomNum, 110,350);

    } else if (moneyMinigame == true) {
      //dit krijg je als je niet genoeg geld hebt
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
    //dit krijg je als je op vaccinate pet drukt
    image(bg3,0,0,600,600);
    if (vaccineGiven == false) {
      image(vaccine,mouseX,mouseY,100,100);
    }

    image(bomb,250,350,200,250);

    if (mouseX >= 250 && mouseX <= 250 + 200 && mouseY >= 350 && mouseY <= 350 + 250) {
      vaccineGiven = true;
    } 

    if (vaccineGiven == true && timer4 <= 120 ) {
      timer4 += 1
    } else if (vaccineGiven == true) {
      timer4 = 0;
      vaccineGiven = false; 
      cleaningMinigame = false;
    }
  } else if (hotelRoom == true) {
    //als je op hotel room drukt
    if (energyStat < 100) {
      energyStat += 0.1;
    } 

    image(bg4,0,0,600,600)
    image(bomb,250,350,200,250); 

    fill("white");
    rect(10,10,180,30,5);

    fill("black");
    textSize(20)
    text("ENERGY = " + round(energyStat),30,30); 
  }
 }
}