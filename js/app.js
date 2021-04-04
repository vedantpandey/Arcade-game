// Enemies our player must avoid
var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = s;
    this.x=x;
    this.y=y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed) * dt;
    if(this.x>500){
        var someSpeed = Math.floor(Math.random()*200 + 120);
        this.x= 0;
        this.speed = someSpeed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 385;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.handleInput = function(s){
    if(s=='left')
        this.x -= 100;
    else if(s=='right')
        this.x += 100;
    else if(s=='down')
        this.y += 85 ;
    else  
        this.y -= 85 ;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.resetPosition = function(){
    this.x=200;
    this.y = 300
}
Player.prototype.update = function(){
    var pref = this;
    allEnemies.forEach(function(ey,ind){
        if(pref.y<= 220 && pref.y >0){
            if((pref.x - ey.x) <= 62 && (pref.x - ey.x) >= -60 && (pref.y+15) == ey.y)
            pref.resetPosition();
        }
    })
    if(this.x > 300)
        this.x=400;
    if(this.x<0)
        this.x = 0;
    if(this.y > 385)
        this.y=385;
    if(this.y <= 0){
        //alert('You won!!');
        this.resetPosition();
    }
}
var e1 = new Enemy(-20,60,200);
var e2 = new Enemy(-20,145,200);
var e3 = new Enemy(-20,230,200);

//random integer height x

var x= Math.floor(Math.random() * 1000);
if(x<=333)
x=60;
else if(x<=666 && x>=333)
x=145;
else
x=230;

var e4 = new Enemy(-20,x,150);

var allEnemies = [e1,e2,e3,e4];

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
