
// HTML Nodes
const imageServerEndpoint = "./assets/beverages/";
const cubeSize = 4; // cube size is 4 grams
const cubeCounterElement = document.querySelector('.cube-number');
const remarks = document.getElementById('remark');
const remarksArray = ["Lets Play!", "Keep Adding", "This beast wants more!", "Almost There", "Done!!!"];
let mainimage = document.getElementById('main-image');
const sugarLevel = {
  cubeCount: 0,
  progress: 0,
  currentDrink: '',
  totalValue: 0,
  filled: 0
};

const beverages = [
  {
    "name": "coke",
    "sugar": 39,
    image: new Image()
  },
  {
    "name": "pepsi",
    "sugar": 41,
    image: new Image()
  },
  {
    "name": "mountain_dew",
    "sugar": 46,
    image: new Image()
  },
  {
    "name": "sprite",
    "sugar": 38,
    image: new Image()
  },
  {
    "name": "7_up",
    "sugar": 38,
    image: new Image()
  },
  {
    "name": "fanta",
    "sugar": 44,
    image: new Image()
  },
  {
    "name": "red_bull",
    "sugar": 39,
    image: new Image()
  },
  {
    "name": "dr_pepper",
    "sugar": 40,
    image: new Image()
  },
];

$("document").ready(start);


  audio = new Audio('./assets/audios/background.mp3');
  audio.volume = 0;
  audio.loop = true;
  audio.play();
//Draw the images using canvas

window.onload = function() {
  let c;
  var ctx = c.getContext("2d");

  //main image
  var mainImage = document.getElementById("main-image");
  ctx.drawImage(mainImage, 0, 0);

  //sugar cubes

  var sugarCubes = document.getElementById("sugar-cube");
  ctx.drawImage(sugarCubes, 0, 0);

  //play again

  var playAgainRestart = document.getElementById("play-again");
  ctx.drawImage(playAgainRestart, 0, 0);
}


//Game start method

function start() {
  const allSelectButtons = document.querySelectorAll('.beverage-item-button');
  cacheImages();
  allSelectButtons.forEach(button => {
    button.addEventListener("click", onBeverageSelectClick);
  })
  cubeCounterElement.textContent = 0;
  const droppableArea = document.querySelector('.droppable-area-text');
  droppableArea.addEventListener("dragenter", handleDragEnter);
  droppableArea.addEventListener("dragover", handleDragOver);
  droppableArea.addEventListener("dragleave", handleDragLeave);
  droppableArea.addEventListener("drop", handleDragDrop);

  updateMain('coke');
};

// drag and drop events


function handleDragLeave(e) {
  e.target.style.transform = "scale(1)";
}
function handleDragOver(e) {
  e.preventDefault();
}

function handleDragEnter(e) {
  e.target.style.transitionDuration = "300ms";
  e.target.style.transform = "scale(1.2)";
}

function handleDragDrop(e) {
  event.preventDefault();
  
  if (e.target.className === 'droppable-area-text') {
    incrementSugar();
    e.target.style.transform = "scale(1)";
    var audio = new Audio('./assets/audios/audio.mp3');
    audio.play()
  }
}
//Sugar count and increment function

function incrementSugar() {
  if (sugarLevel.filled < sugarLevel.totalValue) {
    sugarLevel.cubeCount = sugarLevel.cubeCount + 1;
    sugarLevel.filled = sugarLevel.filled + 4;
    cubeCounterElement.textContent = sugarLevel.cubeCount;
    sugarLevel.progress = ((sugarLevel.filled / sugarLevel.totalValue) * 100 >= 100) ? 100 : (sugarLevel.filled / sugarLevel.totalValue) * 100;
    const jQueryMainImage = $("#main-image");
    //jQueryMainImage.loadgo();
    jQueryMainImage.loadgo('options', { direction: 'bt' });
    jQueryMainImage.loadgo('setprogress', sugarLevel.progress);
    console.log(sugarLevel);
  }
}


//update the main image with dataset beverage image 

function onBeverageSelectClick(e) {
  updateMain(this.dataset.beverage);
}

