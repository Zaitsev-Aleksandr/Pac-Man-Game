let packMan = document.getElementById('packMan');
let offSetLeftFild = document.getElementsByClassName('packMan-Fild')[0].offsetWidth;
let offSetTopFild = document.getElementsByClassName('packMan-Fild')[0].offsetHeight;
let i = 'left';
let Total = document.getElementById('total');
let Bot;
Total.value = 0;
document.onkeydown = function () {

    switch (event.keyCode) {
        case 37 :
            clearInterval(i);
            i = 'left';
            packMan.removeAttribute("class");
            packMan.classList.add("move-left");
            i = setInterval((() => (packMan.offsetLeft > 0 ?
                packMan.style.left = packMan.offsetLeft - 1 + "px" : clearInterval(i))), 3);
            break;
        case 38:
            clearInterval(i);
            i = 'top';
            packMan.removeAttribute("class");
            packMan.classList.add("move-top");
            i = setInterval((() => (packMan.offsetTop > 0 ?
                packMan.style.top = packMan.offsetTop - 1 + "px" : clearInterval(i))), 3);

            break;
        case 39:
            clearInterval(i);
            i = 'right';
            packMan.removeAttribute("class");
            packMan.classList.add("move-right");
            i = setInterval((() => (packMan.offsetLeft < (offSetLeftFild - packMan.offsetWidth) ?
                packMan.style.left = packMan.offsetLeft + 1 + "px" : clearInterval(i))), 3);
            break;
        case 40:
            clearInterval(i);
            i = 'bottom';
            packMan.removeAttribute("class");
            packMan.classList.add("move-bottom");
            i = setInterval((() => (packMan.offsetTop < (offSetTopFild - packMan.offsetHeight) ?
                packMan.style.top = packMan.offsetTop + 1 + "px" : clearInterval(i))), 3);
            break;

    }
};

//  ___________________building fruit_______________________________________-
let arrSrc = ["img/lollipop.png", "img/burger.png",
    "img/candy.png", "img/corn.png", "img/fish.png", "img/gingerbread-man.png",
    "img/lobster.png", "img/pear.png", "img/tomato.png"];
let fruits;
let newFruit = function () {
    let newImg = document.createElement('img');
    newImg.className = 'fruit';
    newImg.src = arrSrc[Math.round(Math.random() * (8 - 0))];
    newImg.style.top = Math.round(Math.random() * ((offSetTopFild - (packMan.clientWidth)) - 0)) + "px";
    newImg.style.left = Math.round(Math.random() * ((offSetLeftFild - (packMan.clientHeight)) - 0)) + "px";
    document.getElementsByClassName('packMan-Fild')[0].appendChild(newImg);
    fruits = document.getElementsByClassName('fruit')[0];
};
//  __________counting the fruits eaten______________________________
let newStart = function () {

    document.getElementsByClassName('packMan-Fild')[0].removeChild(fruits);
    Total.value = +Total.value + 1;
    newFruit();
};


setInterval((() => (Math.abs(packMan.offsetLeft - fruits.offsetLeft) < 25
    && Math.abs(packMan.offsetTop - fruits.offsetTop) < 25) ? newStart() : false), 50);

// ____________________________BOT pakMen______________________________________________
let createBot = function () {
    Bot = packMan.cloneNode(true);
    Bot.id = "BotPakMen";
    packMan.removeAttribute("class");
    packMan.classList.add("move-right");
    Bot.style.top = offSetTopFild - packMan.clientWidth + "px";
    Bot.style.left = offSetLeftFild + "px";
    packMan.parentNode.insertBefore(Bot, packMan.nextSibling);
    Bot = document.getElementById("BotPakMen");
};

//__________________________________   move BOT__________________________


let b = 'right';
let movesBot = function (coordinateDiff) {

    switch (coordinateDiff) {
        case 'left' :
            clearInterval(b);
            b = 'left';
            Bot.removeAttribute("class");
            Bot.classList.add("move-left");
            b = setInterval((() => (Bot.offsetLeft > 0 ?
                Bot.style.left = Bot.offsetLeft - 1 + "px" : clearInterval(b))), 300);
            break;
        case 'top':
            clearInterval(b);
            b = 'top';
            Bot.removeAttribute("class");
            Bot.classList.add("move-top");
            b = setInterval((() => (Bot.offsetTop > 0 ?
                Bot.style.top = Bot.offsetTop - 1 + "px" : clearInterval(b))), 300);
            break;
        case 'right':
            clearInterval(b);
            b = 'right';
            Bot.removeAttribute("class");
            Bot.classList.add("move-right");
            b = setInterval((() => (Bot.offsetLeft < (offSetLeftFild - Bot.offsetWidth) ?
                Bot.style.left = Bot.offsetLeft + 1 + "px" : clearInterval(b))), 300);
            break;
        case 'bottom':
            setInterval(b);
            b = 'bottom';
            Bot.removeAttribute("class");
            Bot.classList.add("move-bottom");
            b = setInterval((() => (Bot.offsetTop < (offSetTopFild - Bot.offsetHeight) ?
                Bot.style.top = Bot.offsetTop + 1 + "px" : clearInterval(b))), 300);
            break;
    }
};
setInterval(function () {
        clearInterval(b);
        if (Math.abs(packMan.offsetLeft - Bot.offsetLeft) < 50 &&
            Math.abs(packMan.offsetTop - Bot.offsetTop) < 50) {
            document.getElementsByClassName('packMan-Fild')[0].removeChild(packMan);
        }
        else if (Math.abs(packMan.offsetTop - Bot.offsetTop) > Math.abs(packMan.offsetLeft - Bot.offsetLeft)) {
            if (packMan.offsetTop - Bot.offsetTop < 0) {
                movesBot("top")
            }
            else if (packMan.offsetTop - Bot.offsetTop > 0) {
                movesBot("bottom")
            }
        }

        else if (Math.abs(packMan.offsetTop - Bot.offsetTop) < Math.abs(packMan.offsetLeft - Bot.offsetLeft)) {
            if (packMan.offsetLeft - Bot.offsetLeft < 0) {
                movesBot("left")
            }
            else if (packMan.offsetLeft - Bot.offsetLeft > 0) {
                movesBot("right")
            }
        }
    }
    , 600
);


newFruit();
//createBot();
