// this is the main file that pulls in all other modules
// you can require() bower components too!
var example = require("./example");
example.welcome();

var sprite = require('./_sprite');

 var canvas,
 //imports from sprites
 imgs = sprite.images,
 //Size
 width,
 height,
 //Context
 ctx,
 //Foreground position
 fgpos = 0,
 frames = 0,
 speed =3,
 spawnRate = 3,
 //Current state of the games
 currentState,
//States of the game
 states = {
   Splash: 0, Game: 1, Score: 2
 },
 //Main character
 dino = {
   x: 80,
   y: 210,
   frame:0,
   velocity:0,
   animation: [2,3],
   rotation: 0,
   gravity: 0.4,
   //Strenght or velocity of the jump
   _jump: 8,
   jumping: false,
   continueJump: true,
   jump: function() {
     //Validate for a single jump
     this.continueJump = true;
     if(!this.jumping) {
       //Start the jump
       this.jumping = true;
       //Throw up the character
       this.velocity = -this._jump;
       this.y += this.velocity;
     }

   },
   update: function() {
     var n = 10;
     this.frame += frames % n === 0 ? 1 : 0;
     this.frame %= this.animation.length;
     //this.velocity += this.gravity;
     //this.y += this.velocity;
     if(this.jumping) {
       this.velocity += this.gravity;
       this.y += this.velocity;

       if(this.y >= height - imgs.s_fg.height -10) {
         this.jumping = false;
         this.y = height - imgs.s_fg.height -10;

         if(this.continueJump) {
           this.jump();
         }

       }
     }
   },
   draw: function(ctx) {
     ctx.save();
     //this.y =  height - imgs.s_fg.height - 10;
     ctx.translate(this.x, this.y);

     var n = !this.jumping ? this.animation[this.frame] : 0;
     var d = imgs.s_dino[n];

     d.draw(ctx, -d.width/2, -d.height/2);

     ctx.restore();
   }
 },
 cactus = {
   _cactus: [],
   distances: [100,200,300,400,400,300],
   distance:100,
   _last: new Date(),
   _next: 1,
  //  speed: 1,
   reset: function() {
     this._cactus = [];
   },
   update: function() {
     //X = V * T
     var now = new Date();
     var dif = (now - this._last) / 1000;
     var x = speed * dif;

     if(x > this._next ) {

       this._next = randomIntFromInterval(2,4);
       var pos = randomIntFromInterval(0,4);
       this._last = now;
       this._cactus.push({
         x:500,
         y: ((height - imgs.s_fg.height) - imgs.s_cactus[pos].height) + 15,
         width: imgs.s_cactus[pos].width,
         height: imgs.s_cactus[pos].height,
         sprite: imgs.s_cactus[pos]
       });
     }

     for (var i = 0, len = this._cactus.length; i < len; i++) {
       var c = this._cactus[i];

       c.x -= speed;

       if(c.x < -50) {
         this._cactus.splice(i, 1);
         i--;
         len--;
       }
     }
   },
   draw: function(ctx) {
     for (var i = 0; i < this._cactus.length; i++) {
       var c = this._cactus[i];

       c.sprite.draw(ctx, c.x,c.y);
     }
   }
 };

//Function triggered
 function onpress(evt) {
   dino.jump();
 }

function main() {
  //Create the canvas
  canvas = document.createElement('canvas');
  width = window.innerWidth;
  height = window.innerHeight;
  //Define the event name
  //var evt = 'touchstart';
  //Validate if we are on a desktop
  // if(width >= 500) {
  //   width = 480;
  //   height = 320;
  //   canvas.style.border = '1px solid #000';
  //   evt = 'mousedown';
  // }
  //Add the event to the document
  document.addEventListener('touchstart', onpress);
  document.addEventListener('touchend', function(){
    console.log('leave');
    dino.continueJump = false;
  });

  canvas.width = width;
  canvas.height = height;



  ctx = canvas.getContext('2d');
  //Add the vcanvas to the body
  document.body.appendChild(canvas);

  //Prepare the image (sprite)
  var img = new Image();

  img.onload = function() {
    //Initialize the sprites only when the image is loaded
    sprite.initSprites(this);

    //Dino position
    dino.y = height - imgs.s_fg.height - 10;

    //Start
    run();
  };

  //Phat of the sprite
  img.src = 'images/dino.png';
}

function run() {

  //loop function
  var loop = function() {
    update();
    render();
    window.requestAnimationFrame(loop, canvas);
  }

  //rquest the animation pass the loop and the loop executes update and render
  window.requestAnimationFrame(loop, canvas);
}

function update() {
  frames++;

  //Maintain the land moving
  if (Math.abs(fgpos) > imgs.s_fg.width) {
    fgpos = 0;
  }
  fgpos -= speed;

  dino.update();
  cactus.update();
  //fgpos = (fgpos - 2) % 100;
}

function render() {
  //console.log('render');

  //Clear context
  ctx.clearRect(0, 0, width, height);

  dino.draw(ctx);
  cactus.draw(ctx);
  //Draw the image foreground
  imgs.s_fg.draw(ctx, fgpos, height - imgs.s_fg.height);
  //Draw a second image and change the x position
  imgs.s_fg.draw(ctx, imgs.s_fg.width - Math.abs(fgpos), height - imgs.s_fg.height);


  // con
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.onload = function() {
  main();
}
