const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('restart');
const pauseBtn = document.querySelector('#pause');
let ballX;
let ballY;
let padX;
let moveRight;
let moveLeft;
let gameStarted;
let bounceX;
let bounceY;
let hit;
let score;
let paused;
let speed;
function draw(){
    ctx.fillStyle = '#FFF2C7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3498DB';
    ctx.fillRect(0, 896, canvas.width, 4);
    ctx.fillStyle = '#F0203E';
    ctx.font = '20px sans-serif';
    ctx.fillText("Score: " + score, 10, 50);
    ctx.save();
    ctx.translate(0,0);
    drawBall();
    drawPad();
    ctx.restore();
}
//draw the Ball
function drawBall(){
    ctx.save();
    ctx.translate(ballX, ballY);
    ctx.fillStyle = "#1E7CFE";
    ctx.beginPath();
    ctx.arc(0, -15, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
// draw the Pad

function drawPad(){
    ctx.save();
    ctx.translate(padX, 880);
    ctx.fillStyle = "#F0203E";
    ctx.fillRect(0, 0, 100, 13);
    ctx.restore();

}
function resetGame(){
    score = 0;
    ballX = 250;
    ballY = 30;
    bounceX = false;
    bounceY = false;
    padX = 0;
    moveRight = false;
    moveLeft = false;
    gameStarted = false;
    speed = 3;
    hit = false;
    draw();
    //window.requestAnimationFrame(animate);
    btn.style.display = 'none';
    canvas.style.borderColor = '#3498DB';
    pauseBtn.style.display = "none";
}
resetGame();
//Event Handling
window.addEventListener("keydown", function (e){
    if (e.code === "ArrowRight"){
        moveRight = true;
        if (!gameStarted){
            gameStarted = true;
            pauseBtn.style.display = "block";
            window.requestAnimationFrame(animate);
        }
    }
    else if (e.code === 'ArrowLeft'){
        moveLeft = true;
        if (!gameStarted){
            gameStarted = true;
            pauseBtn.style.display = "block";
            window.requestAnimationFrame(animate);
        }
    }
})
window.addEventListener("keyup", function(){
    moveRight = false;
    moveLeft = false;
})

// bounce Detection
function getDistance(point1, point2){
    return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
};

function bounceDetection(){
    if (!bounceX) ballX += speed;
    else if (bounceX) ballX -= speed;

    if (!bounceY) ballY += speed;
    else if (bounceY) ballY -= speed;

    if (ballX > 485) bounceX = true;

    if (ballX < 15) return bounceX = false;
    
    if (ballY > 896) return hit = true;
    
    if (ballY < 30) return bounceY = false;

    if (ballY === 30) return score += 1/2;
    
    const ballCenter = {x: ballX , y: ballY-15};
    
    const padLeft = {x: padX, y: 880};
    const padLeft1 = {x: padX+25, y: 880};
    const padCenter = {x: padX+50, y: 880};
    const padRight = {x: padX+100, y: 880};
    const padRight1 = {x: padX+75, y: 880};

    if (getDistance(ballCenter, padLeft) < 15) return bounceY = true;
    if (getDistance(ballCenter, padLeft1) < 15) return bounceY = true;
    if (getDistance(ballCenter, padCenter) < 15) return bounceY = true;
    if (getDistance(ballCenter, padRight) < 15) return bounceY = true;
    if (getDistance(ballCenter, padRight1) < 15) return bounceY = true;

        
        
    else {
        return hit = false;
    };

}



//pausing the game
function pause(){
    if (!paused) {
        pauseBtn.innerHTML = '&#9658;';
        return paused = true;
    } else {
        pauseBtn.innerHTML = 'II';
        window.requestAnimationFrame(animate);
        paused = false;
    }
    
}
window.addEventListener('keydown', function(e){
    if (e.key === ' ' && pauseBtn.style.display !== 'none'){
        pause();
    } 
});
// the animation
function animate(){
    bounceDetection();
    if (moveRight){
        padX += 4;
    } else if (moveLeft){
        padX -= 4;
    };
    if (padX < 0) padX = 0;
    if (padX > 400) padX = 400;
    draw();
    // levels
    if (score < 5) speed = 3;
    if (score >= 5 && score < 10) speed = 6;
    if (score >= 10 && score < 15) speed = 8;
    if (score >= 15) speed = 11;
    if (hit) {
        btn.style.display = 'block';
        pauseBtn.style.display = "none";
        ctx.fillStyle = '#F0203E';
        ctx.font = '50px sans-serif';
        ctx.fillText("Score: " + score, canvas.width/3, canvas.height/2);
        ctx.fillStyle = '#FB091B';
        ctx.fillRect(0, 896, canvas.width, 4);
        canvas.style.borderColor = '#FB091B';
        window.addEventListener('keydown', function(e){
            if (e.key === 'Enter' && btn.style.display === 'block'){
                resetGame(); 
                return;
            } 
        });
        
        return;
    };
    if (!paused) window.requestAnimationFrame(animate);
}

