"use strict"
// CONST
const RGB = 0;
const HSL = 1;
const modes = ["RGB", "HSL"];

const EASY = 0;
const HARD = 1;
const MASTER = 2;
const levels = [3, 6, 9];

// VAR
var color;
var mode = RGB;
var pickedColor;
var level = HARD;

// EventListener
document.querySelector("#easy").addEventListener(
    "click", () => {changeDifficulty(EASY) }
);
document.querySelector("#hard").addEventListener(
    "click", () => {changeDifficulty(HARD) }
);
document.querySelector("#master").addEventListener(
    "click", () => {changeDifficulty(MASTER) }
);
document.querySelector("#reset").addEventListener(
    "click", () => {reset() }
);
document.querySelector("#mode").addEventListener(
    "click", () => {changeMode() }
);

function addListenerBoard() {
    let el = document.querySelectorAll(".color-block");
    el.forEach( (element,index) => {
        element.addEventListener("click", () => blockPush(index) )
    })
}

// Generate random color (ok)

let randInt = (max) => Math.floor(Math.random() * Math.floor(max));

function randColorRGB() { 
    let red = randInt(255);
    let green = randInt(255);
    let blue = randInt(255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function randColorHSL() {
    let hue = randInt(360);
    let saturation = randInt(100);
    let lightness = randInt(100);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function randColor(type = RGB) {
    return (type === RGB) ? randColorRGB() : randColorHSL();
}

// update DOM
function updateColor(color) {
    let el = document.querySelectorAll(".color-block");
    el.forEach( (element,index) => { 
        element.style.backgroundColor = color[index]; 
    });
}

function updatePickedColor(color, pickedColor) {
    let el = document.querySelector("#question-color");
    el.innerHTML = color[pickedColor].toUpperCase();
}

function generateBoard(size) {
    return ('<div class="color-block"></div>').repeat(size);
}

function reset() {
    let squaresNumber = levels[level];
    color = Array(squaresNumber).fill().map(() => randColor(mode));
    pickedColor = randInt(color.length);

    // DOM update
    document.querySelector("#board").innerHTML = generateBoard(squaresNumber);
    document.querySelector("#info").style.backgroundColor = "steelblue";
    document.querySelector("#info-win").innerHTML = "Pickup a color";
    document.querySelector("#mode").innerHTML =  (`${modes[mode]} MODE`).toUpperCase();
    updateColor(color);
    updatePickedColor(color, pickedColor);

    addListenerBoard();
}

function changeDifficulty(leveltmp) {
    level = leveltmp; //global var
    document.querySelectorAll('.selected').forEach( el => {el.classList.remove("selected")});
    document.querySelectorAll(`.level`)[leveltmp].classList.add("selected");
    reset();
}

function changeMode() {
    mode = (mode + 1) % modes.length; //global var
    reset();
}

function blockPush(index) {
    if (index === pickedColor) {
        document.querySelector("#info-win").innerHTML = "You have win";
        let el = document.querySelectorAll('.color-block');
        updateColor(color.fill(color[index]));
        document.querySelector("#info").style.backgroundColor = color[pickedColor];
        el.forEach((element,i) => { 
            element.classList.remove("hidden");
            element.addEventListener("click", () => blockPush);
        })
    }
    else {
        document.querySelector("#info-win").innerHTML = "Retry";
        document.querySelectorAll(".color-block")[index].classList.add("hidden");
    }
}

let init = () => { reset()};

init();