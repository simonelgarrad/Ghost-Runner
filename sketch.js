var towerImg,tower;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroup;
var ghostImg,ghost;
var invisibleBlockGroup,invisibleBlock;
var gameState="start";
var spookySound;
var score=0;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600);
  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=3;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
  
  
}

function draw(){
  background(0);
  
  if(gameState==="start"){
  stroke("white");
  fill("white");
  textSize(30);
  text("Press S to start",200,200);
    
  }
  
  if(keyDown("s")){
    gameState="play";
  }
  
 
    
    
  
  if(gameState==="play"){
    
    score=score+Math.round((getFrameRate()/60));
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3 ;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3 ;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  
  
  if(tower.y>400){
    
    tower.y=300;
  }
    
    spawnDoors();
  
    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  drawSprites();
 
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",250,250);
  }
    stroke("green");
    fill("green");
    textSize(30);
    text("Score:"+score,250,100);
}

function spawnDoors(){
  
  if(frameCount%150===0){
    door= createSprite(200,-50);
    door.addImage(doorImg);
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400));
    door.velocityY=3;
    
    climber.x=door.x;
    climber.velocityY=3;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=3;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    
    door.lifetime=800;
    climber.lifetime=800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
    
    
  }
}