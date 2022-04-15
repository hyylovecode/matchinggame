import "./jquery-3.6.0.js";

const pictures = [
  "icon---tinder",
  "icon-adobe-illustrator",
  "icon-adobe-photoshop",
  "icon-amazon",
  "icon-android-os",
  "icon-apple-phone",
  "icon-bitcoin",
  "icon-chrome",
  "icon-facebook",
  "icon-facebook-messenger",
  "icon-flickr",
  "icon-github",
  "icon-gmail-new",
  "icon-google-drive",
  "icon-google-logo",
  "icon-google-play",
  "icon-instagram-new",
  "icon-instagram-new-2",
  "icon-league-of-legends",
  "icon-mac-os",
  "icon-netflix",
  "icon-paypal",
  "icon-python",
  "icon-safari",
  "icon-selenium-test-automation",
  "icon-skype",
  "icon-spotify",
  "icon-stackoverflow",
  "icon-starbucks",
  "icon-steam",
  "icon-terraria",
  "icon-tiktok",
  "icon-twitch",
  "icon-twitter",
  "icon-visa",
  "icon-weibo",
  "icon-weixing",
  "icon-whatsapp",
  "icon-windows-10",
  "icon-youtube-play",
];

var matrix = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
];

let width = 19;
let height = 12;
let score = 0;
let count = 0;
let totalNum = (width - 2) * (height - 2);
let usedPictureLen = pictures.length;
let average = Math.ceil(totalNum / usedPictureLen);
let lastX = -1;
let lastY = -1;
let picToCoordinates = [];

$("#shuffle").bind("click", shuffle);
$("#restart").bind("click", restart);
$("#tip").bind("click", tip);

function render() {
  $("#main").empty();
  for (let y = 0; y < matrix.length; y++) {
    // <table><tr id='row1'></tr>
    let rowId = "row" + y.toString();
    $("#main").append(`<tr id='${rowId}'></tr>`);
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === -1) {
        $("#" + rowId).append("<td></td>");
      } else {
        let pic = matrix[y][x];
        let picId = pictures[pic];
        //<use xlink:href='#icon-youtube-play'></use>
        let id = getId(x, y);
        let tdId = getTdId(x, y);
        let svgId = `svg-${id}`;
        $("#" + rowId).append(
          `<td id='${tdId}'>
            <i class='icon-adobe-illustrator'>
              <svg id='${svgId}' class='num'>
                <use xlink:href='#${picId}' />
              </svg>
            </i>
           </td>`
        );
        $("#" + tdId).bind("click", function () {
          clicked(x, y);
        });
      }
    }
  }
}

function getId(x, y) {
  return "x" + x.toString() + "y" + y.toString();
}

function getTdId(x, y) {
  return `td-${getId(x, y)}`;
}

function createGame() {
  if (average % 2 === 1) {
    average++;
  }
  let a = [];

  for (let i = 0; i < totalNum; i++) {
    let t = Math.floor(i / average);
    a[i] = t >= usedPictureLen ? 39 : t;
  }

  for (let i = 0; i < totalNum; i++) {
    let temp = a[i];
    let random = Math.floor(a.length * Math.random());
    a[i] = a[random];
    a[random] = temp;
  }

  let k = 0;
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      matrix[i][j] = a[k++];
    }
  }
  for (let i = 0; i < height; i++) {
    matrix[i][0] = -1;
    matrix[i][width - 1] = -1;
  }
  for (let i = 0; i < width; i++) {
    matrix[0][i] = -1;
    matrix[height - 1][i] = -1;
  }
}

function bgMusicPlay() {
  var audio = new Audio("./sounds/bgmusic3.mp3");
  audio.loop = true;
  audio.play();
}

function restart() {
  bgMusicPlay();
  createGame();
  render();
  score = 0;
  $("#score").text(`${score} %`);
  createPicToCoordinates();
  console.log(picToCoordinates);
  getTip();
}

function createPicToCoordinates() {
  for (let i = 0; i < pictures.length; i++) {
    picToCoordinates[i] = [];
  }
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (matrix[y][x] != -1) {
        let pair = [x, y];
        picToCoordinates[matrix[y][x]].push(pair);
      }
    }
  }
}

function isConnected1(x1, y1, x2, y2) {
  if (x1 === x2 && y1 === y2) {
    return false;
  }
  if (x1 === x2) {
    let yMin = Math.min(y1, y2);
    let yMax = Math.max(y1, y2);
    for (let y = yMin + 1; y < yMax; y++) {
      if (matrix[y][x1] != -1) {
        return false;
      }
    }
    return true;
  }
  if (y1 === y2) {
    let xMin = Math.min(x1, x2);
    let xMax = Math.max(x1, x2);
    for (let x = xMin + 1; x < xMax; x++) {
      if (matrix[y1][x] != -1) {
        return false;
      }
    }
    return true;
  }
}

