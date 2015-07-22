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
   gravity: 0.25,
   //Strenght or velocity of the jump
   _jump: 4.6,
   jumping: false,
   jump: function() {
     //Validate for a single jump

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
       if(this.y >= 210) {
         this.jumping = false;
         this.y = 210;
       }
     }
   },
   draw: function(ctx) {
     ctx.save();
     //this.y =  height - imgs.s_fg.height - 10;
     ctx.translate(this.x, this.y);
    //  console.log(imgs.s_dino);
     var n = this.animation[this.frame];
     var d = imgs.s_dino[n];

     d.draw(ctx, -d.width/2, -d.height/2);

     ctx.restore();
   }
 },
 cactus = {
   update: function() {
   },
   draw: function() {
   }
 };

//Function triggered
 function onpress(evt) {
   console.log('press');
   dino.jump();
 }

function main() {
  //Create the canvas
  canvas = document.createElement('canvas');
  width = window.innerWidth;
  height = window.innerHeight;
  //Define the event name
  var evt = 'touchstart';
  //Validate if we are on a desktop
  if(width >= 500) {
    width = 480;
    height = 320;
    canvas.style.border = '1px solid #000';
    evt = 'mousedown';
  }
  //Add the event to the document
  document.addEventListener(evt, onpress);

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
  fgpos -=0.5;

  dino.update();
  //fgpos = (fgpos - 2) % 100;
}

function render() {
  //console.log('render');

  //Clear context
  ctx.clearRect(0, 0, width, height);

  dino.draw(ctx);
  //Draw the image foreground
  imgs.s_fg.draw(ctx, fgpos, height - imgs.s_fg.height);
  //Draw a second image and change the x position
  imgs.s_fg.draw(ctx, imgs.s_fg.width - Math.abs(fgpos), height - imgs.s_fg.height);


  // con
}

window.onload = function() {
  main();
}
