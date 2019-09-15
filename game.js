var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = (canvas.height-paddleHeight);
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks = [];
for (var c=0;c<brickColumnCount;c++){
    bricks[c]=[];
    for (var j=0;j<brickRowCount;j++){
        bricks[c][j] = {x:0,y:0, status : 1};
    }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
        for(var j = 0; j< brickRowCount;j++){
            if(bricks[c][j].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][j].x = brickX;
                bricks[c][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillstyle = 'blue';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore(){
    ctx.font = '16px Arial';
    ctx.fillstyle = 'rgb(255, 165, 0)';
    ctx.fillText('Score:' + score, 8, 20)
}

function collisionDetection(){
    for(var c=0; c<brickColumnCount; c++){
        for(var j = 0; j< brickRowCount; j++){
           var b = bricks[c][j];
           if (b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score ++;
                    if(score == brickColumnCount*brickRowCount){
                        alert('YOU WIN THE GAME!');
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
           }    
        }
    }
}

function keyDownHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true;
    }
    if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true;
    }
}

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    // this if is definitely true, just make sure it will not go over the canvas
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyUpHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false;
    }
    if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false;
    }
} 

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillstyle = '#0095dd';
    ctx.fill();
    ctx.closePath()
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y, ballRadius, 0, Math.PI*2);
    ctx.fillstyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}



$('#easy').click(function (e) { 
    e.preventDefault();
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 1;
    dy = -1;
    paddleX = (canvas.width-paddleWidth)/2;
    paddleY = (canvas.height-paddleHeight);
    
});

$('#medium').click(function (e) { 
    e.preventDefault();
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 3;
    dy = -3;
    paddleX = (canvas.width-paddleWidth)/2;
    paddleY = (canvas.height-paddleHeight);
    
});

$('#hell').click(function (e) { 
    e.preventDefault();
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 4;
    dy = -4;
    paddleX = (canvas.width-paddleWidth)/2;
    paddleY = (canvas.height-paddleHeight);
    console.log('speed is 100'); 
});

function draw() {
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    x += dx;
    y += dy;
    if (x > canvas.width-ballRadius || x< ballRadius){
        dx = -dx;
    }
    if(y < ballRadius){
        dy = -dy;
    }
    if (rightPressed){
        paddleX += 7;
        if(paddleX > canvas.width - paddleWidth){
            paddleX = canvas.width-paddleWidth;
        }
    }
    if (leftPressed){
        paddleX -= 7;
        if(paddleX < 0){
            paddleX = 0;
        }
    }
    // if when the ball hit the ground but no paddle under it, that would mean loss in the game
    else if(y + dy > canvas.height-ballRadius){
        if( x < paddleX || x > paddleX + paddleWidth){
            alert("Game Over");
            document.location.reload();
            clearInterval(interval);
        }else{
            dy = -dy;
        }
    }
}

var interval = setInterval(draw, 10);
// setInterval(draw,10);

