let packMan = document.getElementById('packMan');
let offSetLeftFild = document.getElementsByClassName('packMan-Fild')[0].offsetWidth;
let offSetTopFild = document.getElementsByClassName('packMan-Fild')[0].offsetHeight;
let i = 'left';


document.onkeydown = function () {

    switch (event.keyCode) {

        case 37 :
            clearInterval(i);
            i = 'left';
            packMan.removeAttribute("class");
            packMan.classList.add("move-left");
            i = setInterval((() => (packMan.offsetLeft > 0 ?
                packMan.style.left = packMan.offsetLeft - 1 + "px" : clearInterval(i))), 20);
            break;
        case 38:
            clearInterval(i);
            i = 'top';
            packMan.removeAttribute("class");
            packMan.classList.add("move-top");
            i = setInterval((() => (packMan.offsetTop > 0 ?
                packMan.style.top = packMan.offsetTop - 1 + "px" : clearInterval(i))), 20);

            break;
        case 39:
            clearInterval(i);
            i = 'right';
            packMan.removeAttribute("class");
            packMan.classList.add("move-right");
            i = setInterval((() => (packMan.offsetLeft < (offSetLeftFild - packMan.offsetWidth) ?
                packMan.style.left = packMan.offsetLeft + 1 + "px" : clearInterval(i))), 20);
            break;
        case 40:
            clearInterval(i);
            i = 'bottom';
            packMan.removeAttribute("class");
            packMan.classList.add("move-bottom");
            i = setInterval((() => (packMan.offsetTop < (offSetTopFild - packMan.offsetHeight) ?
                packMan.style.top = packMan.offsetTop + 1 + "px" : clearInterval(i))), 20);
            break;
        case 32:
            clearInterval(i);
            i = 'left';
            break;
        case 16:
            newFruit();
            break;
    }
};
let arrSrc=["img/lollipop.png","img/burger.png",
    "img/candy.png","img/corn.png","img/fish.png","img/gingerbread-man.png",
    "img/lobster.png","img/pear.png","img/tomato.png"]
let fruits;
let newFruit = function () {
    let newImg = document.createElement('img');
    newImg.className = 'fruit';
    newImg.src = arrSrc[Math.round(Math.random() * (8 - 0))];
    newImg.style.top=Math.round(Math.random() * ((offSetTopFild -(packMan.clientWidth))- 0))+"px";
    newImg.style.left =Math.round(Math.random() * ((offSetLeftFild-(packMan.clientHeight)) - 0))+"px";
    document.getElementsByClassName('packMan-Fild')[0].appendChild(newImg);
    fruits= document.getElementsByClassName('fruit')[0];
};
let newStart = function () {
    document.getElementsByClassName('packMan-Fild')[0].removeChild(fruits);
    newFruit();
};
let g=setInterval((() => (Math.abs(packMan.offsetLeft - fruits.offsetLeft) < 20
&& Math.abs(packMan.offsetTop - fruits.offsetTop) < 20) ? newStart() : false), 50);
newFruit();