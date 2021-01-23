//we are making a racing game
// make 3 tracks
// make 1 cars
//give them both a velocity
// make hurdles that will be spawned at different places
//the player has 5 lives
//every time he touches the hurdle, he loses a life
//the player always sets new high scores
//the player has something called fuel
//it feeds on this fuel
//if the fuel is on the red sign, the game ends automatically

var roadimg
var road
var carimg
var speedtext
var scoretext
var highscoretext
var obstacle, obstacleimg
var game_over_img, game_over
var randomx, randomy
var life = 5
var lifetext
var title
var highscore = 0
var points = 0
var pointstext
var gamestate="PLAY"
var fuelimg, fuel
var game_over_text
var fuel
var randomx2
var randomy2

function preload(){


  
  roadimg = loadImage('road.png')
  carimg = loadImage('car.png')
  game_over_img=loadImage('game_over.png')
  obstacleimg = loadImage('fence.png')
  fuelimg = loadImage('fuel3.png')
  game_over = createSprite(200, 200,20, 20)
  game_over.addImage(game_over_img)

  road = createSprite(350, 350, 10, 10)
  road.addImage(roadimg)
  road.scale=4
  road.velocityY = 7
  car = createSprite(200, 400, 10, 10)
  car.addImage(carimg)
  car.scale = 0.15

  

  
}


function setup() {
  createCanvas(700,700);
  obstaclesGroup = new Group()
 
}

function draw() {
  background('game_over.png');  
  
  if (road.y > 450){
    road.y = road.height/2
  }

  

  checkborders()

  checkforout()

  if (gamestate == "PLAY"){
    createObstacle()
    movecars()
    createFood()

  }
  
  score=frameCount
  drawSprites();
  textSize(20)
  stroke('white')
  
  pointstext=text('Score:' + score, 100, 50)
  lifetext = text('Lives:'+ life, 600, 50)
  textSize(40)
  stroke('red')

  title = text('RoadRash!', 300,50)
  if (gamestate == "END"){
    if ( score > highscore){
      highscore = score
    }
    textSize(90)
    stroke('red')
    strokeWeight(7)
    highscoretext = text("High Score:" + highscore, 0, 500)
    game_over_text = text('GAME OVER!!😔', 0, 350)
    velstop()
    score = 0
    life = life



  }

}

function movecars(){
  if (keyDown('d')){
    car.velocityX += 1
  }

  if (keyDown('a')){
    car.velocityX -= 1
  }

  if (keyDown('w')){
    car.velocityY += -1
  }

  if (keyDown('s')){
    car.velocityY += 1
  }



}

function checkborders(){
  if (car.x < 10){
    life -1
  }
}



function createObstacle(){
  
  if (frameCount%50 === 0){
    randomx = Math.round(random(0, 600))
    randomy = Math.round(random(0, 400))
    
    obstacle = createSprite(randomx, randomy, 10, 10)
    obstacle.addImage(obstacleimg)
    obstacle.scale = 0.35
    obstacle.velocityY = 3.25

    if (car.y - obstacle.y < (car.height + obstacle.height)/2){
      life -= 1
    }

  
  }

}

function checkforout(){
  if (life == 0){
    gamestate = "END"
  }
}

function velstop(){
  road.velocityY=0
  car.velocityY = 0
  car.velocityX = 0


}
function createFood(){
  if (frameCount%50 === 0){
    randomx2 = Math.round(random(0, 600))
    randomy2 = Math.round(random(0, 600))
    stroke('red')
    strokeWeight(6)
    fuel = createSprite(randomx2, randomy2, 20, 20)
    fuel.velocityY = 4
    

  }

}