// ==========================================
// Funny Flappy Bird
// Part 1
// ==========================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// UI
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const finalScore = document.getElementById("finalScore");
const finalBest = document.getElementById("finalBest");

const funnyMessage = document.getElementById("funnyMessage");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

// Sounds
const jumpSound = document.getElementById("jumpSound");
const scoreSound = document.getElementById("scoreSound");
const shabaashSound = document.getElementById("shabaashSound");
const gameOverSound = document.getElementById("gameOverSound");

// Canvas Size
canvas.width = 400;
canvas.height = 700;

// ==========================================
// Game Variables
// ==========================================

let score = 0;
let bestScore = localStorage.getItem("funnyBest") || 0;

bestScoreElement.innerText = bestScore;

let gameStarted = false;
let gameOver = false;

let gravity = 0.28;
let jumpPower = -7.2;

let pipes = [];

let frame = 0;

let pipeGap = 180;
let pipeWidth = 70;
let pipeSpeed = 3;

// ==========================================
// Bird
// ==========================================

const bird = {

    x: 90,

    y: 250,

    width: 42,

    height: 42,

    velocity: 0,

    rotation: 0

};

// ==========================================
// Funny Messages
// ==========================================

const messages = [

"😂 Khelna nahi aata hai kya?",
"💔 Better Luck Next Janam.",
"🐤 Bird ne notice period de diya.",
"🤣 Mummy ko bulaun? Theek ho na",
"🤦 Pipe se shaadi karni ha kya?",
"😴 Soya hua hai kya?",
"🚧 Pipe ko hug kar liya.",
"😂 Ye toh warm-up bhi nahi tha.",
"💀 Skill Issue Detected.",
"🙄 Bird bhi sharma gayi.",
"🪦 RIP Flying Career.",
"🫡 Respect for trying... bas trying hi thi.",
"🤦 Flying License Cancel.",
"🙃 Itna confidence kahan se aata hai?",
"😅 Kya entry maari... seedha exit.",
"🤭 Game tujhe khel raha hai.",
"🐔 Murga bhi better udd leta.",

];
let messageIndex = 0;

// ==========================================
// Draw Bird
// ==========================================

function drawBird(){

    ctx.save();

    ctx.translate(
        bird.x + bird.width/2,
        bird.y + bird.height/2
    );
    ctx.scale(-1, 1);     // Flip horizontally

    ctx.rotate(bird.rotation);

    ctx.font="38px Arial";

    ctx.strokeStyle = "#222";
ctx.lineWidth = 3;
ctx.strokeText("🐤", -20, 15);

ctx.fillStyle = "#FFD54F";
ctx.fillText("🐤", -20, 15);
    ctx.restore();

}

// ==========================================
// Update Bird
// ==========================================

function updateBird(){

    bird.velocity += gravity;

    // Limit falling speed
    if(bird.velocity > 6){
        bird.velocity = 6;
    }

    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height - 45) {
    bird.y = canvas.height - 45 - bird.height;
    endGame();
}

    // Hit Top

    if(bird.y<0){

        bird.y=0;

        bird.velocity=0;

    }

}

// ==========================================
// Jump
// ==========================================

function jump(){

    if(!gameStarted)
        return;

    if(gameOver)
        return;

    bird.velocity = jumpPower;

    jumpSound.currentTime = 0;

    jumpSound.play().catch(()=>{});

}

// ==========================================
// Draw Background
// ==========================================

function drawBackground(){

    // Sky

    ctx.fillStyle="#7fd8ff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Sun

    ctx.beginPath();

    ctx.arc(
        330,
        90,
        45,
        0,
        Math.PI*2
    );

    ctx.fillStyle="#FFD54F";

    ctx.fill();

    // Ground

    ctx.fillStyle="#63b94f";

    ctx.fillRect(
        0,
        canvas.height-45,
        canvas.width,
        45
    );

}

// ==========================================
// Game Over
// ==========================================

function endGame(){

    if(gameOver)
        return;

    gameOver=true;

    gameOverSound.currentTime=0;

    gameOverSound.play().catch(()=>{});
    const randomOut =
    outVoices[Math.floor(Math.random() * outVoices.length)];

setTimeout(() => {

    playVoice(randomOut);

}, 300);

    finalScore.innerText=score;

    if(score>bestScore){

        bestScore=score;

        localStorage.setItem(
            "funnyBest",
            bestScore
        );

    }

    finalBest.innerText=bestScore;

    bestScoreElement.innerText=bestScore;

    funnyMessage.innerText = messages[messageIndex];

messageIndex++;

if(messageIndex >= messages.length){
    messageIndex = 0;
}

    gameOverScreen.classList.remove("hidden");

}

