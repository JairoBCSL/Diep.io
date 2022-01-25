class CanoAnnihilator extends Cano{
  init(n,classe,team,id){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.n = n; this.recuo = 0;
    this.classe = classe; this.team = team; this.id = id; this.rot = 0;
    this.xSRC = 906; this.ySRC = 0; this.wSRC = 76; this.hSRC = 112;
    this.x0 = 26 / 128; this.x1 = 71 / 128; this.x2 = 0;
    this.y0 = 8 / 128; this.y1 = 71 / 128; this.y2 = 0;
    this.w0 = 76 / 128; this.h0 = 112 / 128;
    this.r0 = 0; this.r1 = 1;
  }
  shoot(){
    this.recuo = 30;
    let x = (this.w>this.h)?(this.x+this.w/2-this.h/2):(this.x+this.h/2-this.w/2);
    let y = (this.w>this.h)?(this.y+this.w/2-this.h/2):(this.y+this.h/2-this.w/2);
    let w = (this.w>this.h)?this.h:this.w;
    let h = (this.w>this.h)?this.h:this.w;
    balas.push(new BalaAnnihilator(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
  }
  draw(){
    var ctx = game.canvas.getContext("2d");
    ctx.save()
    if(this.n == 0)
      ctx.fillStyle = "#F00F";
    else if(this.n == 1)
      ctx.fillStyle = "#0F0F";
    else if(this.n == 2)
      ctx.fillStyle = "#00FF";
    else
      ctx.fillStyle = "#FF0F";
    //ctx.fillRect(this.x-5, this.y-5, this.w+10, this.h+10);
    ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
    ctx.rotate(this.rot);
    ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
    ctx.drawImage(imagens.canos, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
    ctx.restore();
    }
}
