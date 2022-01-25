class BalaRocketeer extends Bala{
  init(x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n){
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.xSRC = 827; this.ySRC = 128 * team; this.wSRC = 156; this.hSRC = 128;
    this.rot = rot; this.peso = w * h;

    this.reload = 0; this.reloadMax = naves[id].reloadMax / 4; // Stats
    this.hpMax = hpMax; this.hp = this.hpMax; this.bodyDmg = bodyDmg;
    this.spd = spd; this.spdMax = this.spd; this.team = team;
    this.classe = classe; this.id = id; this.n = n;
  }
  fisica(){
    this.move();
    this.dano();
    this.rock();
    this.die();
  }
  rock(){
    if(this.reload > 0)
      this.reload--;
    else{
      balas.push(new Bala(this.x+this.w/2+this.w/2*Math.cos(this.rot+Math.PI), this.y+this.h/2+this.h/2*Math.sin(this.rot+Math.PI), naves[this.id].bulletSize/4, naves[this.id].bulletSize/4, naves[this.id].bulletSpd*1.2, this.rot+Math.PI, naves[this.id].bulletPen/4, naves[this.id].bulletDmg/4, naves[this.id].team, naves[this.id].classe, this.id, 0));
      this.reload = this.reloadMax;
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
      //ctx.strokeRect(this.x, this.y, this.w, this.h);
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      ctx.drawImage(imagens.balas, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x-20/naves[this.n].w, this.y, this.w*148/128, this.h);

      ctx.restore();
      this.stats();
    }
  }
}
