var balloon, balloonImage;
var sky,skyImage;
var database, position;
function preload(){
  skyImage=loadImage("Hot Air Ballon-01.png");
  balloonImage=loadImage("Hot Air Ballon-02.png");
  }

function setup() {
    //connecting with firebase 
    database=firebase.database();
    createCanvas(1300,700);
    createSprite(400, 200, 50, 50);

    sky=createSprite(100, 500, 500, 500);
    sky.addImage(skyImage);

    balloon=createSprite(400, 200, 20,20);
    balloon.addImage(balloonImage);
    balloon.scale=0.5;
    var balloonP=database.ref('balloon/height');
    balloonP.on("value",readHeight);
}

function draw() {
    background(skyImage); 
    textSize(14);
    fill("black");
    stroke(2);
    text("Use Arrows Keys to Play!", 1000,200);
    
    if(keyDown(LEFT_ARROW)){
      updateHeight(-10, 0);
    }
    else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10)
      balloon.scale=balloon.scale-0.01
    }
    else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10)
    balloon.scale=balloon.scale+0.01
    }

    drawSprites();
    textSize(25);
    text("Use arrow keys to move hot air balloon", 40, 40);
}
function updateHeight(x,y){
    database.ref('balloon/height').set({
      'x':height.x+x,
      'y':height.y+y
  })
}
function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}