//cache the main image from beverages

function cacheImages() {
  beverages.forEach(beverage => {
    beverage.image.src = `${imageServerEndpoint}${beverage.name}.png`;
  });
}

//updating the main image from beverages img

function updateMain(newBeverageName) {
  const newMainBeverage = beverages.find(beverage => beverage.name === newBeverageName);
  mainimage.src = newMainBeverage.image.src;
  
  audio = new Audio('./assets/audios/pork.mp3');
  audio.play(); 

  sugarLevel.cubeCount = 0;
  sugarLevel.progress = 0;
  sugarLevel.totalValue = newMainBeverage.sugar;
  sugarLevel.filled = 0;
  sugarLevel.currentDrink = newMainBeverage.name;
  cubeCounterElement.textContent = sugarLevel.cubeCount;
  remarks.textContent = remarksArray[0];
  console.log(sugarLevel);

  const jQueryMainImage = $("#main-image");
  jQueryMainImage.loadgo();
  jQueryMainImage.loadgo('options', { direction: 'bt' });
  jQueryMainImage.loadgo('setprogress', 0);
}

//sharing buttons

$(".js-popup").click(function() {
  var leftPosition, topPosition;
  leftPosition = window.screen.width / 2 - (566 / 2 + 10);
  topPosition = window.screen.height / 2 - (576 / 2 + 50);
  var url = $(this).data("href");
  window.open(
    url,
    'name_' + Math.random(),
    "status = 1, height = 576, width = 566, resizable = 0,left=" +
      leftPosition +
      ",top=" +
      topPosition +
      ",screenX=" +
      leftPosition +
      ",screenY=" +
      topPosition +
      ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no"
  );
});


//Game over Or Play again function that restart's the game

function GameOver(){
  let playagain = document.getElementById("play-again");
  playagain.addEventListener('click', () => {
    mainimage.src = './assets/beverages/coke.png';
    sugarLevel.cubeCount = 0;
    sugarLevel.progress = 0;
    remarks.textContent = remarksArray[0];
    sugarLevel.filled = 0;
    cubeCounterElement.textContent = sugarLevel.cubeCount;
    const ResetMainImage = $("#main-image");
    ResetMainImage.loadgo();
    ResetMainImage.loadgo('options', { direction: 'bt' });
    ResetMainImage.loadgo('setprogress', 0);
  })
}

GameOver();


function Remarks() { 
  if(sugarLevel.cubeCount === 0){
    remarks.textContent = remarksArray[0];
  }

  if(sugarLevel.cubeCount === 1){
    remarks.textContent = remarksArray[1];
  }

  if(sugarLevel.cubeCount === 4){
    remarks.textContent = remarksArray[2];
  }

  if(sugarLevel.cubeCount === 6){
    remarks.textContent = remarksArray[3];
  }

  if(sugarLevel.cubeCount === 9){
    remarks.textContent = remarksArray[4];
  }

  if(sugarLevel.cubeCount === 11){
    remarks.textContent = remarksArray[5];
  }
}
Remarks();

//side thermometer that display the sugar value


// calculate progress from values as a percentage
var progress = sugarLevel.progress + 10;


function animateBar() {
  
  var height = 5; // height of bar
  
  setInterval(function() {
    // once the bar reaches the progress level, multiplied by the height of the thermometer / 100.
    if (height == progress) {
  
      clearInterval(id); // stop interval timer

    } else { // increase the height of the bar
      
      height = sugarLevel.progress * 2.5; // increase height by sugarValue
      // set height variable of bar
      document.getElementById("animate").style.height = height  +  "px";
    }
  }, 10);

}


/*

range.change((e) => {
  incImageFill(e.target.value);
});

range.mousemove((e) => {
  (e.which == 1) ? incImageFill(e.target.value) : '';
});

function reset() {
  currentImage.loadgo();
  currentImage.loadgo('options', { direction: 'bt' });
  currentImage.loadgo('setprogress', 0);
};

function incImageFill(value) {
  currentImage.loadgo('setprogress', value);
};
*/

