class BalaAnnihilator extends Bala{
  init(x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n){
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.xSRC = 0; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128;
    this.rot = rot; this.peso = w * h;

    this.hpMax = hpMax; this.hp = this.hpMax; this.bodyDmg = bodyDmg; // Stats
    this.spd = spd; this.spdMax = this.spd; this.team = team;
    this.classe = classe; this.id = id; this.n = n;
  }
  fisica(){
    this.move();
    this.dano();
    this.die();
  }
  die(){
    this.spd -= this.spdMax * 0.002;
    this.hp -= this.hpMax * 0.005;
    if(this.hp <= 0){ // Bala dissipou
      for(let i = 0; i < 8; i++){
        balas.push(new Bala(this.x+this.w/2, this.y+this.h/2, naves[this.id].bulletSize/4, naves[this.id].bulletSize/4, naves[this.id].bulletSpd, this.rot+Math.PI/4*i, naves[this.id].bulletPen/8, naves[this.id].bulletDmg/8, naves[this.id].team, naves[this.id].classe, this.id, 1));
      }
      let x = balas.indexOf(this);
      balas.splice(x, 1);
    }
  }
}
