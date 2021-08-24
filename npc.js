class Npc{
  constructor(x, y, classe){
    this.x = x; this.y = y; // Posição
    this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64; this.rot = 0; // Sprite
    this.hp = 120; this.hpMax = 120; this.classe = classe; this.bodyDmg = 4; // Stats
    if(this.classe == 0){
      this.hp = 100; this.hpMax = 120; this.bodyDmg = 1;
      this.w = 32; this.h = 32; this.expTotal = 100;
      this.peso = 32 * 32;
    }else if(this.classe == 1){
      this.hp = 200; this.hpMax = 240; this.bodyDmg = 2;
      this.w = 48; this.h = 48; this.expTotal = 400;
      this.peso = 48 * 48;
    }else if(this.classe == 2){
      this.hp = 400; this.hpMax = 480; this.bodyDmg = 4;
      this.w = 64; this.h = 64; this.expTotal = 1600;
      this.peso = 64 * 64;
    }
  }
  fisica() {
    if(this.hp <= 0){
      this.x = bases[0].x + Math.floor(Math.random() * bases[0].w - 16);
      this.y = bases[0].y + Math.floor(Math.random() * bases[0].h - 16);
      this.hp = this.hpMax;
    }
  }
  stats(){
    if(this.hp < this.hpMax){
      var ctx = game.canvas.getContext("2d");
      ctx.save();
      ctx.fillStyle = "#F00";
      ctx.fillRect(this.x, this.y - 10, this.w, this.h / 10);
      ctx.fillStyle = "#0F0";
      ctx.fillRect(this.x, this.y - 10, this.w * this.hp/this.hpMax, this.h / 10);
      ctx.restore();
    }
  }
  draw(){
    let x0 = (this.x + this.w > cam.x);
    let x1 = (this.x < cam.x + cam.w);
    let y0 = (this.y + this.h > cam.y);
    let y1 = (this.y < cam.y + cam.h);
    if(x0 && y0 && x1 && y1){
      var ctx = game.canvas.getContext("2d");
      ctx.save();
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      this.rot+=0.025;
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      if(this.classe == 0){
        ctx.fillStyle = "#ff0f";
        ctx.fillRect(this.x, this.y, this.w, this.h);
      }else if(this.classe == 1){
        ctx.fillStyle = "#f00f";
        ctx.beginPath();
        ctx.moveTo(this.x + this.w * (1+Math.cos(0*120*Math.PI/180)) / 2, this.y + this.h * (1+Math.sin(0*120*Math.PI/180)) / 2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(1*120*Math.PI/180)) / 2, this.y + this.h * (1+Math.sin(1*120*Math.PI/180)) / 2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(2*120*Math.PI/180)) / 2, this.y + this.h * (1+Math.sin(2*120*Math.PI/180)) / 2);
        ctx.fill();
      }else if(this.classe == 2){
        ctx.fillStyle = "#f0ff";
        ctx.beginPath();
        ctx.moveTo(this.x + this.w * (1+Math.cos(0*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(0*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(1*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(1*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(2*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(2*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(3*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(3*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(4*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(4*72*Math.PI/180))/2);
        ctx.fill();
      }

      //this.w = this.wSRC; this.h = this.hSRC;

      ctx.restore();
      this.stats();
    }
  }
}