function isConnected2(x1, y1, x2, y2) {
  if (x1 != x2 && y1 != y2) {
    return (
      (isConnected1(x1, y1, x2, y1) &&
        isConnected1(x2, y1, x2, y2) &&
        matrix[y1][x2] === -1) ||
      (isConnected1(x1, y1, x1, y2) &&
        isConnected1(x1, y2, x2, y2) &&
        matrix[y2][x1] === -1)
    );
  } else {
    return isConnected1(x1, y1, x2, y2);
  }
}

function isConnected3(x1, y1, x2, y2) {
  if (x1 === x2 && y1 === y2) {
    return false;
  }
  //console.log(x1, y1, x2, y2);
  if (matrix[y1][x1] === matrix[y2][x2] && matrix[y1][x1] != -1) {
    if (isConnected2(x1, y1, x2, y2)) {
      return true;
    }
    let x = x1 + 1;
    while (x < width && matrix[y1][x] === -1) {
      if (isConnected2(x, y1, x2, y2)) {
        return true;
      }
      x++;
    }
    x = x1 - 1;
    while (x >= 0 && matrix[y1][x] === -1) {
      if (isConnected2(x, y1, x2, y2)) {
        return true;
      }
      x--;
    }
    let y = y1 + 1;
    while (y < height && matrix[y][x1] === -1) {
      if (isConnected2(x1, y, x2, y2)) {
        return true;
      }
      y++;
    }
    y = y1 - 1;
    while (y >= 0 && matrix[y][x1] === -1) {
      if (isConnected2(x1, y, x2, y2)) {
        return true;
      }
      y--;
    }
  }
  return false;
}

function play() {
  var audio = new Audio("./sounds/eliminate.wav");
  audio.play();
}

function clicked(x, y) {
  untip();
  if (lastX === -1 || !isConnected3(lastX, lastY, x, y)) {
    let id = getTdId(lastX, lastY);
    $(`#${id}`).removeClass("boardered");
    lastX = x;
    lastY = y;
    id = getTdId(lastX, lastY);
    if (matrix[y][x] != -1) {
      $(`#${id}`).addClass("boardered");
    }
  } else {
    //eliminate
    play();
    let id1 = getTdId(x, y);
    let id2 = getTdId(lastX, lastY);
    $(`#${id2}`).removeClass("boardered");

    let pictures = picToCoordinates[matrix[y][x]];
    for (let i = 0; i < pictures.length; i++) {
      let pic = pictures[i];
      if (
        (pic[0] === x && pic[1] === y) ||
        (pic[0] === lastX && pic[1] === lastY)
      ) {
        picToCoordinates[matrix[y][x]].splice(i, 1);
        i--;
      }
    }
    console.log(picToCoordinates);

    $("#" + id1).empty();
    $("#" + id2).empty();
    matrix[y][x] = -1;
    matrix[lastY][lastX] = -1;
    lastX = -1;
    lastY = -1;
    count += 2;
    score = Math.floor((count / totalNum) * 100);
    $("#score").text(`${score} %`);
    if (score === 100) {
      setTimeout(function () {
        alert("you won the game!");
      }, 100);
    }

    getTip();
  }
}

function getTip() {
  //if have tip,return two coorodinates.else return alert.
  let picturesLength = Math.ceil(totalNum / average);
  for (let i = 0; i < picturesLength; i++) {
    let pic = picToCoordinates[i];
    for (let j = 0; j < pic.length - 1; j++) {
      for (let k = j + 1; k < pic.length; k++) {
        let left = pic[j];
        let right = pic[k];
        if (isConnected3(left[0], left[1], right[0], right[1])) {
          let a = [
            [right[0], right[1]],
            [left[0], left[1]],
          ];
          console.log(a);
          return a;
        }
      }
    }
  }
  alert("No solution.Please shuffle.");
}

function shuffle() {
  let shuffleArray = [];
  let k = 0;
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      if (matrix[i][j] != -1) {
        shuffleArray[k++] = matrix[i][j];
      }
    }
  }
  for (let i = 0; i < shuffleArray.length; i++) {
    let temp = shuffleArray[i];
    let random = Math.floor(shuffleArray.length * Math.random());
    shuffleArray[i] = shuffleArray[random];
    shuffleArray[random] = temp;
  }
  k = 0;
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      if (matrix[i][j] != -1) {
        matrix[i][j] = shuffleArray[k++];
      }
    }
  }

  render();
  createPicToCoordinates();
  console.log(picToCoordinates);
  getTip();
}

function untip() {
  $(".highlight").removeClass("highlight");
  $(".dim").removeClass("dim");
}

function tip() {
  $(".num").addClass("dim");
  const [[x1, y1], [x2, y2]] = getTip();
  const id1 = getId(x1, y1);
  const id2 = getId(x2, y2);
  $(`#svg-${id1}`).addClass("highlight");
  $(`#svg-${id2}`).addClass("highlight");
}
