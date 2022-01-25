class Mothership extends Nave{
  init(x, y, r, spdMax, team, classe, id){
    this.x = x; this.y = y; this.w = r; this.h = r; this.peso = r * r; // Posição
    this.wA = this.w; this.hA = this.h;
    this.drones = 0; this.id = id; this.qualCano = 0; this.dronesMax = 64;
    this.xSRC = 0; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128; // Sprite
    this.hp = 120; this.hpMax = 120; this.hpRegen = 1; this.bodyDmg = 4; // Stats
    this.bulletSpd = 4; this.bulletPen = 60; this.bulletDmg = 9;
    this.bulletSize = 24; this.team = team; this.spdMax = spdMax;
    this.tiroX = 0; this.tiroY = 0; this.pesado = 1;

    this.ptStats = []; this.pt = 0; this.ptStats[0] = 7; this.ptStats[1] = 7; // Pontos
    this.ptStats[2] = 7; this.ptStats[3] = 7; this.ptStats[4] = 7;
    this.ptStats[5] = 7; this.ptStats[6] = 7; this.ptStats[7] = 7;

    this.clStats = []; this.clStats[0] = 1; this.clStats[1] = 120000; // Classe
    this.clStats[2] = 4; this.clStats[3] = 1; this.clStats[4] = 40;
    this.clStats[5] = 4; this.clStats[6] = 60; this.clStats[7] = 0.5;
    this.clBulletSize = 2; this.classe = classe;  this.ptClasse = 0;

    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0;
    this.reload = 0; this.reloadMax = 60; this.reloadAuto = 0;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.invisible = 120; this.invisibleMax = 120; this.skill = 0;
    this.score = 0; this.lv = 85; this.exp = 0; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;
    this.rot = 0; this.moveRot = 0;

    this.updateStats();
    this.canos = [];
    for(let i = 0; i < 16; i++)
      this.canos.push(new CanoOverseer(i,classe,team, id));
  }
  fisica() {
    this.perigo();
    this.dano();
    this.controle();
    this.move();
    for(let i = 0; i < this.canos.length; i++){
      this.canos[i].update();
    }
    this.shoot();
    this.die();
    this.regene();
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
    for(let s = this.spd; s > 0; s--){
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x+this.w/2+s*Math.cos(this.moveRot), y:this.y+this.h/2})){
          this.x += s * Math.cos(this.moveRot);
          break;
        }
      }
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x+this.w/2, y:this.y+this.h/2+s*Math.sin(this.moveRot)})){
          this.y += s * Math.sin(this.moveRot);
          break;
        }
      }
    }
  }
  shoot(){
    if(this.reload > 0)
      this.reload--;
    else{
      for(let i = 0; i < 16; i++)
        if(this.drones < this.dronesMax)
          this.canos[i].shoot();
      let nDrones = 0;
      for(let i = 0; i < drones.length; i++)
        if(drones[i].id == naves.indexOf(this)){
          drones[i].hover = Math.PI * 2 / this.drones * nDrones;
          nDrones++;
        }
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
      for(let i = 0; i < this.canos.length; i++)
        this.canos[i].draw();
      ctx.save();
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      ctx.drawImage(imagens.naves, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
      ctx.restore();
      this.stats();
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
    let amigoDist, perigo = 0, dist = this.w * 4;
    for(let i = 0; i < naves.length; i++){ // Procurando inimigo
      if(naves[i].team != this.team){
        atualDist = Math.sqrt(Math.pow(naves[i].x+naves[i].w/2-this.x-this.w/2, 2) + Math.pow(naves[i].y+naves[i].h/2-this.y-this.h/2, 2));
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = i;
        }
      }
    }
    if(maisPertoDist < dist){ // Atacando
      this.rot = Math.atan2(naves[maisPerto].y+naves[maisPerto].h/2-this.y-this.h/2,naves[maisPerto].x+naves[maisPerto].w/2-this.x-this.w/2);
      this.tiroX = naves[maisPerto].x + naves[maisPerto].w / 2;
      this.tiroY = naves[maisPerto].y + naves[maisPerto].h / 2;
      this.tiro = 1;
    }else{
      this.tiro = 0;
    }
  }
}
