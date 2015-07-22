//Variables for images

var images = {};

function Sprite(img, x, y, width, height) {
	this.img = img;
  this.x = x;
	//this.x = x*2;
//  this.y = y*2;
	this.y = y;
  this.width = width;
	//this.width = width*2;
  this.height = height;
	//this.height = height*2;
};

Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

exports.initSprites = function(img){
  console.log('init');
  images.s_bg = new Sprite(img,   2, 53, 1024, 17);
	images.s_bg.color = "#fff"; // save background color

  //Sliding fore ground
	images.s_fg = new Sprite(img,   2, 53, 1024, 100);

  //Dino images
  images.s_dino = [
    new Sprite(img, 676,2,44,47),
    new Sprite(img, 720,2,44,47),
    new Sprite(img, 764,2,44,47),
    new Sprite(img, 808,2,44,47),
  ];

}

exports.images = images;
