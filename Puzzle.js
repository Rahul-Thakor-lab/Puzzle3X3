//variable initilization
let tryle = 0, empty = 8, block9;
let arrImg = ["img/image1.jpeg",
  "img/image2.jpg", "img/image3.jpg",
  "img/image4.jpg", "img/image5.jpg"];
let idxImg = Math.floor(Math.random() * arrImg.length);

//function
function mkSpc() {
  let block;
  for (let i = 0; i <= 7; i++) {
    block = document.getElementById(`block${i + 1}`);
    block.style.backgroundImage = `url(${arrImg[idxImg]})`;
  }
  scrame();
}

function scrame() {
  let source;//the tile index to swap with the empty space.
  let direction;//random number between 0 and 10, used to decide the move direction(left-right/top-down).
  let col;//column position of the empty tile.
  let row;//row position of the empty tile.
 
  if (block9 != null) {
    location.reload();
  }
  else {
    for (let i = 1; i <= 100; i++) {//Perform 100 random moves to scramble the puzzle
      direction = Number((Math.random() * 10).toFixed(1));

      if (direction < 5) {//With 50% chance, move left or right (horizontal).
        col = empty % 3;
        if (col == 0 || (col == 1 && direction < 2.5)) {
          /*
          -position like:
          0 1 2
          3 4 5
          6 7 8
          -If empty is in column 0 (left), only allow right move(0%3=0,3%3=0,6%3=0).
          -If empty is in column 1 (middle), randomly choose left/right(1%3=1,4%3=1,7%3=1).
          -If empty is in column 2 (right), move left(2%3=2,5%3=2,8%3=2).
          */
          source = empty + 1;//right move
        }
        else {
          source = empty - 1;//left move
        }
      }
      else {//Otherwise, move up or down (vertical).
        row = Math.floor(empty / 3);
        if (row == 0 || (row == 1 && direction < 7.5)) {
          /*
          -position like:
          0 1 2
          3 4 5
          6 7 8
          -If empty is in row 0 (top), only allow down move(0/3=0,1/3=0,2/3=0).
          -If empty is in row 1 (middle), randomly choose top/down(3/3=1,4/3=1,5/3=1).
          -If empty is in column 2 (down), move top(6/3=2,7/3=2,8/3=2).
          */
          source = empty + 3;//down move
        }
        else {
          source = empty - 3;//top move
        }
      }
      scrameSwap(source);
    }
  }
}

function scrameSwap(source) {
  let block = document.getElementById("space" + source).children[0];
  document.getElementById("space" + empty).append(block);
  empty = source;
}

function moveBlock(source) {
  let distance = Math.abs(empty - source);
  if (distance == 1) {
    let rowS = Math.floor(source / 3);
    let rowE = Math.floor(empty / 3);
    if (rowS == rowE) {
      let block = document.getElementById("space" + source).children[0];
      document.getElementById("space" + empty).append(block);
      empty = source;
      tryle++;
      chkWinner();
    }
  }
  else if (distance == 3) {
    let block = document.getElementById("space" + source).children[0];
    document.getElementById("space" + empty).append(block);
    empty = source;
    tryle++;
    chkWinner();
  }
  else { }
}

function chkWinner() {
  let blocks = document.querySelectorAll(".block");
  let blockVal, spaceVal;
  for (let block of blocks) {
    spaceVal = Number(block.parentElement.getAttribute("value"));
    blockVal = Number(block.getAttribute("value"));
    if (blockVal != spaceVal) { return; }
  }
  winner();
}

function winner() {
  block9 = document.createElement("div");
  block9.setAttribute("id", "block9");
  block9.setAttribute("class", "block");
  block9.innerHTML = `<div class="blockNo">
   <span>9</span>
   </div>`;
  block9.style.backgroundImage = `url(${arrImg[idxImg]})`;
  document.getElementById("space8").append(block9);

  let spcs = document.querySelectorAll(".space");
  for (let spc of spcs) {
    spc.style.margin = "0px";
    spc.children[0].style.border = "none";
    spc.style.transition = "margin 1s,border 1s";
    setTimeout(() => {
      spc.children[0].removeChild(spc.children[0].children[0]);
    }, 1000);
  }
  setTimeout(() => {
    document.getElementById('msgtxt').innerText = `Solve in ${tryle} try..`;
    document.getElementById('popup').classList.add('active');
  }, 2000);

}

//event
for (let i = 0; i <= 8; i++) {
  document.getElementById("space" + i).addEventListener("click", () => {
    moveBlock(i);
  });
}

document.getElementById("btnScrame").addEventListener("click", () => {
  scrame();
});

document.getElementById('clsbtn').addEventListener(
  "click", () => {
    document.getElementById('popup').classList.remove('active');
  }
);

let uImg = document.getElementById("input-file");
let blocks = document.querySelectorAll(".block");

uImg.addEventListener("input", () => {
  let b9 = document.getElementById("block9");
  if (b9 != null)
    b9.remove();
  scrame();
  arrImg[idxImg] = URL.createObjectURL(uImg.files[0]);
  let arrimgtype = ['image/jpeg', 'image/jpg', 'image/png'];
  if (arrimgtype.indexOf(uImg.files[0].type) > -1) {
    for (let block of blocks) {
      block.style.backgroundImage = `url(${arrImg[idxImg]})`;
    }
  }
  else
    alert("Please Select Only .jpg Image File ");
});
//calling
mkSpc();
