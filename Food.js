class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('images/Milk.png');
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      background(46,139,87);
      fedTime=database.ref('FeedTime');
      fedTime.on("value",function(data){
        lastFed=data.val();
      });
      var x=90,y=100;
      
      imageMode(CENTER);
      image(this.image,720,220,100,100);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+80;
          }
          image(this.image,x,y,85,85);
          x=x+40;
        }
      }
    }
    bedroom(){
      background(bedroom);  
  }
    
 garden(){
      background(garden);  
  } 

  washroom(){
      background(washroom); 
  }
}