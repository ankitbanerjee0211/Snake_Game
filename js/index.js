// Constants & Variables
let inputDir = {x: 0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameOver.mp3');
const moveSound = new Audio('music/move.mp3');
const backgroundMusic = new Audio('music/music.mp3');
let speed = 6;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    {x: 13, y:15}
];

food = {x: 6, y: 7};

// Game Functions
// Game loop
function main(ctime){
    window.requestAnimationFrame(main);
    // decreasing the FPS
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
// here ctime == curent time
// lastPaintTime == last screen rendering time

// when the snake collides
function isCollide(snake){
    // if it bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }

    }
    // if it bumps into wall or exit the window
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

    return false;
}


function gameEngine(){
    backgroundMusic.play();
    // Part 1: Updating the snake array and Food
    // checking if the snake collided
    if(isCollide(snakeArr)){
        gameOverSound.play();
        backgroundMusic.pause();
        inputDir = {x: 0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y:15}];
        backgroundMusic.play();
        score = 0;
    }
    
    // If the snake eats a food then increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        // adds on the first index of the array
        foodSound.play();
        // incrementing the score
        score += 1;
        // updateing the highscore value
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        document.getElementById("scoreBox").style.right = "10vmin";
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        // above code will add a body element to the snake body
        let a = 2;
        let b = 16;
        // creating the next food
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
    
    }
    
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    // i is initiated from the next to last body element
    
    // incrementing the snake head
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    // Part 2: Render/Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        // creating a div
        snakeElement = document.createElement('div');
        // specifying location of snake head
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // to add style
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // e -> element

    // Part 3: Render/Display the food
    // creating a div
    foodElement = document.createElement('div');
    // specifying location of food
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    // to add style
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main logics
// setting or fetching highscore
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "High score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1}; // Starting the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});