class Base{
  constructor(x, y, w, h, team){
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.team = team; this.bodyDmg = 10;
  }
  dano(){
    for(let nave of naves) // Colidiu com inimigos m*n
      if(this.team != nave.team)
        if(collisionSQ(this, nave))
          nave.hp -= this.bodyDmg;
    for(let bala of balas) // Colidiu com bala inimigos m*m
      if(this.team != bala.team)
      if(collisionSQ(this, bala))
          bala.hp -= this.bodyDmg;
  }
  draw(){
    let x0 = (this.x + this.w > cam.x);
    let x1 = (this.x < cam.x + cam.w);
    let y0 = (this.y + this.h > cam.y);
    let y1 = (this.y < cam.y + cam.h);
    if(x0 && y0 && x1 && y1){
      var ctx = game.canvas.getContext("2d");
      ctx.save();
      switch(this.team){
        case 0:{
          ctx.fillStyle = "#00F8";
          break;
        }case 1:{
          ctx.fillStyle = "#F008";
          break;
        }case 2:{
          ctx.fillStyle = "#0F08";
          break;
        }case 3:{
          ctx.fillStyle = "#FF08";
          break;
        }default:{
          ctx.fillStyle = "#FFF8";
          break;
        }
      }
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.restore();
      //this.stats();
    }
  }
}
