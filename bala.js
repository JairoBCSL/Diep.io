class Bala{
  constructor(x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n){
    this.init(x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n);
  }
  init(x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n){
    this.x = x; this.y = y; this.w = w; this.h = h; this.wSRC = 128; this.hSRC = 128;
    this.peso = w * h;
    this.xSRC = 0; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128;

    this.hpMax = hpMax; this.hp = this.hpMax; this.bodyDmg = bodyDmg;
    this.rot = rot; this.spd = spd; this.spdMax = this.spd; this.team = team;
    this.classe = classe; this.id = id; this.n = n;
  }
  fisica(){
    this.move();
    this.dano();
    this.die();
  }
  move(){
    let aff = true;
    for(let s = this.spd; s > 0; s--){
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x+this.w/2+s*Math.cos(this.rot), y:this.y+this.h/2})){
          this.x += s * Math.cos(this.rot);
          aff = false;
          break;
        }
      }if(aff)
        this.hp = 0;
      aff = true;
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x+this.w/2, y:this.y+this.h/2+s*Math.sin(this.rot)})){
          this.y += s * Math.sin(this.rot);
          aff = false;
          break;
        }
      }if(aff)
        this.hp = 0;
    }
  }
  dano(){
    for(let i = balas.indexOf(this) + 1; i < balas.length; i++){ // Colidiu com bala inimigos m*m
      if(this.team != balas[i].team){
        if(collision(this, balas[i])){
          collide(this,balas[i]);
          balas[i].hp -= this.bodyDmg;
          this.hp -= balas[i].bodyDmg;
        }
      }

    }
    for(let i = 0; i < naves.length; i++){ // Colidiu com inimigos m*n
      if(this.team != naves[i].team){
        if(collision(this, naves[i])){
            collide(this,naves[i]);
          naves[i].hp -= this.bodyDmg;
          if(naves[i].hp <= 0){
            naves[this.id].score++;
            naves[this.id].exp += 1000 + naves[i].expTotal;
            naves[this.id].expTotal += 1000 + naves[i].expTotal;
          }

          this.hp -= naves[i].bodyDmg;
          naves[i].regenCooldown = naves[i].regenCooldownMax;
        }
      }
    }
    for(let i = 0; i < drones.length; i++){ // Colidiu com bala drone m*o
      if(this.team != drones[i].team){
        if(collision(this, drones[i])){
          collide(this,drones[i]);
          if(this.team != drones[i].team){
            drones[i].hp -= this.bodyDmg;
            this.hp -= drones[i].bodyDmg;
          }
        }
      }
    }
    for(let i = 0; i < npcs.length; i++){ // Colidiu com bala npc m*p
      if(npcs.indexOf(this) != i)
        if(collision(this, npcs[i])){
          collide(this,npcs[i]);
          if(this.team != npcs[i].team){
            npcs[i].hp -= this.bodyDmg;
            this.hp -= npcs[i].bodyDmg;
            if(npcs[i].hp <= 0){
              naves[this.id].exp += npcs[i].expTotal;
              naves[this.id].expTotal += npcs[i].expTotal;
            }

          }
        }
    }
  }
  die(){
    this.spd -= this.spdMax * 0.002;
    this.hp -= this.hpMax * 0.005;
    if(this.hp <= 0){ // Bala dissipou
      let x = balas.indexOf(this);
      balas.splice(x, 1);
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
      ctx.drawImage(imagens.balas, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);

      ctx.restore();
      this.stats();
    }
  }
  stats(){
    var ctx = game.canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = "#F00";
    ctx.fillRect(this.x, this.y - 10, this.w, this.h / 10);
    ctx.fillStyle = "#0F0";
    ctx.fillRect(this.x, this.y - 10, this.w * this.hp/this.hpMax, this.h / 10);
    ctx.restore();
  }
}
