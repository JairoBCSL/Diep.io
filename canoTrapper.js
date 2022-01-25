class CanoTrapper extends Cano{
  init(n,classe,team,id){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.n = n; this.recuo = 0;
    this.classe = classe; this.team = team; this.id = id; this.rot = 0;
    switch(classe){
      case 15:{ // Trapper
        this.x0 = 39 / 128; this.x1 = 72 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 72 / 128; this.y2 = 0;
        this.w0 = 50 / 128; this.h0 = 88 / 128; this.r0 = 0;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        this.r0 = 0; this.r1 = 1;
        break;
      }
      case 23:{ // Gunner Trapper
        this.x0 = 39 / 128; this.x1 = 72 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 72 / 128; this.y2 = 0;
        this.w0 = 50 / 128; this.h0 = 88 / 128; this.r0 = Math.PI;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        this.r0 = Math.PI; this.r1 = 1;
        break;
      }
      case 35:{ // Overtrapper
        this.x0 = 39 / 128; this.x1 = 72 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 72 / 128; this.y2 = 0;
        this.w0 = 50 / 128; this.h0 = 88 / 128; this.r0 = 0;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        this.r0 = 0; this.r1 = 1;
        break;
      }
      case 42:{ // Tri-Trapper
        this.x0 = 39 / 128; this.x1 = 72 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 72 / 128; this.y2 = 0;
        this.w0 = 50 / 128; this.h0 = 88 / 128;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        this.r0 = Math.PI * 2 / 3 * this.n; this.r1 = 1;
        break;
      }
      case 43:{ // Auto Trapper
        this.x0 = 39 / 128; this.x1 = 72 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 72 / 128; this.y2 = 0;
        this.w0 = 50 / 128; this.h0 = 88 / 128; this.r0 = 0;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        this.r0 = 0; this.r1 = 1;
        break;
      }
      case 44:{ // Big Trapper
        this.x0 = 26 / 128; this.x1 = 72 / 128; this.x2 = 0;
        this.y0 = -2 / 128; this.y1 = 72 / 128; this.y2 = 0;
        this.w0 = 75 / 128; this.h0 = 132 / 128;
        this.xSRC = 1530; this.ySRC = 0; this.wSRC = 75; this.hSRC = 132;
        this.r0 = 0; this.r1 = 1;
        break;
      }
      case 63:{ // Trapper Tower
        this.x0 = 51 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 42 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 25 / 128; this.h0 = 44 / 128;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        this.r0 = Math.PI * this.n * 2 / 12; this.r1 = 1;
        break;
      }
    }
  }
  shoot(){
    this.recuo = 30;
    let x = (this.w>this.h)?(this.x+this.w/2-this.h/2):(this.x+this.h/2-this.w/2);
    let y = (this.w>this.h)?(this.y+this.w/2-this.h/2):(this.y+this.h/2-this.w/2);
    let w = (this.w>this.h)?this.h:this.w;
    let h = (this.w>this.h)?this.h:this.w;
    balas.push(new BalaTrapper(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
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
