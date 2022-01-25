class DroneFactory extends Drone{
  init(x, y, w, h, spdMax, rot, bulletPen, bulletDmg, team, classe, id, n){
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.wA = this.w; this.hA = this.h; this.peso = w * h;
    this.canoX = 0; this.canoY = 0; this.canoZ = 0; this.canoW = 0;
    this.hover = 0; naves[id].drones++; this.n = n;
    this.xSRC = 1242; this.ySRC = 128 * team; this.wSRC = 184; this.hSRC = 128; // Sprite

    this.w = this.wA * (1 + naves[id].lv / 90); // Stats
    this.h = this.hA * (1 + naves[id].lv / 90);
    this.hpMax = naves[id].clStats[4]*(1+naves[id].lv/45)*(1+naves[id].ptStats[4]/7);
    this.bodyDmg = naves[id].clStats[5]*(1+naves[id].lv/45)*(1+naves[id].ptStats[5]/7);
    this.spdMax = naves[id].clStats[3]*(1+naves[id].ptStats[3]/7);
    this.bulletSize = naves[id].clBulletSize * (1 + naves[id].lv / 90);
    this.classe = classe; this.team = team; this.id = id; this.hp = this.hpMax;

    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0; this.jumpSpeed = 0;
    this.reload = 0; this.reloadMax = naves[id].reloadMax;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.score = 0; this.lv = 1; this.exp = 0; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;
    this.angulo = 0; this.modulo = 0;
    this.rot = 0;
    this.canos = [];
    //console.log(id);
    this.dist = naves[id].w * 9;
  }
  fisica() {
    this.dano();
    this.controle();
    this.move();
    this.shoot();
    this.die();
  }
  controle(){
    let pertos = 0, maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let perigo = 0, amigoDist; this.hover += 0.005; this.tiro = 0;
    let x, y, vai, npc = 0;
    if(naves[this.id].tiro){ // Comandando
      x = naves[this.id].tiroX - (this.x + this.w / 2);
      y = naves[this.id].tiroY - (this.y + this.h / 2);
      this.angulo = Math.atan2(y,  x);
      this.modulo = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
      this.tiro = 1;
      this.rot = this.angulo;
      if(this.modulo > this.w * 5){
        this.andando = 1;
      }else if(this.modulo < this.w * 4.5){
        this.andando = -1;
      }else{
        this.andando = 0;
      }
    }else{ // Pensando
      for(let i = 0; i < npcs.length; i++){ // Procurando npc
        atualDist = Math.sqrt(Math.pow(npcs[i].x+npcs[i].w/2-this.x-this.w/2, 2) + Math.pow(npcs[i].y+npcs[i].h/2-this.y-this.h/2, 2));
        if(atualDist < this.dist){
            pertos++;
            if(atualDist < maisPertoDist){
              npc = 1;
              maisPertoDist = atualDist;
              maisPerto = i;
            }
        }
      }
      for(let i = 0; i < naves.length; i++){ // Procurando inimigo
        if(naves[i].team != this.team){
          atualDist = Math.sqrt(Math.pow(naves[i].x+naves[i].w/2-this.x-this.w/2, 2) + Math.pow(naves[i].y+naves[i].h/2-this.y-this.h/2, 2));
          if(atualDist < this.dist){
            pertos++;
            if(atualDist < maisPertoDist){
              npc = 2;
              maisPertoDist = atualDist;
              maisPerto = i;
            }
          }
        }
      }
      if(pertos){ // Atacando
        if(npc == 1){ // É Npc
          x = npcs[maisPerto].x + npcs[maisPerto].w / 2;
          y = npcs[maisPerto].y + npcs[maisPerto].h / 2;
        }else{ // É Nave
          x = naves[maisPerto].x + naves[maisPerto].w / 2;
          y = naves[maisPerto].y + naves[maisPerto].h / 2;
        }
        this.modulo = Math.sqrt(Math.pow(x - this.x - this.w / 2, 2)+Math.pow(y - this.y - this.h / 2, 2));
        this.angulo = Math.atan2(y - this.y - this.h / 2,  x - this.x - this. w / 2);
        this.rot = this.angulo;
        this.tiro = 1;
        console.log(this.modulo);
        if(this.modulo > this.w * 5){
          this.andando = 1;
        }else if(this.modulo < this.w * 4.5){
          this.andando = -1;
        }else{
          this.andando = 0;
        }
      }else{ // Circulando
        x = naves[this.id].x + naves[this.id].w / 2 + naves[this.id].w * 2 * Math.cos(this.hover);
        y = naves[this.id].y + naves[this.id].h / 2 + naves[this.id].h * 2 * Math.sin(this.hover);
        this.modulo = Math.sqrt(Math.pow(this.x + this.w / 2 - x, 2) + Math.pow(this.y + this.h / 2 - y, 2));
        this.angulo = Math.atan2(y - this.y - this.h / 2, x - this.x - this.w / 2);
        this.rot = this.angulo;
        if(this.modulo > this.w / 2){
          this.andando = 1;
        }else{
          this.andando = 0;
        }
      }
    }
  }
  move(){
    if(this.classe == 31)
      this.hp -= 0.005 * this.hpMax / (1 + naves[this.id].ptStats[4]/7);
    if(this.andando){
      this.orientX = this.andando*Math.cos(this.angulo);
      this.orientY = this.andando*Math.sin(this.angulo);
      //console.log(this.angulo / Math.PI * 180);
      if(this.spd < this.spdMax){
        this.spd+=1/2;
        // Começando a andar
      }
      else{
        // Loop Andando
      }
    }else{
      if(this.spd > 0){
        this.spd-=1/2;
        // Parando de andar
      }else{
        // Parado
      }
    }
    for(let s = this.spd; s > 0; s--){
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x + this.w/2 + s * this.orientX, y:this.y+this.h/2})){
          this.x += s * this.orientX;
          break;
        }
      }
      for(let i = 0; i < paredes.length; i++){
        if(paredes[i].isDentro({x:this.x+this.w/2, y:this.y + this.h/2 + s * this.orientY})){
          this.y += s * this.orientY;
          break;
        }
      }
    }
  }
  shoot(){
    if(this.reload > 0)
      this.reload--;
    else if(this.tiro){
      let x = (this.w>this.h)?(this.x+this.w/2-this.h/2):(this.x+this.h/2-this.w/2);
      let y = (this.w>this.h)?(this.y+this.w/2-this.h/2):(this.y+this.h/2-this.w/2);
      let w = (this.w>this.h)?this.h:this.w;
      let h = (this.w>this.h)?this.h:this.w;
      balas.push(new Bala(x, y, this.w/3, this.h/3, this.spdMax, this.rot, this.hpMax/4, this.bodyDmg, this.team, this.classe, this.id, this.n));
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
      ctx.save();
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      ctx.drawImage(imagens.balas, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w*184/128, this.h);
      ctx.restore();
      this.stats();
    }
  }
}
