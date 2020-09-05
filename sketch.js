//Create variables here
var dog,sadImg,dogImg2;
var database;
var foodStock,foodS;
var fedTime,lastTime,lastFed,currentTime;
var foodObj;
var feed,addFood;
var gameState,readState;
var bedroom,garden,washroom;

function preload(){
  sadImg=loadImage("images/dogImg.png");
  dogImg2=loadImage("images/dogImg1.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

 
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  dog=createSprite(800,200,250,250);
  dog.addImage(sadImg);
  dog.scale=0.3;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {

   currentTime=hour();
   if(currentTime==(lastFed+1)){
       
       foodObj.garden();
       update("Playing");
    }else if(currentTime==(lastFed+2)){
     update("Sleeping");
       foodObj.bedroom();
    }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
     update("Bathing");
       foodObj.washroom();
    }else{
     update("Hungry")
     foodObj.display();
    }

 

 if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
 feed.show();
 addFood.show();

}
//textSize(28);
//textFont("georgia")
//text("Food Left : " + foodS,100,80);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