// ==========================================
// Start Game
// ==========================================

function startGame(){

    score=0;

    frame=0;

    bird.y=250;

    bird.velocity=0;

    bird.rotation=0;

    pipes=[];

    pipeSpeed=3;

    gameStarted=true;

    gameOver=false;

    scoreElement.innerText=0;

    startScreen.classList.add("hidden");

    gameOverScreen.classList.add("hidden");

}

// ==========================================
// Controls
// ==========================================

startBtn.addEventListener(
    "click",
    startGame
);

restartBtn.addEventListener(
    "click",
    startGame
);

document.addEventListener(
    "keydown",
    function(e){

        if(e.code==="Space"){

            e.preventDefault();

            jump();

        }

    }
);

canvas.addEventListener(
    "click",
    jump
);

canvas.addEventListener(
    "touchstart",
    function(e){

        e.preventDefault();

        jump();

    }
);

// ==========================================
// Funny Flappy Bird
// Part 2
// ==========================================

// Draw Pipe
function drawPipe(pipe){

    // Top Pipe
    ctx.fillStyle = "#43A047";

    ctx.fillRect(
        pipe.x,
        0,
        pipeWidth,
        pipe.top
    );

    // Bottom Pipe
    ctx.fillRect(
        pipe.x,
        pipe.top + pipeGap,
        pipeWidth,
        canvas.height - (pipe.top + pipeGap) - 45
    );

    // Pipe Caps
    ctx.fillStyle="#2E7D32";

    ctx.fillRect(
        pipe.x-5,
        pipe.top-15,
        pipeWidth+10,
        15
    );

    ctx.fillRect(
        pipe.x-5,
        pipe.top+pipeGap,
        pipeWidth+10,
        15
    );

}

// ==========================================
// Create Pipes
// ==========================================

function createPipe(){

    const minHeight = 80;

    const maxHeight =
        canvas.height -
        pipeGap -
        180;

    const topHeight =
        Math.floor(
            Math.random() *
            (maxHeight-minHeight)
        ) + minHeight;

    pipes.push({

        x:canvas.width,

        top:topHeight,

        scored:false

    });

}

// ==========================================
// Update Pipes
// ==========================================

function updatePipes(){

    if(frame % 100 === 0){

        createPipe();

    }

    for(let i=0;i<pipes.length;i++){

        const pipe=pipes[i];

        pipe.x -= pipeSpeed;

        drawPipe(pipe);

        // Score

        if(
            !pipe.scored &&
            pipe.x + pipeWidth < bird.x
        ){

            pipe.scored=true;

            score++;

            scoreElement.innerText=score;

            scoreSound.currentTime=0;
            scoreSound.play().catch(()=>{});

            // Every 5 Points

            if(score % 5 == 0){

    const randomPoint =
        pointVoices[Math.floor(Math.random() * pointVoices.length)];

    setTimeout(() => {

        playVoice(randomPoint);

    }, 300);

}

            // Increase Difficulty

            if(score%10===0){

                pipeSpeed += 0.4;

            }

        }

        // Remove Old Pipe

        if(pipe.x + pipeWidth < -20){

            pipes.splice(i,1);

            i--;

        }

    }

}

// ==========================================
// Collision Detection
// ==========================================

function checkCollision(){

    for(let pipe of pipes){

        const hitX =

            bird.x + bird.width > pipe.x &&

            bird.x < pipe.x + pipeWidth;

        if(hitX){

            // Top Pipe

            if(

                bird.y < pipe.top

            ){

                endGame();

                return;

            }

            // Bottom Pipe

            if(

                bird.y + bird.height >

                pipe.top + pipeGap

            ){

                endGame();

                return;

            }

        }

    }

}

// ==========================================
// Draw Score Shadow
// ==========================================

function drawShadow(){

    ctx.fillStyle="rgba(0,0,0,.15)";

    ctx.beginPath();

    ctx.ellipse(

        bird.x+18,

        canvas.height-32,

        18,

        6,

        0,

        0,

        Math.PI*2

    );

    ctx.fill();

}

// ==========================================
// Main Game Loop
// ==========================================

