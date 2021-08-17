class Nave{
  constructor(spriteSRC, spriteCFG, x, y, w, h, spdMax, jumpHeight, team, classe, id){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    this.spriteCFG = spriteCFG;
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.wA = this.w; this.hA = this.h;
    this.drones = 0; this.id = id; this.qualCano = 0;
    this.xSRC = 0; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128; // Sprite

    this.hp = 120; this.hpMax = 120; this.hpRegen = 1; this.bodyDmg = 4; // Stats
    this.bulletSpd = 4; this.bulletPen = 60; this.bulletDmg = 9;
    this.bulletSize = 24; this.team = team; this.spdMax = spdMax;

    this.ptStats = []; this.pt = 0; this.ptStats[0] = 0; this.ptStats[1] = 0; // Pontos
    this.ptStats[2] = 0; this.ptStats[3] = 0; this.ptStats[4] = 0;
    this.ptStats[5] = 0; this.ptStats[6] = 0; this.ptStats[7] = 0;

    this.clStats = []; this.classe = classe; this.clStats[0] = 1; this.clStats[1] = 120; // Classe
    this.clStats[2] = 4; this.clStats[3] = 4; this.clStats[4] = 60;
    this.clStats[5] = 4; this.clStats[6] = 60; this.clStats[7] = 2;
    this.clBulletSize = 32; this.ptClasse = 0;

    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0; this.jumpSpeed = 0;
    this.jumpHeight = jumpHeight; this.reload = 0; this.reloadMax = 60;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.score = 0; this.lv = 1; this.exp = 1000000; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;
    this.waitCount = 0; this.frameCount = 0; this.estado = 0; this.estado_a = 0;
    this.rot = 0;
    this.canos = [];
    this.canos.push(new Cano("canos.png",0,classe,this.team, id));
    this.updateStats();
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
    this.batalha = this.hpRegen*this.hp*this.hpMax*this.bodyDmg*this.bulletSpd*this.bulletPen*this.bulletDmg*this.reloadMax*this.spdMax;
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
    this.dirX = this.right - this.left; // Andando
    this.dirY = this.down - this.up;
    if(this.dirX || this.dirY){
      if(this.dirX && this.dirY){
        this.orientX = Math.sqrt(2) * this.dirX / 2;
        this.orientY = Math.sqrt(2) * this.dirY / 2;
      }
      else if(this.dirX && !this.dirY){
        this.orientX = this.dirX;
        this.orientY = 0;
      }
      else if(!this.dirX && this.dirY){
        this.orientX = 0;
        this.orientY = this.dirY;
      }
      else{
        this.orientX = 0;
        this.orientY = 0;
      }

      if(this.spd < this.spdMax){
        this.spd+=1/8;
        // Começando a andar
        this.andando = true;
      }
      else{
        // Loop Andando
        this.andando = true;
      }
    }else{
      if(this.spd > 0){
        this.spd-=1/8;
        // Parando de andar
        this.andando = true;
      }else{
        this.dirX = 0;
        this.dirY = 0;
        this.andando = false;
        // Parado
      }
    }let foi = 0;
    for(let s = this.spd; s > 0; s--){
      if(this.x + this.w + s * this.orientX < game.width && this.x + s * this.orientX > 0){
        this.x += s * this.orientX;
        foi++;
      }if(this.y + this.h + s * this.orientY < game.height && this.y + s * this.orientY > 0){
        this.y += s * this.orientY;
        foi++;
      }if(foi)
        break;
    }
  }
  shoot(){
    if(this.reload > 0)
      this.reload--;
    else
      switch(this.classe){
      case 0:{ // Normal
        if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 1:{ // Machine Gun
        if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 2:{ // Twin
        if(this.tiro){
          this.canos[this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }
        break;
      }
      case 3:{ // Sniper
        if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 4:{ // Flank x - dw/2     y + dh/2
        if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 5:{ // Smasher
        break; // 8 * 120 / 120 = 8
      }
      case 6:{ // Destroyer
        if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break; // 16 * 120 / 120 = 16
      }
      case 7:{ // Gunner
        if(this.tiro){
          this.canos[this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 4;
          this.reload = this.reloadMax;
        }
        break; // 4 * 60 / 15 = 16
      }
      case 8:{ // Triple Shot
        if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.reload = this.reloadMax;
        }
        break; // 3 * 4 * 60 / 45 = 16
      }
      case 9:{ // Quad Tank
        if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.canos[3].shoot();
          this.reload = this.reloadMax;
        }
        break; // 8 * 120 / 120 = 8
      }
      case 10:{ // Twin Flank
        if(this.tiro){
          this.canos[0+this.qualCano].shoot();
          this.canos[2+this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }

        break; // 8 * 120 / 120 = 8
      }
      case 11:{ // Assassin
        this.canos[0].shoot();
        this.reload = this.reloadMax;
        break; // 8 * 120 / 120 = 8
      }
      case 12:{ // Overseer
        if(this.drones < 8){
          let hover = 0;
          this.canos[0].shoot();
          this.canos[1].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break; // 8 * 120 / 120 = 8
      }
      case 13:{ // Hunter
        if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break; // 8 * 120 / 120 = 8
      }
      case 14:{ // Trapper
        if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break; // 8 * 120 / 120 = 8
      }
      case 15:{ // Tri-Angle
        this.canos[0].shoot();
        this.canos[1].shoot();
        this.canos[2].shoot();
        this.reload = this.reloadMax;
        break; // 8 * 120 / 120 = 8
      }
    }

  }
  regene(){
    if(this.hp < this.hpMax && !this.regenCooldown)
      this.hp+=this.hpRegen;
    if(this.regenCooldown)
      this.regenCooldown--;
  }
  updateStats(){
    this.w = this.wA * (1 + this.lv / 90);
    this.h = this.hA * (1 + this.lv / 90);
    this.hpRegen = this.clStats[0]*(1+this.lv/45)*(1+this.ptStats[0]/7);
    this.regenCooldownMax = 300 / this.stats[0];
    this.hpMax = this.clStats[1]*(1+this.lv/45)*(1+this.ptStats[1]/7);
    this.hp = this.hpMax;
    this.bodyDmg = this.clStats[2]*(1+this.lv/45)*(1+this.ptStats[0]/7);
    this.bulletSpd = this.clStats[3]*(1+this.lv/45)*(1+this.ptStats[3]/7);
    this.bulletPen = this.clStats[4]*(1+this.lv/45)*(1+this.ptStats[4]/7);
    this.bulletDmg = this.clStats[5]*(1+this.lv/45)*(1+this.ptStats[5]/7);
    this.reloadMax = this.clStats[6] / (1+this.lv/45*(1+this.ptStats[6]/7));
    this.spdMax = this.clStats[7]*(1+this.ptStats[7]/7);
    this.bulletSize = this.clBulletSize * (1 + this.lv / 90);
    for(let i = 0; i < drones.length; i++)
      if(naves.indexOf(this) == drones[i].id)
        drones[i].updateStats();
  }
  changeClass(classe){
    this.reload = 0; this.qualCano = 0;
    switch(classe){
      case 0:{ // Normal
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 60; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 60 = 4
      }
      case 1:{ // Machine Gun
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 28;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 30 = 8
      }
      case 2:{ // Twin
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 28;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 30 = 8
      }
      case 3:{ // Sniper
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 4:{ // Flank
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 30 = 8
      }
      case 5:{ // Smasher
        this.clStats[0] = 1; this.clStats[1] = 240; this.clStats[2] = 8;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 6:{ // Destroyer
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 7:{ // Gunner
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 15; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",3,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 15 = 16
      }
      case 8:{ // Triple Shot
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 60; this.clStats[5] = 4; //*3
        this.clStats[6] = 45; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",2,classe,this.team, naves.indexOf(this)));
        break; // 3 * 4 * 60 / 45 = 16
      }
      case 9:{ // Quad Tank
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",3,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 10:{ // Twin Flank
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",3,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 11:{ // Assassin
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 12:{ // Overseer
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 13:{ // Hunter
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 14:{ // Trapper
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 15:{ // Tri-Angle
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.canos = [];
        this.canos.push(new Cano("canos.png",0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano("canos.png",2,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }

    }
    if(!naves.indexOf(this))
      console.log("Tem "+this.ptClasse+" pontos");
    this.ptClasse -= classes[this.classe][classe];
    if(!naves.indexOf(this)){
      console.log("Tirou "+classes[this.classe][classe]+" pontos");
      console.log("Agora tem "+this.ptClasse+" pontos");
      console.log("E passou da classe "+this.classe+" para a classe "+classe);
    }
    this.classe = classe;
    this.updateStats();
  }
  levelUp(){
    let x = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
    if(this.lv < 45){
      if(this.exp >= this.nextLv){
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
      for(let cano of this.canos)
        cano.draw();
      ctx.save();
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      ctx.drawImage(this.sprite, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
      ctx.strokeRect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
      ctx.strokeRect(this.x+this.w/2, this.y+this.h/2, this.w, this.h);
      ctx.strokeRect(this.x, this.y, this.w, this.h);

      ctx.restore();
      this.stats();
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
      this.exp = 0;
      this.expTotal = 0;
      this.pt = 0;
      this.ptStats[0] = 0;
      this.ptStats[1] = 0;
      this.ptStats[2] = 0;
      this.ptStats[3] = 0;
      this.ptStats[4] = 0;
      this.ptStats[5] = 0;
      this.ptStats[6] = 0;
      this.ptStats[7] = 0;
      this.ptClasse = 4;
      this.changeClass(0);
      this.hpRegen = this.clStats[0];
      this.hpMax = this.clStats[1];
      this.bodyDmg = this.clStats[2];
      this.bulletSpd = this.clStats[3];
      this.bulletPen = this.clStats[4];
      this.bulletDmg = this.clStats[5];
      this.reloadMax = this.clStats[6];
      this.spdMax = this.clStats[7];

      let x = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

      for(let i = 0; i < Math.floor(this.lv / 2); i++)
        this.expTotal += 100 * i * i;
      this.exp = this.expTotal;
      this.nextLv = 0;
      this.lv = 0;

      this.x = bases[this.team].x + Math.floor(Math.random() * bases[this.team].w - 32);
      this.y = bases[this.team].y + Math.floor(Math.random() * bases[this.team].h - 32);
    }
  }
}
