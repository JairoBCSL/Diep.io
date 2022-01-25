class Tower extends Nave{
  init(x, y, r, spdMax, team, classe, id){
    this.x = x; this.y = y; this.w = r; this.h = r; this.peso = r * r; // Posição
    this.xA = x; this.yA = y; this.pesado = 1;
    this.wA = this.w; this.hA = this.h;
    this.drones = 0; this.id = id; this.qualCano = 0; this.dronesMax = 16;
    this.xSRC = 0; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128; // Sprite
    this.hp = 120; this.hpMax = 120; this.hpRegen = 1; this.bodyDmg = 4; // Stats
    this.bulletSpd = 4; this.bulletPen = 60; this.bulletDmg = 9;
    this.bulletSize = 24; this.team = team; this.spdMax = spdMax;
    this.pesada = 1; this.tiroX = 0; this.tiroY = 0;

    this.ptStats = []; this.pt = 0; this.ptStats[0] = 7; this.ptStats[1] = 7; // Pontos
    this.ptStats[2] = 7; this.ptStats[3] = 7; this.ptStats[4] = 7;
    this.ptStats[5] = 7; this.ptStats[6] = 7; this.ptStats[7] = 7;

    this.clStats = []; this.classe = classe; this.ptClasse = 0;

    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0;
    this.reload = 0; this.reloadMax = 60; this.reloadAuto = 0;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.invisible = 120; this.invisibleMax = 120; this.skill = 0;
    this.score = 0; this.lv = 75; this.exp = 0; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;

    this.rot = 0; this.moveRot = 0;
    this.canos = [];
    switch(classe){
      case 61:{ // Rifle Tower
        this.clStats[0] = 0; this.clStats[1] = 120000; this.clStats[2] = 4;
        this.clStats[3] = 1; this.clStats[4] = 120; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 8;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(2,classe,team, id));
        this.canos.push(new Cano(1,classe,team, id));
        this.canos.push(new Cano(0,classe,team, id));
        break; // 32 * 120 / 60 = 64
      }
      case 62:{ // 16 Shot Tower
        this.clStats[0] = 0; this.clStats[1] = 120000; this.clStats[2] = 4;
        this.clStats[3] = 1; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 7;
        this.updateStats();
        this.canos = [];
        for(let i = 0; i < 32; i++)
          this.canos.push(new Cano(i,classe,team, id));
        break; // 16 * 16 * 120 / 30 = 1024
      }
      case 63:{ // Trapper Tower
        this.clStats[0] = 0; this.clStats[1] = 120000; this.clStats[2] = 4;
        this.clStats[3] = 1; this.clStats[4] = 240; this.clStats[5] = 32;
        this.clStats[6] = 240; this.clStats[7] = 2; this.clBulletSize = 12;
        this.updateStats();
        this.canos = [];
        for(let i = 0; i < 12; i++)
          this.canos.push(new CanoTrapper(i,classe, team, id));

        break; // 12 * 32 * 240 / 120 = 768
      }
      case 64:{ // Summoner Tower
        this.clStats[0] = 1; this.clStats[1] = 120000; this.clStats[2] = 4;
        this.clStats[3] = 1; this.clStats[4] = 240; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 0; this.clBulletSize = 2;
        this.updateStats();
        this.canos = [];
        for(let i = 0; i < 8; i++)
          this.canos.push(new CanoOverseer(i,classe, team, id));
        break; // 8 * 8 * 240 / 120 = 128
      }
    }
  }
  fisica() {
    this.perigo();
    this.rot+=0.0025;
    this.dano();
    this.controle();
    for(let i = 0; i < this.canos.length; i++){
      this.canos[i].update();
    }
    this.shoot();
    this.die();
    this.regene();
  }
  shoot(){
    switch(this.classe){
      case 61:{ // Rifle Tower
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 62:{ // 16 Shot Tower
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          for(let i = 0; i < 16; i++)
            this.canos[i].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 63:{ // Trapper Tower
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          for(let i = 0; i < 12; i++)
            this.canos[i].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 64:{ // Summoner Tower
        if(this.reload > 0)
          this.reload--;
        else if(this.drones < this.dronesMax){
          let hover = 0;
          for(let i = 0; i < this.canos.length; i++)
            if(this.drones < this.dronesMax)
              this.canos[i].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break;
      }
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
      this.hpRegen = this.clStats[0];
      this.hpMax = this.clStats[1];
      this.bodyDmg = this.clStats[2];
      this.bulletSpd = this.clStats[3];
      this.bulletPen = this.clStats[4];
      this.bulletDmg = this.clStats[5];
      this.reloadMax = this.clStats[6];
      this.spdMax = this.clStats[7];
      for(let i = 0; i < drones.length; i++)
        if(naves.indexOf(this) == drones[i].id)
          drones[i].hp = 0;
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
      this.tiroX = naves[maisPerto].x + naves[maisPerto].w / 2;
      this.tiroY = naves[maisPerto].y + naves[maisPerto].h / 2;
      this.rot = Math.atan2(this.tiroY-this.y-this.h/2,this.tiroX-this.x-this.w/2);
      this.tiro = 1;
    }else{
      this.tiro = 0;
    }
  }
}