function animate(){

    requestAnimationFrame(animate);

    if(!gameStarted){

        drawBackground();

        drawBird();

        return;

    }

if(gameOver){

    drawBackground();

    for(const pipe of pipes){
        drawPipe(pipe);
    }

    drawShadow();

    drawBird();

    return;

}

    frame++;

    drawBackground();

    updatePipes();

    updateBird();

    checkCollision();

    drawShadow();

    drawBird();

}

// ==========================================
// Start Animation
// ==========================================

animate();

// ==========================================
// Funny Flappy Bird
// Part 3 (Final)
// ==========================================

// Floating Clouds

let clouds = [

    {x:40,y:90,speed:.3},

    {x:220,y:160,speed:.5},

    {x:330,y:70,speed:.4}

];

function drawClouds(){

    ctx.font="40px Arial";

    for(let cloud of clouds){

        cloud.x-=cloud.speed;

        if(cloud.x<-60){

            cloud.x=canvas.width+30;

            cloud.y=40+Math.random()*180;

        }

        ctx.fillText("☁️",cloud.x,cloud.y);

    }

}

// ==========================================
// Funny Milestones
// ==========================================

function milestone(){

    if(score==25){

        funnyMessage.innerHTML="🔥 Ab toh Pro lag raha hai!";

    }

    if(score==50){

        funnyMessage.innerHTML="👑 Legend Ban Gaya Bhai!";

    }

    if(score==69){

        funnyMessage.innerHTML="😏 Nice.";

    }

    if(score==100){

        funnyMessage.innerHTML="🚀 Developer bhi Hairaan!";

    }

}

// ==========================================
// Confetti
// ==========================================

let particles=[];

function createConfetti(){

    for(let i=0;i<60;i++){

        particles.push({

            x:Math.random()*canvas.width,

            y:-20,

            vx:(Math.random()-.5)*5,

            vy:2+Math.random()*5,

            size:4+Math.random()*5

        });

    }

}

function drawConfetti(){

    ctx.fillStyle="gold";

    for(let i=0;i<particles.length;i++){

        let p=particles[i];

        p.x+=p.vx;

        p.y+=p.vy;

        ctx.fillRect(p.x,p.y,p.size,p.size);

    }

}

// ==========================================
// Monkey Patch Score
// ==========================================

const oldUpdatePipes=updatePipes;

updatePipes=function(){

    oldUpdatePipes();

    milestone();

    if(score==50 && particles.length==0){

        createConfetti();

    }

}

// ==========================================
// Better Background
// ==========================================

const oldBackground=drawBackground;

drawBackground=function(){

    if(score<20){

        ctx.fillStyle="#7fd8ff";

    }

    else if(score<40){

        ctx.fillStyle="#FDB863";

    }

    else{

        ctx.fillStyle="#0b2345";

    }

    ctx.fillRect(0,0,canvas.width,canvas.height);

    if(score>=40){

        ctx.fillStyle="white";

        for(let i=0;i<40;i++){

            ctx.fillRect(

                (i*37)%canvas.width,

                (i*91)%300,

                2,

                2

            );

        }

    }

    ctx.beginPath();

    ctx.arc(330,90,45,0,Math.PI*2);

    ctx.fillStyle="#FFD54F";

    ctx.fill();

    drawClouds();

    ctx.fillStyle="#63b94f";

    ctx.fillRect(0,canvas.height-45,canvas.width,45);

}

// ==========================================
// Draw Confetti During Game
// ==========================================

const oldAnimate=animate;

animate=function(){

    requestAnimationFrame(animate);

    if(!gameStarted){

        drawBackground();

        drawBird();

        return;

    }

    if(gameOver){

        drawBackground();

        for(const pipe of pipes){

            drawPipe(pipe);

        }

        drawShadow();

        drawBird();

        drawConfetti();

        return;

    }

    frame++;

    drawBackground();

    updatePipes();

    updateBird();

    checkCollision();

    drawShadow();

    drawBird();

    drawConfetti();

}

// ===================voices=======================

const pointVoices = [

    "assets/points/arey-wahh.mp3",

    "assets/points/suruat-achi-ha.mp3"

];

const outVoices = [

    "assets/out/aakhe-khol.mp3",

    "assets/out/has-mat.mp3",

    "assets/out/itni-jldi.mp3",

    "assets/out/khelna-seekho.mp3"

];

function playVoice(src){

    const audio = new Audio(src);

    audio.volume = 1;

    audio.play().catch(()=>{});

}