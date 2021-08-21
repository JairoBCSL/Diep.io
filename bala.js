class Bala{
  constructor(spriteSRC, x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id, n){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    //this.spriteCFG = spriteCFG;
    this.x = x; this.y = y; this.w = w; this.h = h; this.wSRC = 128; this.hSRC = 128;
    if((classe == 15) || (classe == 23 && n == 2) || (classe == 35 && n == 0) || classe == 42 || (classe == 43 && n == 0) || classe == 44)
      this.xSRC = 386;
    else
      this.xSRC = 0;
    this.ySRC = 128 * team;

    this.hpMax = hpMax; this.hp = this.hpMax; this.bodyDmg = bodyDmg;
    this.rot = rot; this.spd = spd; this.spdMax = this.spd; this.team = team;
    this.classe = classe; this.id = id; this.n = n;
    this.waitCount = 0; this.frameCount = 0; this.estado = 0; this.estado_a = 0;
  }
  fisica(){
    this.move();
    this.dano();
    this.die();
  }
  move(){
    let foi = 0;
    for(let s = this.spd; s > 0; s--){
      if(this.x + this.w + s * Math.cos(this.rot) < game.width && this.x + s * Math.cos(this.rot) > 0){
        this.x += s * Math.cos(this.rot);
        foi++;
      }if(this.y + this.h + s * Math.sin(this.rot) < game.height && this.y + s * Math.sin(this.rot) > 0){
        this.y += s * Math.sin(this.rot);
        foi++;
      }if(foi)
        break;
    }
    if((this.classe == 15) || (this.classe == 23 &&  this.n == 2) || (this.classe == 35 &&  this.n == 0) || this.classe == 42 || (this.classe == 43 && this.n == 0) || this.classe == 44){
      this.spd -= this.spdMax * 0.02;
      this.hp -= 0.125;
    }else{
      this.spd -= this.spdMax * 0.002;
      this.hp -= 0.5;
    }
  }
  dano(){
    for(let i = balas.indexOf(this) + 1; i < balas.length; i++){ // Colidiu com bala inimigos m*m
      if(this.team != balas[i].team){
        if(collision(this, balas[i])){
          let difX = (balas[i].x + balas[i].w / 2) - (this.x + this.w / 2);
          let difY = (balas[i].y + balas[i].h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo);
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(balas[i].x + Math.cos(angulo) < game.width && balas[i].x + Math.cos(angulo) > 0)
            balas[i].x += Math.cos(angulo);
          if(balas[i].y + Math.sin(angulo) < game.height && balas[i].y + Math.sin(angulo) > 0)
            balas[i].y += Math.sin(angulo);
          balas[i].hp -= this.bodyDmg;
          this.hp -= balas[i].bodyDmg;
        }
      }

    }
    for(let nave of naves){ // Colidiu com inimigos m*n
      if(this.team != nave.team)
        if(collision(this, nave)){
          let difX = (nave.x + nave.w / 2) - (this.x + this.w / 2);
          let difY = (nave.y + nave.h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo) ;
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(nave.x + Math.cos(angulo) < game.width && nave.x + Math.cos(angulo) > 0)
            nave.x += Math.cos(angulo);
          if(nave.y + Math.sin(angulo) < game.height && nave.y + Math.sin(angulo) > 0)
            nave.y += Math.sin(angulo);
          nave.hp -= this.bodyDmg;
          if(nave.hp <= 0){
            naves[this.id].score++;
            naves[this.id].exp += 1000 + nave.expTotal;
            naves[this.id].expTotal += 1000 + nave.expTotal;
          }

          this.hp -= nave.bodyDmg;
          nave.regenCooldown = nave.regenCooldownMax;
        }
    }
    for(let drone of drones){ // Colidiu com bala drone m*o
      if(this.team != drone.team){
        if(collision(this, drone)){
          let difX = (drone.x + drone.w / 2) - (this.x + this.w / 2);
          let difY = (drone.y + drone.h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo);
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(drone.x + Math.cos(angulo) < game.width && drone.x + Math.cos(angulo) > 0)
            drone.x += Math.cos(angulo);
          if(drone.y + Math.sin(angulo) < game.height && drone.y + Math.sin(angulo) > 0)
            drone.y += Math.sin(angulo);
          if(this.team != drone.team){
            drone.hp -= this.bodyDmg;
            this.hp -= drone.bodyDmg;
          }
        }
      }
    }
    for(let npc of npcs){ // Colidiu com bala npc m*p
      if(npcs.indexOf(this) != npcs.indexOf(npc))
        if(collision(this, npc)){
          let difX = (npc.x + npc.w / 2) - (this.x + this.w / 2);
          let difY = (npc.y + npc.h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo);
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(npc.x + Math.cos(angulo) < game.width && npc.x + Math.cos(angulo) > 0)
            npc.x += Math.cos(angulo);
          if(npc.y + Math.sin(angulo) < game.height && npc.y + Math.sin(angulo) > 0)
            npc.y += Math.sin(angulo);
          if(this.team != npc.team){
            npc.hp -= this.bodyDmg;
            this.hp -= npc.bodyDmg;
            if(npc.hp <= 0){
              naves[this.id].exp += npc.expTotal;
              naves[this.id].expTotal += npc.expTotal;
            }

          }
        }
    }

  }
  die(){
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
      ctx.drawImage(this.sprite, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);

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
