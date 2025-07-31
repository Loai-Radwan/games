

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What is your name?");
  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-buttons").remove();
  // show the blocks 
blocks.forEach(block =>{
  block.classList.add("flipped");
  setTimeout( () =>{
    block.classList.remove("flipped");
  } ,3000)
})
};

let orderRange = [...Array(blocks.length).keys()];
let numberOfTries = 0;
let triesElement = document.querySelector(".info-container .tries span");
triesElement.innerHTML = numberOfTries;

shuffle(orderRange);




// Add Order To Game Blocks

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip block function

function flipBlock(selected) {
  selected.classList.add("flipped");

  //collect all flipped cards
  let allFlippedBlocks = blocks.filter((ele) =>
    ele.classList.contains("flipped")
  );

  if (allFlippedBlocks.length === 2) {
    //Stop clicking function
    stopClicking();

    //check matched block function
    checkMatches(allFlippedBlocks[0], allFlippedBlocks[1]);

    checkFinish();
  }
}

function checkMatches(firstBlock, secondBlock) {
  triesElement.innerHTML = numberOfTries;
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");
    firstBlock.classList.add("match");
    secondBlock.classList.add("match");
    document.getElementById("success").play();
  } else {
    numberOfTries++;
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
    document.getElementById("error").play();
  }
}

function checkFinish() {
  let still = blocks.filter((block) => !block.classList.contains("match"));
  console.log(still);
  if (still.length === 0) {
    document.querySelector(
      ".win h2"
    ).innerHTML = `Well done <span>${document.querySelector('.name span').innerHTML}</span>, You won`;
    document.querySelector(".win").classList.add("win-page");
    new Audio("./audio/win.mp3").play();
  }
}

function stopClicking() {
  //Add class no clicking on main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(function () {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];

    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
