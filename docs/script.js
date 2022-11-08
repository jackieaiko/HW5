
var color1 = "#0095DD";

window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    let ReloadBtnElement = document.getElementById("reload");
    let ResetBtnElement = document.getElementById("reset");
    let ContinueBtnElement = document.getElementById("continue");
    let PauseBtnElement = document.getElementById("pause");

    let xScaleElem = document.getElementById("xScale");
    let xSlider = document.getElementById("xSlider");

    var pause = false;

    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
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
    var lives = 3;
    var highScore = 0;

    var bricks = [];

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        }
        else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    function collisionDetection() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        highScore++;
                        if (score == brickRowCount * brickColumnCount) {
                            //TODO: draw message on the canvas
                            ctx.font = "24pt Times New Roman";
                            ctx.fillStyle = "black"
                            ctx.textBaseline = "top";
                            ctx.textAlign = "center";
                            ctx.fillText("You Win!", canvas.width /2, canvas.height -275);
                            //TODO: pause game instead of reloading
                            document.location.save();
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = color1;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = color1;
        ctx.fillText("Score: " + score, 60, 20);
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = color1;
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawHighScore();
        drawHighScore();
        drawLives();
        collisionDetection();

        let cur = ctx.save();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if (lives <= 0) {
                    //TODO: draw message on the canvas
                    ctx.font = "24pt Times New Roman";
                    ctx.fillStyle = "black"
                    ctx.textBaseline = "top";
                    ctx.textAlign = "center";
                    ctx.fillText("You Lose", canvas.width /2, canvas.height -275);
                    //TODO: pause game instead of reloading
                    //document.location.reload();
                    document.location.save();
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        //TODO: adjust speed
        x += dx * xSlider.value;
        y += dy * xSlider.value;                

        //TODO: pause game check
        if(!pause) {
            requestAnimationFrame(draw);
        }
        
    }

    /*
        Additions to starter code
    */

    //Additional variables used to help make dimensions/locations easier to reuse            
    //controls game speed            
    //pause game variable            
    //high score tracking variables
    //other variables?            

    //event listeners added
    //game speed changes handler            
    //pause game event handler            
    //start a new game event handler            
    //continue playing
    //reload click event listener       
    ReloadBtnElement.addEventListener("click", function() {
        document.location.reload();
    });

    ResetBtnElement.addEventListener("click", function() {
        let resetLives = 3;
        resetBoard(resetLives);
        
    });
    ContinueBtnElement.addEventListener("click", function() {
        continuePlaying();
    });

    PauseBtnElement.addEventListener("click", function() {
        togglePauseGame();
    });     

    //Drawing a high score
    function drawHighScore() {
        ctx.font = "bold 10pt Arial";
        ctx.fillStyle = "black";
        ctx.fillText("High Score " + highScore, canvas.width /2, canvas.height -275);
    }

    //draw the menu screen, including labels and button
    function drawMenu() {
        //draw the rectangle menu backdrop
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "orange";
        ctx.fillRect(20, 20, canvas.width -40, canvas.height - 40);
        //draw the menu header
        ctx.font = "24pt Times New Roman";
        ctx.fillStyle = "black"
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.fillText("Breakout Game!", canvas.width /2, canvas.height -275);
        //start game button area
        setShadow()
        ctx.fillStyle = "yellow";
        const strt = ctx.fillRect(200, 200, canvas.width - 400, canvas.height - 285);
        
        ctx.font = "bold 10pt Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Start Game", canvas.width /2, canvas.height -110);

        startGameClick(event);
        //event listener for clicking start
        //need to add it here because the menu should be able to come back after 
        //we remove the it later     
    }
    
    //function used to set shadow properties
    function setShadow() {
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
    };

    //function used to reset shadow properties to 'normal'
    function resetShadow() {
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "black";
    };

    //function to clear the menu when we want to start the game
    function clearMenu() {
        //remove event listener for menu, 
        //we don't want to trigger the start game click event during a game 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }

    //function to start the game
    //this should check to see if the player clicked the button
    //i.e., did the user click in the bounds of where the button is drawn
    //if so, we want to trigger the draw(); function to start our game
    function startGameClick(event) {
        let startbtn = document.addEventListener("click", function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            if(x > 200)
                if(x < 300)
                    if(y > 200)
                        if(y < 230)
                            clearMenu();
        });
    };



    //function to handle game speed adjustments when we move our slider
    function adjustGameSpeed() {
        //update the slider display                
        //update the game speed multiplier   
        xSlider.addEventListener("input", function() { 
        xScaleElem.innerHTML = xSlider.value;
        });             
    };

    //function to toggle the play/paused game state
    function togglePauseGame() {
        //toggle state                
        //if we are not paused, we want to continue animating (hint: zyBook 8.9)
        pause = !pause;
        if (!pause)
            window.requestAnimationFrame(draw)
    };

    //function to check win state
    //if we win, we want to accumulate high score and draw a message to the canvas
    //if we lose, we want to draw a losing message to the canvas
    function checkWinState(stateEnd) {
        if(stateEnd) {
            ctx.font = "24pt Times New Roman";
            ctx.fillStyle = "black"
            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.fillText("You Win!", canvas.width /2, canvas.height -275);
        }
        else {
            ctx.font = "24pt Times New Roman";
            ctx.fillStyle = "black"
            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.fillText("You Lose", canvas.width /2, canvas.height -275);   
        }
    };

    //function to clear the board state and start a new game (no high score accumulation)
    function startNewGame(resetScore) {
        document.location.reload();
    };

    //function to reset the board and continue playing (accumulate high score)
    //should make sure we didn't lose before accumulating high score
    function continuePlaying() {
        score = 0;
        lives = 3;
        document.restore(drawBricks());
        document.restore(drawBall());
    };

    //function to reset starting game info
    function resetBoard(resetLives) {
        //reset paddle position
        //reset bricks               
        //reset score and lives  
        score = 0;
        highScore = 0;
        lives = 3;
        paddleX = (canvas.width - paddleWidth) / 2;
        document.restore(drawBricks());
        document.restore(drawBall());
    };

    //draw the menu.
    //we don't want to immediately draw... only when we click start game  
    drawMenu();          
    //draw();

};//end window.onload function