class BalaTrapper extends Bala{
  init(x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n){
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.xSRC = 386; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128;
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
    for(let s = this.spd; s > 0; s--){
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x+this.w/2+s*Math.cos(this.rot), y:this.y+this.h/2})){
          this.x += s * Math.cos(this.rot);
          break;
        }
      }
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x+this.w/2, y:this.y+this.h/2+s*Math.sin(this.rot)})){
          this.y += s * Math.sin(this.rot);
          break;
        }
      }
    }
  }
  die(){
    this.spd -= this.spdMax * 0.02;
    this.hp -= this.hpMax * 0.0005;
    if(this.hp <= 0){ // Bala dissipou
      let x = balas.indexOf(this);
      balas.splice(x, 1);
    }
  }
}
