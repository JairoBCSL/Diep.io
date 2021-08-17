class Drone{
  constructor(spriteSRC, x, y, w, h, spdMax, rot, bulletPen, bulletDmg, team, classe, id){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.wA = this.w; this.hA = this.h;
    this.canoX = 0; this.canoY = 0; this.canoZ = 0; this.canoW = 0;
    this.id = id; this.hover = 0; naves[this.id].drones++;
    this.xSRC = 128 * classe; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128; // Sprite
    this.hp = bulletPen; this.hpMax = bulletPen; this.hpRegen = 1; this.bodyDmg = bulletDmg; // Stats
    this.bulletSpd = 4; this.bulletPen = 60; this.bulletDmg = 9;
    this.bulletSize = 24; this.team = team; this.spdMax = spdMax / 3;

    this.clStats = []; this.classe = classe; this.clStats[0] = 0.1; this.clStats[1] = 120; // Classe
    this.clStats[2] = 4; this.clStats[3] = 4; this.clStats[4] = 60;
    this.clStats[5] = 4; this.clStats[6] = 60; this.clStats[7] = 2;
    this.clBulletSize = 32; this.ptClasse = 0;

    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0; this.jumpSpeed = 0;
    this.reload = 0; this.reloadMax = 60;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.score = 0; this.lv = 1; this.exp = 0; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;
    this.waitCount = 0; this.frameCount = 0; this.estado = 0; this.estado_a = 0;
    this.rot = 0;
  }
  fisica() {
    this.dano();
    this.controle();
    this.move();
    this.aim();
    this.die();
  }
  controle(){
    let pertos = 0, maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let perigo = 0, amigoDist;
    for(let nave of naves){ // Procurando inimigo
      if(nave.team != this.team){
        atualDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(atualDist < 480){
          pertos++;
          perigo += nave.batalha;
        }
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = naves.indexOf(nave);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(amigoDist < 480){
          perigo -= nave.batalha;
        }
      }
    }
    let x = naves[this.id].x + naves[this.id].w / 2 + 160 * Math.cos(this.hover);
    let y = naves[this.id].y + naves[this.id].h / 2 + 160 * Math.sin(this.hover);
    let z = Math.atan2(this.y + this.h - y, x - this.x - this.w);
    this.hover += 0.005;
    // Comandando
    if(naves[this.id].tiro){
      this.rot = Math.atan2(game.mouseY + cam.y - this.y - this.h/2, game.mouseX + cam.x - this.x - this.w / 2);
      this.tiro = 1;
      let modulo = Math.sqrt( Math.pow(this.x + this.w / 2 - game.mouseX - cam.x, 2) + Math.pow(this.y + this.h / 2 - game.mouseY - cam.y, 2) );
      let angulo = Math.atan2(this.y + this.h / 2 - game.mouseY - cam.y, game.mouseX + cam.x - this.x - this.w / 2);
      let vai;
      if(modulo > 20)
        vai = +1;
      else if(modulo < 10)
        vai = -1;
      if(Math.cos(angulo) > 0.2){
        this.right = vai;
        this.left = 0;
      }else if(Math.cos(angulo) < -0.2){
        this.left = vai;
        this.right = 0;
      }else{
        this.left = 0;
        this.right = 0;
      }if(Math.sin(angulo) > 0.2){
        this.up = vai;
        this.down = 0;
      }else if(Math.sin(angulo) < -0.2){
        this.down = vai;
        this.up = 0;
      }else{
        this.up = 0;
        this.down = 0;
      }
    }
    // Tem alguém perto?
    else if(pertos && z < 480){
      // Ataca
      this.rot = Math.atan2(naves[maisPerto].y+naves[maisPerto].h / 2 - this.y - this.h / 2, naves[maisPerto].x+naves[maisPerto].w / 2-this.x-this.w / 2);
      this.tiro = 1;
      let modulo = Math.sqrt( Math.pow(this.x+this.w/2-naves[maisPerto].x-naves[maisPerto].w/2, 2) + Math.pow(this.y+this.h/2-naves[maisPerto].y-naves[maisPerto].h/2, 2) );
      let angulo = Math.atan2(this.y+this.h/2-naves[maisPerto].y-naves[maisPerto].h/2, naves[maisPerto].x+naves[maisPerto].w/2-this.x-this.w/2);
      let vai = 1;
      if(Math.cos(angulo) > 0.2){
        this.right = vai;
        this.left = 0;
      }else if(Math.cos(angulo) < -0.2){
        this.left = vai;
        this.right = 0;
      }else{
        this.left = 0;
        this.right = 0;
      }if(Math.sin(angulo) > 0.2){
        this.up = vai;
        this.down = 0;
      }else if(Math.sin(angulo) < -0.2){
        this.down = vai;
        this.up = 0;
      }else{
        this.up = 0;
        this.down = 0;
      }

    }
    // Circula
    else{
      let x = naves[this.id].x + naves[this.id].w / 2 + naves[this.id].w * 2 * Math.cos(this.hover);
      let y = naves[this.id].y + naves[this.id].h / 2 + naves[this.id].h * 2 * Math.sin(this.hover);
      this.tiro = 1;
      let modulo = Math.sqrt(Math.pow(this.x+this.w/2-x,2) + Math.pow(this.y+this.h/2-y, 2));
      let angulo = Math.atan2(this.y + this.h / 2 - y, x - this.x - this.w / 2);
      this.rot = Math.PI;
      let vai;
      if(modulo > this.w/2)
        vai = +1;
      else
        vai = 0;
      if(Math.cos(angulo) > 0.2){
        this.right = vai;
        this.left = 0;
      }else if(Math.cos(angulo) < -0.2){
        this.left = vai;
        this.right = 0;
      }else{
        this.left = 0;
        this.right = 0;
      }if(Math.sin(angulo) > 0.2){
        this.up = vai;
        this.down = 0;
      }else if(Math.sin(angulo) < -0.2){
        this.down = vai;
        this.up = 0;
      }else{
        this.up = 0;
        this.down = 0;
      }

    }
  }
  aim(){

  }
  dano(){
    for(let i = drones.indexOf(this) + 1; i < drones.length; i++){ // Colidiu com inimigos o*o
      if(collision(this, drones[i])){
          let difX = (drones[i].x + drones[i].w / 2) - (this.x + this.w / 2);
          let difY = (drones[i].y + drones[i].h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo);
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(drones[i].x + drones[i].w + Math.cos(angulo) < game.width && drones[i].x + Math.cos(angulo) > 0)
            drones[i].x += Math.cos(angulo);
          if(drones[i].y + drones[i].h + Math.sin(angulo) < game.height && drones[i].y + Math.sin(angulo) > 0)
            drones[i].y += Math.sin(angulo);
          if(this.team != drones[i].team){
            drones[i].hp -= this.bodyDmg;
            this.hp -= drones[i].bodyDmg;
            this.regenCooldown = this.regenCooldownMax;
          }
        }
    }
    for(let npc of npcs){ // Colidiu com npc o*p
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
            naves[this.id].exp += npc.expTotal;
            naves[this.id].expTotal += npc.expTotal;
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
        this.spd+=1/2;
        // Começando a andar
        this.andando = true;
      }
      else{
        // Loop Andando
        this.andando = true;
      }
    }else{
      if(this.spd > 0){
        this.spd-=1/2;
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
  updateStats(){
    this.w = this.wA * (1 + naves[this.id].lv / 90);
    this.h = this.hA * (1 + naves[this.id].lv / 90);
    this.hpMax = naves[this.id].clStats[1]*(1+naves[this.id].lv/45)*(1+naves[this.id].ptStats[1]/7);
    this.bodyDmg = naves[this.id].clStats[2]*(1+naves[this.id].lv/45)*(1+naves[this.id].ptStats[0]/7);
    this.spdMax = naves[this.id].clStats[3]*(1+naves[this.id].ptStats[3]/7);
    this.bulletSize = naves[this.id].clBulletSize * (1 + naves[this.id].lv / 90);
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
  die(){
    if(this.hp <= 0){ // Bala dissipou
      naves[this.id].drones--;
      let x = drones.indexOf(this);
      drones.splice(x, 1);
    }
  }
}
