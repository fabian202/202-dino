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

	images.s_cactus = [
		new Sprite(img,332,2,25,50),
		new Sprite(img,430,2,51,50),
		new Sprite(img,227,2,17,35),
		new Sprite(img,245,2,34,35),
		new Sprite(img,381,2,49,50),

	];

}

exports.images = images;
