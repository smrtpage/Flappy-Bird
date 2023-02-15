let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 512;

let bird = new Image();
let backround = new Image();
let road = new Image();
let PipeBottom = new Image();
let PipeUp = new Image();

bird.src = "./img/bird.png";
backround.src = "./img/back.png";
road.src = "./img/road.png";
PipeBottom.src = "./img/pipeBottom.png";
PipeUp.src = "./img/pipeUp.png";

let fly_audio = new Audio();
let score_audio = new Audio();

fly_audio.src = "./audio/fly.mp3";
score_audio.src = "./audio/score.mp3";

let xPos = 10;
let yPos = 150;

let gravity = 0.2;
let velY = 0;

gap = 120;

let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0,
};

let scoreText = document.getElementById("score");
let bestScoreText = document.getElementById("best_score");

let score = 0;
let bestScore = 0;

function draw(){
    if(state) {
    context.drawImage(backround, 0, 0);
    context.drawImage(bird, xPos, yPos);

    if (yPos + bird.height >= canvas.height - road.height) {
        reload()
    }
    velY += gravity;
    yPos += velY;

    for(let i = 0; i < pipe.length; i++){
        if(pipe[i].x < -PipeUp.width){
            pipe.shift();
        }else{
            context.drawImage(PipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(PipeBottom, pipe[i].x, pipe[i].y + PipeUp.height + gap);
        pipe[i].x -= 2;

        if(pipe[i].x == 50){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * PipeUp.height) - PipeUp.height,
            });
        }
        }

        if( xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + PipeUp.width &&
            (yPos <= pipe[i].y + PipeUp.height ||
            yPos + bird.height >= pipe[i].y + PipeUp.height + gap)){
            reload();
        }

        if (pipe[i].x == 0) {
            score++;
            score_audio.play()
        }

        // if(score >= 10){
        //     gap = 100;
        // }
    }

    context.drawImage(road, 0, canvas.height - road.height);

    scoreText.innerHTML = "SCORE: " + score;
    bestScoreText.innerHTML = "BEST SCORE: " + bestScore;
}
}


// canvas.addEventListener("mousedown", moveUp);

canvas.addEventListener("mousedown", function(event) {
    if(event.button == 0 ){
        moveUp();
    }
});

// document.addEventListener("keydown", function(event) {
//     if(event.code == "Space" ){
//         moveUp();
//     }
// });


function moveUp(){
    if(yPos > 0){
        velY = -4;
        fly_audio.play();

    }

}


function reload(){
    if (score > bestScore){
        bestScore = score;
    }
    xPos = 10;
    yPos = 150;
    velY = 0;
    score = 0;
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: 0,
    }

}

reload();

var state = true;
function game_pause(){
    state = !state;
}

setInterval(draw, 20);