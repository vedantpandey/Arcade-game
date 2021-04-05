// Enemies our player must avoid
class Enemy{
    constructor(x, y){
        this.sprite = 'images/enemy-bug.png';
        this.speed = 100 + (Math.random()*100);
        this.x=x;
        this.y=y;
    }

    update(dt){
        this.x = this.x + (this.speed) * dt;
        if(this.x>ctx.canvas.width){
            this.x= -100;
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 385;
        this.numberOfLives=3;
    }
    
    handleInput(s){
        // if(this.numberOfLives == 0){
            // }
        console.log(s);

        if(s=='left'){
            this.x -= 100;    
            if(this.x<0)
            this.x = 0;
        }
        else if(s=='right'){
            this.x += 100;
            if(this.x > 400)
            this.x=400;
        }
        else if(s=='up'){
            this.y -= 85 ;
            if(this.y <= 0){
                alert('You won!!');
                this.resetPosition();
            }
        }
        else  {
            this.y += 85 ;
            if(this.y > 385)
            this.y=385;
        }
    }
    
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    
    resetPosition(){
        this.x = 200;
        this.y = 300;
    }
    
    update(){
    
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var e1,e2,e3, e4, allEnemies;
function initEnemies(){
        
    e1 = new Enemy(-20,60);
    e2 = new Enemy(-20,145);
    e3 = new Enemy(-20,230);

    //random integer height x

    var x = randomHeightGenerator();

    e4 = new Enemy(-20,x,150);

    allEnemies = [e1,e2,e3,e4];
}

function gameOver(){
    alert('Game over');
    player.resetPosition();
    player.numberOfLives=3;
}

function pauseGame(){
    allEnemies.forEach(ei => ei.speed=0)
}
function collidedWithEnemy(){
    player.numberOfLives -= 1;

    if(player.numberOfLives == 0){
        setTimeout(gameOver, 100);
    }
    if(player.numberOfLives > 0)
        player.resetPosition();
}

function checkCollisions(){
    if(player.numberOfLives < 1){
        return;
    }
    var pref = player;
    allEnemies.forEach(ey => {
        if(pref.y<= 220 && pref.y >0){
            if((Math.abs(pref.x - ey.x) <= 62) && (pref.y+15) == ey.y){
                collidedWithEnemy();
            }
        }
    })
}


//random integer height x

function randomHeightGenerator(){
    var x= (Math.random() * 1000);
    if(x<=333)
        x=60;
    else if(x<=666 && x>=333)
        x=145;
    else
        x=230;
    return x;
}

initEnemies();
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if(e.keyCode >=37 && e.keyCode <= 40)
        player.handleInput(allowedKeys[e.keyCode]);
});


class Score{
    render(){
        ctx.font = "30px Arial";
        ctx.fillText(`Lives: ${player.numberOfLives}`, 10, 45);
    }
}

let score = new Score();