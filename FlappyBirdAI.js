var bird;
var pipes = [];
var z=0;

function setup() { 
  createCanvas(600, 400);
	bird = new Bird();
	ai = new Ai();
} 

function draw() { 
  background(0);
	ai.reset();
	if(frameCount%99==0){
		pipes.push(new Pipe());
	}
	for(var i=0; i<pipes.length; i++){
		pipes[i].check(bird.x, bird.y);
		if(pipes[i].touched)
			fill(255,0,0);
		pipes[i].show();
		fill(255);
	}
	for(i = pipes.length-1;i>0; i--){
		if((pipes[i].x+pipes[i].width)<0){
			pipes.splice(i,1);
			z=1;
		}
	}
	
	ai.check(bird,pipes[z]);
	if(ai.up /*mouseIsPressed*/){
	 	bird.move(true);
	 }
	 else{
	 	bird.move();
	 }
	bird.show();
}

function Bird(){
	this.x = 50;
	this.y = height/2;
	this.size = 20;
	this.pull = 0.5;
	this.push = -2;
	this.vel = 0;
	this.terminalVel = 3;
	
	this.move = function(tap){
		if(tap){
			this.vel += this.push;
		}
		if(this.vel<this.terminalVel){
			this.vel += this.pull;
		}
		this.y += this.vel;
		if(this.y<0){
			this.y = this.size/2;
			this.vel = 0;
		}
		if(this.y>height-this.size/2){
			this.y = height-this.size/2;
			this.vel = 0;
		}
	}
	
	this.show = function (){
		ellipse(this.x, this.y, this.size, this.size);
	}
}

function Pipe(){
	this.up = int(random(0, height-height/5));
	this.height = int(random(40,height/3));
	this.down = this.up + this.height;
	this.speed = 5;
	this.x = width;
	this.width = 20;
	this.touched = false;
	
	this.show = function(){
		this.x -= this.speed;
		rect(this.x,0,this.width,this.up);
		rect(this.x,this.down,this.width,height-this.down);
	}
	
	this.check = function(x,y){
		if(x>this.x && x<(this.x+this.width)){
			if(y<this.up || y>this.down){
				this.touched = true;
			}
		}
	}
}

function Ai(){
	
	this.reset = function(){
		this.upreach = 0;
		this.downreach = 0;
		this.median = height/2;
		this.up = false;
	}
	
	this.check = function(bird,pipe){
		if(pipe){
			this.median = int(pipe.up+pipe.height/2);
		}
		this.upreach = bird.y+bird.push+bird.pull;
		this.downreach = bird.y+bird.pull;
		if(abs(this.median-this.upreach) < abs(this.median-this.downreach)){
			this.up = true;
		}
	}
}
