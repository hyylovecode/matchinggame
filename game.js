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

const width = 18, height = 12;
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
            $("#row" + i.toString()).append("<td><i class='icon-adobe-illustrator'><svg class='num'><use xlink:href='#" + picId + "'></use></svg></i></td>");
        }
    }
}

function createGame() {
    let totalNum = width * height;
    let average = Math.floor(totalNum / pictures.length);
    if (average % 2 === 1) {
        average++;
    }
    let a = [];

    for (let i = 0; i < totalNum; i++) {
        let t = Math.floor(i / average);
        a[i] = t >= pictures.length ? 1 : t;
    }

    for (let i = 0; i < totalNum; i++) {
        let temp = a[i];
        let random = Math.floor(a.length * Math.random());
        a[i] = a[random];
        a[random] = temp;
    }

    let k = 0;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            matrix[i][j] = a[k++];
        }
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
            if (matrix[x1][y] != -1) {
                return false;
            }
        }
        return true;
    }
    if (y1 === y2) {
        let xMin = Math.min(x1, x2);
        let xMax = Math.max(x1, x2);
        for (let x = xMin + 1; x < xMax; x++) {
            if (matrix[x][y1] != -1) {
                return false;
            }
        }
        return true;
    }
}

function isConnected2(x1, y1, x2, y2) {
    if (x1 != x2 && y1 != y2) {
        return (isConnected1(x1, y1, x2, y1) && isConnected1(x2, y1, x2, y2) && matrix[x2][y1] === -1)
            || (isConnected1(x1, y1, x1, y2) && isConnected1(x1, y2, x2, y2) && matrix[x1][y2] === -1);
    }
    else {
        return isConnected1(x1, y1, x2, y2);
    }
}

function isConnected3(x1, y1, x2, y2) {
    if (isConnected2(x1, y1, x2, y2)) {
        return true;
    }
    if (matrix[x1][y1] === matrix[x2][y2]) {
        let x = x1 + 1;
        while (x < width && matrix[x][y1] === -1) {
            if (isConnected2(x, y1, x2, y2)) {
                return true;
            }
            x++;
        }
        x = x1 - 1;
        while (x >= 0 && matrix[x][y1] === -1) {
            if (isConnected2(x, y1, x2, y2)) {
                return true;
            }
            x--;
        }
        let y = y1 + 1;
        while (y < height && matrix[x1][y] === -1) {
            if (isConnected2(x1, y, x2, y2)) {
                return true;
            }
            y++;
        }
        y = y1 - 1;
        while (y >= 0 && matrix[x1][y] === -1) {
            if (isConnected2(x1, y, x2, y2)) {
                return true;
            }
            y--;
        }
    }
    return false;
}

$("#restart").bind("click", restart);

