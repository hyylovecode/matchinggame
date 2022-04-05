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

const width = 19, height = 12;
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

function init() {
    $("#main").empty();
    for (let i = 0; i < matrix.length; i++) {
        // <table><tr id='row1'></tr>
        $("#main").append("<tr id='row" + i.toString() + "'></tr>");
        for (let j = 0; j < matrix[i].length; j++) {
            let pic = matrix[i][j];
            let picId = pictures[pic];
            //<use xlink:href='#icon-youtube-play'></use>
            let id = getId(j, i);
            $("#row" + i.toString()).append("<td id='" + id + "'><i class='icon-adobe-illustrator'><svg class='num'><use xlink:href='#" + picId + "'></use></svg></i></td>");
            $("#" + id).bind("click", function () {
                clicked(j, i);
            });
        }
    }
}

function getId(x, y) {
    return "x" + x.toString() + "y" + y.toString();
}

function createGame() {
    let usedPictureLen = pictures.length;
    let totalNum = (width - 2) * (height - 2);
    let average = Math.ceil(totalNum / usedPictureLen);
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

function restart() {
    createGame();
    init();
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
        return (isConnected1(x1, y1, x2, y1) && isConnected1(x2, y1, x2, y2) && matrix[y1][x2] === -1)
            || (isConnected1(x1, y1, x1, y2) && isConnected1(x1, y2, x2, y2) && matrix[y2][x1] === -1);
    }
    else {
        return isConnected1(x1, y1, x2, y2);
    }
}

function isConnected3(x1, y1, x2, y2) {
    if (x1 === x2 && y1 === y2) {
        return false;
    }
    console.log(x1, y1, x2, y2);
    if (matrix[y1][x1] === matrix[y2][x2]) {
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

let lastX = -1;
let lastY = -1;
function clicked(x, y) {
    if (lastX === -1 || !isConnected3(lastX, lastY, x, y)) {
        lastX = x;
        lastY = y;
    }
    else {
        //eliminate
        let id1 = getId(x, y);
        let id2 = getId(lastX, lastY);
        $("#" + id1).empty();
        $("#" + id2).empty();
        matrix[y][x] = -1;
        matrix[lastY][lastX] = -1;
        lastX = -1;
        lastY = -1;

    }
}

$("#restart").bind("click", restart);

