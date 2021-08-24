class Mothership{
  constructor(x, y, r, spdMax, team, classe, id){
    this.x = x; this.y = y; this.w = r; this.h = r; this.peso = r * r; // Posição
    this.wA = this.w; this.hA = this.h;
    this.drones = 0; this.id = id; this.qualCano = 0; this.dronesMax = 64;
    this.xSRC = 0; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128; // Sprite
    this.hp = 120; this.hpMax = 120; this.hpRegen = 1; this.bodyDmg = 4; // Stats
    this.bulletSpd = 4; this.bulletPen = 60; this.bulletDmg = 9;
    this.bulletSize = 24; this.team = team; this.spdMax = spdMax;

    this.ptStats = []; this.pt = 0; this.ptStats[0] = 7; this.ptStats[1] = 7; // Pontos
    this.ptStats[2] = 7; this.ptStats[3] = 7; this.ptStats[4] = 7;
    this.ptStats[5] = 7; this.ptStats[6] = 7; this.ptStats[7] = 7;


    this.clStats = []; this.clStats[0] = 1; this.clStats[1] = 120000; // Classe
    this.clStats[2] = 4; this.clStats[3] = 3; this.clStats[4] = 60;
    this.clStats[5] = 4; this.clStats[6] = 30; this.clStats[7] = 0.5;
    this.clBulletSize = 8; this.classe = classe;  this.ptClasse = 0;

    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0;
    this.reload = 0; this.reloadMax = 60; this.reloadAuto = 0;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.invisible = 120; this.invisibleMax = 120; this.skill = 0;
    this.score = 0; this.lv = 45; this.exp = 0; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;
    this.rot = 0; this.moveRot = 0;

    this.updateStats();
    this.canos = [];
    this.canos.push(new Cano(0,classe,team, id));
    this.canos.push(new Cano(1,classe,team, id));
    this.canos.push(new Cano(2,classe,team, id));
    this.canos.push(new Cano(3,classe,team, id));
    this.canos.push(new Cano(4,classe,team, id));
    this.canos.push(new Cano(5,classe,team, id));
    this.canos.push(new Cano(6,classe,team, id));
    this.canos.push(new Cano(7,classe,team, id));
    this.canos.push(new Cano(8,classe,team, id));
    this.canos.push(new Cano(9,classe,team, id));
    this.canos.push(new Cano(10,classe,team, id));
    this.canos.push(new Cano(11,classe,team, id));
    this.canos.push(new Cano(12,classe,team, id));
    this.canos.push(new Cano(13,classe,team, id));
    this.canos.push(new Cano(14,classe,team, id));
    this.canos.push(new Cano(15,classe,team, id));
  }
  fisica() {
    this.levelUp();
    this.perigo();
    this.dano();
    this.controle();
    this.move();
    this.aim();
    for(let i = 0; i < this.canos.length; i++){
      this.canos[i].update();
    }
    this.shoot();
    this.die();
    this.regene();
  }
  perigo(){
    this.batalha =this.hp*this.bodyDmg*this.bulletSpd*this.bulletPen*this.bulletDmg*this.reloadMax*this.spdMax/1000000;
  }
  dano(){
    for(let i = naves.indexOf(this) + 1; i < naves.length; i++){ // Colidiu com inimigos n*n
      if(collision(this, naves[i])){
          let difX = (naves[i].x + naves[i].w / 2) - (this.x + this.w / 2);
          let difY = (naves[i].y + naves[i].h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo);
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(naves[i].x + Math.cos(angulo) < game.width && naves[i].x + Math.cos(angulo) > 0)
            naves[i].x += Math.cos(angulo);
          if(naves[i].y + Math.sin(angulo) < game.height && naves[i].y + Math.sin(angulo) > 0)
            naves[i].y += Math.sin(angulo);
          if(this.team != naves[i].team){
            naves[i].hp -= this.bodyDmg;
            if(naves[i].hp <= 0){
              this.score++;
              this.exp += 1000 + naves[i].expTotal;
              this.expTotal += 1000 + naves[i].expTotal;
            }
            this.hp -= naves[i].bodyDmg;
            naves[i].regenCooldown = naves[i].regenCooldownMax;
            this.regenCooldown = this.regenCooldownMax;
          }
        }
    }
    for(let drone of drones){ // Colidiu com bala drone n*o
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
          this.regenCooldown = this.regenCooldownMax;
        }
      }
    }
    for(let npc of npcs){ // Colidiu com npc n*p
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
          npc.hp -= this.bodyDmg;
          if(npc.hp <= 0){
            this.exp += npc.expTotal;
            this.expTotal += npc.expTotal;
          }
          this.hp -= npc.bodyDmg;
          this.regenCooldown = this.regenCooldownMax;
        }
    }
  }
  move(){
      this.rot += 0.0025;
    this.dirX = this.right - this.left; // Andando
    this.dirY = this.down - this.up;
    if(this.dirX || this.dirY){
      this.moveRot = Math.atan2(this.dirY,this.dirX);
      if(this.spd < this.spdMax){
        this.spd+=1/8;
        // Começando a andar
        this.andando = true;
      }
      else{
        // Loop Andando
        if(this.spd > this.spdMax)
          this.spd-=1/8;
        this.andando = true;
      }
    }
    else{
      if(this.invisibleSkill && this.invisible > 0) // Stalker
        this.invisible--;
      if(this.spd > 0){
        this.spd-=1/8;
        // Parando de andar
      }else{
        // Parado
      }
    }
    let foi = 0;
    for(let s = this.spd; s > 0; s--){
      if(this.x + this.w + s * Math.cos(this.moveRot) < game.width && this.x + s * Math.cos(this.moveRot) > 0){
        this.x += s * Math.cos(this.moveRot);
        foi++;
      }if(this.y + this.h + s * Math.sin(this.moveRot) < game.height && this.y + s * Math.sin(this.moveRot) > 0){
        this.y += s * Math.sin(this.moveRot);
        foi++;
      }if(foi)
        break;
    }
  }
  shoot(){
    if(this.reload > 0)
      this.reload--;
    else{
      for(let i = 0; i < 16; i++)
        if(this.drones < this.dronesMax)
          this.canos[i].shoot();
      for(let i = 0; i < drones.length; i++)
        if(drones[i].id == naves.indexOf(this))
          drones[i].hover = Math.PI * 2 / this.drones * i;
      this.reload = this.reloadMax;
    }
  }
  regene(){
    if(this.hp < this.hpMax && this.regenCooldown <= 0)
      this.hp+=this.hpRegen;
    if(this.regenCooldown > 0)
      this.regenCooldown--;
    else
      this.regenCooldown = 0;
  }
  updateStats(){
    if(this.id == 0){
      //cam.w = cam.wMin * (1 + this.lv / 90);
      //cam.h = cam.hMin * (1 + this.lv / 90);
    }
    this.w = this.wA * (1 + this.lv / 90);
    this.h = this.hA * (1 + this.lv / 90);
    this.hpRegen = this.clStats[0]*(1+this.lv/45)*(1+this.ptStats[0]/7);
    this.regenCooldownMax = 300 / (1+this.ptStats[0]/7);
    this.hpMax = this.clStats[1]*(1+this.lv/45)*(1+this.ptStats[1]/7);
    this.hp = this.hpMax;
    this.bodyDmg = this.clStats[2]*(1+this.lv/45)*(1+this.ptStats[0]/7);
    this.bulletSpd = this.clStats[3]*(1+this.lv/45)*(1+this.ptStats[3]/7);
    this.bulletPen = this.clStats[4]*(1+this.lv/45)*(1+this.ptStats[4]/7);
    this.bulletDmg = this.clStats[5]*(1+this.lv/45)*(1+this.ptStats[5]/7);
    this.reloadMax = this.clStats[6] / (1+this.lv/45*(1+this.ptStats[6]/7));
    this.spdMax = this.clStats[7]*(1+this.ptStats[7]/7);
    this.bulletSize = this.clBulletSize * (1 + this.lv / 90) * this.h / 128;
    for(let i = 0; i < drones.length; i++)
      if(naves.indexOf(this) == drones[i].id)
        drones[i].updateStats();
  }
  levelUp(){
    let x = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
    if(this.lv < 45){
      while(this.exp >= this.nextLv && this.lv < 45){
        this.pt += x[this.lv];
        this.updateStats();
        this.exp -= this.nextLv;
        this.lv++;
        if(this.lv % 15 == 0)
          this.ptClasse++;
        this.nextLv = 100 * this.lv * this.lv;
      }
    }else{
      this.exp = this.nextLv;
    }
  }
  draw(){
    let x0 = (this.x + this.w > cam.x);
    let x1 = (this.x < cam.x + cam.w);
    let y0 = (this.y + this.h > cam.y);
    let y1 = (this.y < cam.y + cam.h);
    if(x0 && y0 && x1 && y1){
      var ctx = game.canvas.getContext("2d");
      if(this.invisibleSkill)
        ctx.globalAlpha = this.invisible / this.invisibleMax;
      for(let i = 0; i < this.canos.length; i++)
        if(!(this.classe == 22 && i == 4) && !(this.classe == 43 && i > 0) && !(this.classe == 46 && i == 1))
          this.canos[i].draw();
      ctx.save();
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      ctx.drawImage(imagens.naves, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
      //ctx.strokeRect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
      //ctx.strokeRect(this.x+this.w/2, this.y+this.h/2, this.w, this.h);
      //ctx.strokeRect(this.x, this.y, this.w, this.h);
      ctx.restore();
      if(this.classe == 22)
        this.canos[4].draw();
      if(this.classe == 43){
        this.canos[1].draw();
        this.canos[2].draw();
      }if(this.classe == 46)
        this.canos[1].draw();

      this.stats();
      if(this.invisibleSkill)
        ctx.globalAlpha = 1;
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
  die() {
    if(this.hp <= 0){
      this.hp = this.hpMax;
      this.score = 0;
      this.x = bases[this.team].x + Math.floor(Math.random() * bases[this.team].w - 32);
      this.y = bases[this.team].y + Math.floor(Math.random() * bases[this.team].h - 32);
    }
  }
  controle(){
    let pertos = [], maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let amigoDist, perigo = 0;
    for(let nave of naves){ // Procurando inimigo
      if(nave.team != this.team){
        atualDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(atualDist < 960)
          perigo += nave.batalha;
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = naves.indexOf(nave);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(amigoDist < 960)
          perigo -= nave.batalha;
      }
    }
  }
  aim(){

  }
}
