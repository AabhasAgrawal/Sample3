var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceShip, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var lazerGroup ; 

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  spaceShipImg = loadImage("images/spaceShip1.png");
  
  groundImage = loadImage("images/background.png");
  
  cloudImage = loadImage("cloud.png");

  enemyImg = loadImage("images/enemy2.png")
  enemyBullet2 = loadImage("images/bullet10.png");
  lazerImg = loadImage("images/lazer.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  enemyBullet1 = loadImage("images/bulletEnemy.jpg")
}

function setup() {
  createCanvas( windowWidth, windowHeight);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  spaceShip = createSprite(50,180,20,50);
  
 /* spaceShip.addAnimation("running", trex_running);
  spaceShip.addAnimation("collided", trex_collided);*/
  spaceShip.addImage("spaceShip",spaceShipImg);
  spaceShip.scale = 0.5;
  
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  cloudsGroup = new Group();
  enemyGroup = new Group();
  lazerGroup = new Group();

  spawnEnemy();
 
  
  
  score = 0;
}

function draw() {
  //spaceShip.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
  
  
    spaceShip.x = World.mouseX
    spaceShip.y = World.mouseY
  
  // spawnClouds();
 //   spawnObstacles();
  for(var i =0; i<enemyGroup.length;i++)



    if (enemyGroup.get(i).isTouching(lazerGroup)){
   
      enemyGroup.get(i).destroy();
       score=score+1;
       console.log("here")
    
    }
  
    if(enemyGroup.isTouching(spaceShip)){
        gameState = END;
    }



    if (frameCount%60 === 0 ){

      spawnLazer();

    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    spaceShip.velocityY = 0;
    enemyGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the spaceShip animation
    spaceShip.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    enemyGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = spaceShip.depth;
    spaceShip.depth = spaceShip.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

/*function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);

              break;
      case 2: obstacle.addImage(obstacle2);
              break;
   /*   case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break; 
      default: break;
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
  
  }
}*/

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  enemyGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  spaceShip.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

function spawnEnemy(){

for (var i =width/8; i <= width/2+500 ; i = i + 100 ){

var enemy = createSprite(i,100,20,20)

enemy.addImage(enemyImg);
enemy.scale=0.3;
enemyGroup.add(enemy);
}

}

function spawnLazer(){

var laxer = createSprite(mouseX,mouseY,20,20);

laxer.velocityY = -2;
laxer.addImage(lazerImg);
//laxer.scale=0.1;
lazerGroup.add(laxer);

}
