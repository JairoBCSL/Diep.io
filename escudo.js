class Escudo extends Bala{
  init(x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n){
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.xSRC = 1113; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128;
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
  move(){
    this.x = naves[this.id].x + (naves[this.id].w-this.w) / 2 + naves[this.id].w * 120 / 128 * Math.cos(naves[this.id].rot);
    this.y = naves[this.id].y + (naves[this.id].h-this.h) / 2 + naves[this.id].w * 120 / 128 * Math.sin(naves[this.id].rot);
    this.rot = naves[this.id].rot;
    this.spd -= this.spdMax * 0.02;
    this.hp -= this.hpMax * 0.0005;
  }
  die(){
    if(this.hp <= 0){ // Bala dissipou
      let x = balas.indexOf(this);
      balas.splice(x, 1);
    }
  }
}
