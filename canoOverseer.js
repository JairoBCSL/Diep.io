class CanoOverseer extends Cano{
  init(n,classe,team,id){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.n = n; this.recuo = 0;
    this.classe = classe; this.team = team; this.id = id; this.rot = 0;

    switch(classe){
      case 13:{ // Overseer
        this.x0 = 32 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 64 / 128; this.h0 = 88 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = Math.PI / 2 + Math.PI * this.n; this.r1 = 1;
        break;
      }
      case 18:{ // Hybrid
        this.x0 = 32 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 64 / 128; this.h0 = 88 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = Math.PI; this.r1 = 1;
        break;
      }
      case 31:{ // Battleship
        this.x0 = 32 / 128; this.x1 = 64 / 128; this.x2 = 49 / 256 * (1-2*(this.n%2));
        this.y0 = 32 / 128; this.y1 = 64 / 128; this.y2 = -49 / 256 * (1-2*(this.n%2));
        this.w0 = 64 / 128; this.h0 = 64 / 128;
        this.xSRC = 1234; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        this.r0 = Math.PI / 2 + Math.PI * Math.floor(this.n / 2); this.r1 = 1;
        break;
      }
      case 32:{ // Overlord
        this.x0 = 32 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 64 / 128; this.h0 = 88 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = Math.PI * this.n / 2; this.r1 = 1;
        break;
      }
      case 33:{ // Necromancer
        this.x0 = 32 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 64 / 128; this.h0 = 88 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = Math.PI * (2 * this.n - 1) / 2; this.r1 = 1;
        break;
      }
      case 34:{ // Manager
        this.x0 = 32 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 64 / 128; this.h0 = 88 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = 0; this.r1 = 1;
        break;
      }
      case 35:{ // OverTrapper
        this.x0 = 32 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 64 / 128; this.h0 = 88 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = Math.PI * 2 / 3 * this.n; this.r1 = 1;
        break;
      }
      case 49:{ // Oversmasher
        this.x0 = 32 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 20 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 64 / 128; this.h0 = 88 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = Math.PI; this.r1 = 1;
        break
      }
      case 60:{ // Mothership
        this.x0 = 56 / 128; this.x1 = 70 / 128; this.x2 = 0;
        this.y0 = 56 / 128; this.y1 = 70 / 128; this.y2 = 0;
        this.w0 = 16 / 128; this.h0 = 16 / 128;
        this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        this.r0 = Math.PI / 8 * this.n; this.r1 = 1;
        break;
      }
      case 64:{ // Summoner Tower
        this.x0 = 48 / 128; this.x1 = 68 / 128; this.x2 = 0;
        this.y0 = 42 / 128; this.y1 = 68 / 128; this.y2 = 0;
        this.w0 = 32 / 128; this.h0 = 44 / 128;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        this.r0 = Math.PI * this.n / 4; this.r1 = 1;
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
    if(naves[this.id].drones < naves[this.id].dronesMax)
      drones.push(new Drone(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, this.team, this.classe, this.id));
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
