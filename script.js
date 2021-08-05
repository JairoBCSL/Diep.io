var fps = 60, timestamp = new Date().getTime(), count = 0, aux = 0, vezes = 0, vezesAux = 0, aff = "";

class Map{
  constructor(layers, cols, rows, tSize, tileSetPath, colsImage){
    this.layers = layers; // Dizer qual eh a camada que o jogador eh desenhado
    this.cols = cols;
    this.rows = rows;
    this.tSize = tSize;
    this.tileSet = new Image();
    this.tileSet.src = tileSetPath;
    this.bg = new Image();
    this.bg.src = "./tiles.png";
    this.colsImage = colsImage;
  }
  getTile(k, col, row){
    return this.layers[k].data[row * this.cols + col];
  }
  getTileX(index){
    index = index % 536870912;
    return (index - 1) % this.colsImage;
  }
  getTileY(index){
    index = index % 536870912;
    return ((index - 1) / this.colsImage) | 0;
  }
}

class Entity{
  constructor(spriteSRC, spriteCFG, x, y, w, h, spdMax, jumpHeight, team, classe){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    this.spriteCFG = spriteCFG;
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
    this.hp = 120; this.hpMax = 120; this.hpRegen = 1; this.bodyDmg = 4;
    this.bulletSpd = 4; this.bulletPen = 5; this.bulletDmg = 5;
    this.classe = classe; this.bulletSize = 8; this.team = team;
    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0; this.jumpSpeed = 0;
    this.spdMax = spdMax; this.jumpHeight = jumpHeight; this.reload = 0; this.reloadMax = 50;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.score = 0; this.lv = 1; this.exp = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;
    this.andando = 0; this.atacando = 0; this.pulando = 0; this.caindo = 0; this.dash = 0;
		//if(!this.andando && !this.atacando && !this.pulando && !this.caindo && !this.dash)
    this.waitCount = 0; this.frameCount = 0; this.estado = 0; this.estado_a = 0;
    this.rot = 0;
  }
  fisica() {
    this.levelUp();
    this.chanceClass();
    this.perigo();
    this.dano();
    this.controle();
    this.move();
    this.aim();
    this.shoot();
    this.die();
    this.regene();
  }
  perigo(){
    this.batalha = this.hpRegen*this.hp*this.hpMax*this.bodyDmg*this.bulletSpd*this.bulletPen*this.bulletDmg*this.reloadMax*this.spdMax;
  }
  dano(){
    for(let i = 0; i < entities.length; i++) // Colidiu com inimigos n*n
      if(i != entities.indexOf(this)){
        if(collision(this, entities[i])){
          let difX = (entities[i].x + entities[i].w / 2) - (this.x + this.w / 2);
          let difY = (entities[i].y + entities[i].h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) * 2 < game.width && this.x - Math.cos(angulo) * 2 > 0)
            this.x -= Math.cos(angulo) * 2;
          if(this.y - Math.sin(angulo) * 2 < game.height && this.y - Math.sin(angulo) * 2 > 0)
            this.y -= Math.sin(angulo) * 2;
          if(entities[i].x + Math.cos(angulo) * 2 < game.width && entities[i].x + Math.cos(angulo) * 2 > 0)
            entities[i].x += Math.cos(angulo) * 2;
          if(entities[i].y + Math.sin(angulo) * 2 < game.height && entities[i].y + Math.sin(angulo) * 2 > 0)
            entities[i].y += Math.sin(angulo) * 2;
          if(this.team != entities[i].team){
            entities[i].hp -= this.bodyDmg;
            if(entities[i].hp <= 0)
              this.score++;
            this.hp -= entities[i].bodyDmg;
            this.regenCooldown = this.regenCooldownMax;
          }
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
        this.spd+=1/32;
        // Começando a andar
        this.andando = true;
      }
      else{
        // Loop Andando
        this.andando = true;
      }
    }else{
      if(this.spd > 0){
        this.spd-=1/32;
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
    if(!this.reload){
      if(this.tiro){
        this.atacando = true;
        let canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        let canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        projetils.push(new Projetil("projetil.png", canoX, canoY, this.bulletSize, this.bulletSize, this.bulletSpd, this.rot, this.bulletPen, this.bulletDmg, this.team, this.classe, entities.indexOf(this)));
        this.reload = this.reloadMax;
      }
      else{
        this.atacando = false;
      }
    }
    if(this.reload > 0)
      this.reload--;
  }
  regene(){
    if(this.hp < this.hpMax && !this.regenCooldown)
      this.hp+=this.hpRegen;
    if(this.regenCooldown)
      this.regenCooldown--;
  }
  levelUp(){
    if(this.exp > this.nextLv){
      this.hpMax *= 1.05;
      this.hpRegen *= 1.05;
      this.bodyDmg *= 1.05;
      this.bulletDmg *= 1.05;
      this.bulletPen *= 1.05;
      this.bulletSize *= 1.05;
      this.reloadMax /= 1.02;
      this.exp -= this.nextLv;
      this.lv++;
      this.nextLv = 100 * this.lv;
    }
  }
  chanceClass(){
    switch(this.classe){
      case 0:{ // Normal
        this.bulletSpd = 4; this.bulletPen = 60;
        this.bulletDmg = 4; this.bulletSize = 16;
        this.reloadMax = 60; // 240/60 = 4
        this.spdMax = 2;
        break;
      }
      case 1:{ // Shootgun, cria um monte de tiros ao mesmo tempo
        this.bulletSpd = 4; this.bulletPen = 60;
        this.bulletDmg = 6; this.bulletSize = 24;
        this.reloadMax = 90; // 360/90 = 4
        this.spdMax = 2;
        break;
      }
      case 2:{ // Sniper
        this.bulletSpd = 6; this.bulletPen = 60;
        this.bulletDmg = 8; this.bulletSize = 20;
        this.reloadMax = 120; // 480/120 = 4
        this.spdMax = 2;
        break;
      }
      case 3:{ // Metralhadora
        this.bulletSpd = 4; this.bulletPen = 30;
        this.bulletDmg = 4; this.bulletSize = 12;
        this.reloadMax = 30; // 120/30 = 4
        this.spdMax = 2;
        break;
      }
      case 4:{ // Shilder
        this.bulletSpd = 2; this.bulletPen = 10;
        this.bulletDmg = 2; this.bulletSize = 16;
        this.reloadMax = 30; // 20/60
        this.spdMax = 2;
        break;
      }
      case 5:{ // ADMATK
        this.bulletSpd = 2; this.bulletPen = 50000;
        this.bulletDmg = 0; this.bulletSize = 64;
        this.reloadMax = 1 // 100/300
        this.spdMax = 10;
        break;
      }
      case 6:{ // ADMDEF
        this.bulletSpd = 0; this.bulletPen = 50000;
        this.bulletDmg = 20; this.bulletSize = 128;
        this.reloadMax = 10 // 100/300
        this.spdMax = 10;
        break;
      }
    }
  }
	getEstado(){
		if(this.andando && this.atacando && this.pulando && this.caindo && this.dash)
			this.estado = 0; // Caso impossível, só pelo toc
		else if(this.andando && !this.atacando && !this.pulando && !this.caindo && !this.dash)
			this.estado = 1; // Andando
    else if(!this.andando && !this.atacando && this.pulando && !this.caindo && !this.dash)
  	this.estado = 2; // Pulando
    else if(this.andando && !this.atacando && this.pulando && !this.caindo && !this.dash)
    		this.estado = 2; // Andando e Pulando
		else if(!this.andando && !this.atacando && !this.pulando && this.caindo && !this.dash)
			this.estado = 3; // Caindo
    else if(this.andando && !this.atacando && !this.pulando && this.caindo && !this.dash)
    	this.estado = 3; // Andando e Caindo
    else if(!this.andando && this.atacando && !this.pulando && !this.caindo && !this.dash)
    	this.estado = 4; // Atacando
    /*else if(this.andando && this.atacando && !this.pulando && !this.caindo && !this.dash)
      this.estado = 5; // Andando e Atacando
    else if(!this.andando && this.atacando && this.pulando && !this.caindo && !this.dash)
      this.estado = 6; // Pulando e Atacando
    else if(!this.andando && this.atacando && !this.pulando && this.caindo && !this.dash)
      this.estado = 7; // Caindo e Atacando*/
    else
      this.estado = 0;
		return this.estado;
	}
  anima(){
    if(this.getEstado() != this.estado_a){ // Mudou de estado
			this.estado_a = this.estado;
			this.waitCount = 0; // Contador dentro do frame
			this.frameCount = 0; // Contador de frames
		}
		this.xSRC = this.spriteCFG.states[this.estado].posicaoX + this.spriteCFG.states[this.estado].frameCounts[this.frameCount] * this.spriteCFG.states[this.estado].frameGap; // Atualiza posição do frame
    this.ySRC = this.spriteCFG.states[this.estado].posicaoY;
    this.wSRC = this.spriteCFG.states[this.estado].frameWidth;
    this.hSRC = this.spriteCFG.states[this.estado].frameHeight;
		this.waitCount++; // Contando os Waits
		if(this.waitCount == this.spriteCFG.states[this.estado].frameWaits[this.frameCount]){
			this.waitCount = 0;
			this.frameCount++; // Contando os Frames
		}
		if(this.frameCount == this.spriteCFG.states[this.estado].nFrames){
			this.frameCount = 0;
		}
  }
  draw(){
    let x0 = (this.x + this.w > cam.x);
    let x1 = (this.x < cam.x + cam.w);
    let y0 = (this.y + this.h > cam.y);
    let y1 = (this.y < cam.y + cam.h);
    if(x0 && y0 && x1 && y1){
      var ctx = game.canvas.getContext("2d");
      //this.anima();
      ctx.save();
      ctx.strokeRect(this.x, this.y, this.w, this.h);
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      ctx.drawImage(this.sprite, this.xSRC + 64 * this.classe, this.ySRC + 64 * this.team, this.wSRC, this.hSRC, this.x - this.w / 2, this.y - this.h / 2, this.w * 2, this.h * 2);
      //this.w = this.wSRC; this.h = this.hSRC;

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
      this.x = bases[this.team].x + Math.floor(Math.random() * bases[this.team].w - 32);
      this.y = bases[this.team].y + Math.floor(Math.random() * bases[this.team].h - 32);
    }
  }
}

class Player extends Entity{
  controle(){
    this.hp = 120;
    let pertos = [], maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let amigoDist, perigo = 0;
    for(let entity of entities){ // Procurando inimigo
      if(entity.team != this.team){
        atualDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(atualDist < 960)
          perigo += entity.batalha;
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = entities.indexOf(entity);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(amigoDist < 960)
          perigo -= entity.batalha;
      }
    }
  }
  aim(){
    let difX = (game.mouseX + cam.x) - (this.x + this.w / 2);
    let difY = (game.mouseY + cam.y) - (this.y + this.h / 2);
    this.rot = Math.atan2(difY, difX);
  }
}

class Enemy extends Entity{
  controle(){
    let pertos = 0, maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let amigoDist, perigo = 0;
    for(let entity of entities){ // Procurando inimigo
      if(entity.team != this.team){
        atualDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(atualDist < 240){
          pertos++;
          perigo += entity.batalha;
        }
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = entities.indexOf(entity);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(amigoDist < 240)
          perigo -= entity.batalha;
      }
    }
    // Tem alguém perto?
    if(pertos){
      // Ataca
      this.rot = Math.atan2(entities[maisPerto].y+entities[maisPerto].h/2 - this.y - this.h/2, entities[maisPerto].x+entities[maisPerto].w-this.x-this.w);
      this.tiro = true;
      let modulo = Math.sqrt( Math.pow(this.x+this.w-entities[maisPerto].x-entities[maisPerto].w, 2) + Math.pow(this.y+this.h-entities[maisPerto].y-entities[maisPerto].h, 2) );
      let angulo = Math.atan2(this.y+this.h-entities[maisPerto].y-entities[maisPerto].h, entities[maisPerto].x+entities[maisPerto].w-this.x-this.w);
      let vai;
      if(Math.abs(perigo) >= 3 * this.batalha)
        vai = -1;
      else if(Math.abs(perigo) < 3 * this.batalha && modulo > 110)
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
    // Procura
    else{
      //Sorteia uma distância e ângulo
      this.right = 1 - this.team;
      this.left = this.team;
    }
  }
  procura(){

  }
  aim(){

  }
}

class Projetil{
  constructor(spriteSRC, x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    //this.spriteCFG = spriteCFG;
    this.x = x; this.y = y; this.w = w; this.h = h;
    //this.xSRC = xSRC; this.ySRC = ySRC; this.wSRC = wSRC; this.hSRC = hSRC;
    this.hpMax = hpMax; this.hp = this.hpMax; this.bodyDmg = bodyDmg;
    this.rot = rot; this.spd = spd; this.team = team; this.classe = classe;
    this.id = id;
    this.waitCount = 0; this.frameCount = 0; this.estado = 0; this.estado_a = 0;
  }
  fisica(){
    this.move();
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
    this.dano();
    this.spd -= 0.025;
    this.hp -= 0.5;
  }
  dano(){
    for(let i = 0; i < entities.length; i++) // Colidiu com inimigos m*n
      if(this.team != entities[i].team)
        if(collision(this, entities[i])){
          let difX = (entities[i].x + entities[i].w / 2) - (this.x + this.w / 2);
          let difY = (entities[i].y + entities[i].h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) * 2 < game.width && this.x - Math.cos(angulo) * 2 > 0)
            this.x -= Math.cos(angulo) * 2;
          if(this.y - Math.sin(angulo) * 2 < game.height && this.y - Math.sin(angulo) * 2 > 0)
            this.y -= Math.sin(angulo) * 2;
          if(entities[i].x + Math.cos(angulo) * 2 < game.width && entities[i].x + Math.cos(angulo) * 2 > 0)
            entities[i].x += Math.cos(angulo) * 2;
          if(entities[i].y + Math.sin(angulo) * 2 < game.height && entities[i].y + Math.sin(angulo) * 2 > 0)
            entities[i].y += Math.sin(angulo) * 2;
          entities[i].hp -= this.bodyDmg;
          if(entities[i].hp <= 0){
            entities[this.id].score++;
            entities[this.id].exp += 100 * entities[i].lv;
          }

          this.hp -= entities[i].bodyDmg;
          entities[i].regenCooldown = entities[i].regenCooldownMax;
        }
    for(let projetil of projetils) // Colidiu com projetil inimigos m*m
      if(projetils.indexOf(this) != projetils.indexOf(projetil))
        if(collision(this, projetil)){
          let difX = (projetil.x + projetil.w / 2) - (this.x + this.w / 2);
          let difY = (projetil.y + projetil.h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) * 2 < game.width && this.x - Math.cos(angulo) * 2 > 0)
            this.x -= Math.cos(angulo) * 2;
          if(this.y - Math.sin(angulo) * 2 < game.height && this.y - Math.sin(angulo) * 2 > 0)
            this.y -= Math.sin(angulo) * 2;
          if(projetil.x + Math.cos(angulo) * 2 < game.width && projetil.x + Math.cos(angulo) * 2 > 0)
            projetil.x += Math.cos(angulo) * 2;
          if(projetil.y + Math.sin(angulo) * 2 < game.height && projetil.y + Math.sin(angulo) * 2 > 0)
            projetil.y += Math.sin(angulo) * 2;
          if(this.team != projetil.team){
            projetil.hp -= this.bodyDmg;
            this.hp -= projetil.bodyDmg;
          }
        }
  }
  die(){
    if(this.hp <= 0){ // Projetil dissipou
      let x = projetils.indexOf(this);
      projetils.splice(x, 1);
    }
  }
  drawProjetil(){
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
      ctx.drawImage(this.sprite, 0, 32 * this.team, 32, 32, this.x, this.y, this.w, this.h);

      ctx.restore();
      //this.stats();
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

class Base{
  constructor(x, y, w, h, team){
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.team = team; this.bodyDmg = 10;
  }
  dano(){
    for(let entity of entities) // Colidiu com inimigos m*n
      if(this.team != entity.team)
        if(this.x+ this.w > entity.x &&
            this.x < entity.x + entity.w &&
            entity.y + entity.h > this.y &&
            entity.y < this.y + this.h)
          entity.hp -= this.bodyDmg;
    for(let projetil of projetils) // Colidiu com projetil inimigos m*m
      if(this.team != projetil.team)
      if(this.x+ this.w > projetil.x &&
          this.x < projetil.x + projetil.w &&
          projetil.y + projetil.h > this.y &&
          projetil.y < this.y + this.h)
          projetil.hp -= this.bodyDmg;
  }
  draw(){
    let x0 = (this.x + this.w > cam.x);
    let x1 = (this.x < cam.x + cam.w);
    let y0 = (this.y + this.h > cam.y);
    let y1 = (this.y < cam.y + cam.h);
    if(x0 && y0 && x1 && y1){
      var ctx = game.canvas.getContext("2d");
      ctx.save();
      switch(this.team){
        case 0:{
          ctx.fillStyle = "#00F8";
          break;
        }case 1:{
          ctx.fillStyle = "#F008";
          break;
        }case 2:{
          ctx.fillStyle = "#0F08";
          break;
        }case 3:{
          ctx.fillStyle = "#FF08";
          break;
        }default:{
          ctx.fillStyle = "#FFF8";
          break;
        }
      }
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.restore();
      //this.stats();
    }
  }
}

var game = {
  canvas: document.createElement("canvas"),
  start: function(){
    this.width = 4096;
    this.height = 3072;
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(update, 1000 / fps);
    window.addEventListener('keydown', function (e) {
      game.keys = (game.keys || []);
      game.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function (e) {
      game.keys[e.keyCode] = !(e.type == "keyup");
    })
    this.canvas.addEventListener('mousemove', function (e) {
        game.mouseX = e.pageX;// + cam.x;
        game.mouseY = e.pageY;// + cam.y;
    })
    this.mouseClick = {"button":0, "type":"mousedown"}
    this.canvas.addEventListener('mousedown', function (e) {
        game.mouseClick = {"button":e.which, "type":e.type};
    })
    this.canvas.addEventListener('mouseup', function (e) {
        game.mouseClick = {"button":e.which, "type":e.type};
    })
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

var cam = {
  x: 0,
  y: 0,
  w: 640,
  h: 480,
  port: 0.45,
  leftEdge: function(){ // Janela imóvel
    return this.x + this.port * this.w;
  },
  rightEdge: function(){
    return this.x + (1 - this.port) * this.w;
  },
  topEdge: function(){
    return this.y + this.port * this.h;
  },
  bottomEdge: function(){
    return this.y + (1 - this.port) * this.h;
  },
  center: function(){ // Centraliza câmera
    if(entities[0].x < this.leftEdge()){
      this.x = entities[0].x - this.port * this.w;
    }
    if(entities[0].x + entities[0].w > this.rightEdge()){
      this.x = entities[0].x + entities[0].w - (1 - this.port) * this.w;
    }
    if(entities[0].y < this.topEdge()){
      this.y = entities[0].y - this.port * this.h;
    }
    if(entities[0].y + entities[0].h > this.bottomEdge()){
      this.y = entities[0].y + entities[0].h - (1 - this.port) * this.h;
    }this.x = this.x | 0; this.y = this.y | 0;

    if(this.x < 0){ // Limites da câmera
      this.x = 0;
    }
    if( this.x + this.w > game.width){
      this.x = game.width - this.w;
    }
    if(this.y < 0){
      this.y = 0;
    }
    if( this.y + this.h > game.height){
      this.y = game.height - this.h;
    }
  }
};

map = new Map(mapas.layers, 256, 192, 16, "tiles.png", 3);
entities = [];
projetils = [];
bases = [];
bases.push(new Base(32, 32, 320, 3072 - 32 - 32, 0));
bases.push(new Base(4096 - 320 - 32, 32, 320, 3072 - 32 - 32, 1));
entities.push(new Player("nave.png", spriteX, 48, 48, 32, 32, 2, 5, 0, 0));
for(let i = 0; i < 63; i++){
  entities.push(new Enemy("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 32), bases[0].y + Math.floor(Math.random() * bases[0].h - 32), 32, 32, 2, 5, 0, Math.floor(Math.random() * 4)));
}
for(let i = 0; i < 64; i++){
  entities.push(new Enemy("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 32), bases[1].y + Math.floor(Math.random() * bases[1].h - 32), 32, 32, 2, 5, 1, Math.floor(Math.random() * 4)));
}

function startGame(){
  game.start();
}

function update(){
  redraw();
  controls();
  physic();
  debug();
}
function redraw(){
  game.clear();
  var ctx = game.canvas.getContext("2d");
  cam.center();
  ctx.save();
  ctx.translate(-cam.x, -cam.y);
  for(let i of bases)
    i.draw();
  ctx.fillStyle = "#4F4";
  for(let i = Math.floor(cam.x / map.tSize); i <= Math.floor((cam.x + cam.w) / map.tSize); i++)
    for(let j = Math.floor(cam.y / map.tSize); j <= Math.floor((cam.y + cam.h) / map.tSize); j++)
      ctx.drawImage(map.bg, 0, 0, map.tSize, map.tSize, i * map.tSize, j * map.tSize, map.tSize, map.tSize);
  for(let k = 0; k < map.layers.length - 1; k++){
    for(let i = Math.floor(cam.x / map.tSize); i <= Math.floor((cam.x + cam.w) / map.tSize); i++){
      for(let j = Math.floor(cam.y / map.tSize); j <= Math.floor((cam.y + cam.h) / map.tSize); j++){
        if(map.getTile(k, i, j)){
          ctx.save();
          if((map.getTile(k, i, j) / 536870912) & 4){
            ctx.translate(+map.tSize / 2 + i * map.tSize, +map.tSize / 2 + j * map.tSize);
            ctx.scale(-1, +1);
            ctx.translate(-map.tSize / 2 - i * map.tSize, -map.tSize / 2 - j * map.tSize);
          }
          if((map.getTile(k, i, j) / 536870912) & 2){
            ctx.translate(+map.tSize / 2 + i * map.tSize, +map.tSize / 2 + j * map.tSize);
            ctx.scale(+1, -1);
            ctx.translate(-map.tSize / 2 - i * map.tSize, -map.tSize / 2 - j * map.tSize);
          }
          if((map.getTile(k, i, j) / 536870912) & 1){
            ctx.translate(+map.tSize / 2 + i * map.tSize, +map.tSize / 2 + j * map.tSize);
            ctx.scale(-1, +1);
            ctx.rotate(1.57);
            ctx.translate(-map.tSize / 2 - i * map.tSize, -map.tSize / 2 - j * map.tSize);
          }
          ctx.drawImage(map.tileSet, map.getTileX(map.getTile(k, i, j)) * map.tSize, map.getTileY(map.getTile(k, i, j)) * map.tSize, map.tSize, map.tSize, i * map.tSize, j * map.tSize, map.tSize, map.tSize);
          ctx.restore();
        }
      }
    }
    if(k == 0){
      for(let entity of entities)
        entity.draw();
      for(let projetil of projetils)
        projetil.drawProjetil();
    }
  }
  ctx.restore();
}
function controls(){
  keyPressed();
  keyReleased();
}

function physic(){
  for(let base of bases){
    base.dano();
  }
  for(let entity of entities){
    entity.fisica();
  }
  for(let projetil of projetils){
    projetil.fisica();
  }
}

// Controls
var keyPressed = function() {
  if ((game.keys && game.keys[87])) { // Pula
     entities[0].up = 1;
  }
  if ((game.keys && game.keys[65])) { // Left
     entities[0].left = 1;
  }
  if ((game.keys && game.keys[83])) { // Down
     entities[0].down = 1;
  }
  if ((game.keys && game.keys[68])) { // Right
     entities[0].right = 1;
  }
  if ((game.keys && game.keys[75])) { // Tiro
     //entities[0].tiro = 1;
  }
  if(game.mouseClick.button == 1 && game.mouseClick.type == "mousedown"){
    entities[0].tiro = 1;
  }
  if ((game.keys && game.keys[48])) { // Class 0
     entities[0].classe = 0;
  }
  if ((game.keys && game.keys[49])) { // Class 1
     entities[0].classe = 1;
  }
  if ((game.keys && game.keys[50])) { // Class 2
     entities[0].classe = 2;
  }
  if ((game.keys && game.keys[51])) { // Class 3
     entities[0].classe = 3;
  }
  if ((game.keys && game.keys[52])) { // Class 4
     entities[0].classe = 4;
  }
  if ((game.keys && game.keys[53])) { // Class 5
     entities[0].classe = 5;
  }
  if ((game.keys && game.keys[54])) { // Class 5
     entities[0].classe = 6;
  }
};
var keyReleased = function() {
  if (!(game.keys && game.keys[87])) { // Pula
    entities[0].up = 0;
  }
  if (!(game.keys && game.keys[65])) { // Left
    entities[0].left = 0;
  }
  if (!(game.keys && game.keys[83])) { // Down
    entities[0].down = 0;
  }
  if (!(game.keys && game.keys[68])) { // Right
    entities[0].right = 0;
  }
  if (!(game.keys && game.keys[75])) { // Tiro
     //entities[0].tiro = 0;
  }
  if(game.mouseClick.button == 1 && game.mouseClick.type == "mouseup"){
    entities[0].tiro = 0;
  }
};

// Física
var collision = function(r1, r2){
  vezes++;
  let dist = Math.sqrt(Math.pow(r2.x + r2.w/2 - r1.x - r1.w / 2, 2) + Math.pow(r2.y + r2.h/2 - r1.y - r1.h / 2, 2));
  if(dist < r1.w / 2 + r2.w / 2)
    return true;
  else
    return false;
};

// Debug
function debug(){
  let x = 0;
  //for(let i = 0; i < entities.length; i++)
    //if(collision({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, entities[i]))
      //x = i;
  text = "";
  /*text += "Player:" + x ;
  text += "<br><br>Posição: (" + Math.floor(entities[x].x) + "/" + Math.floor(entities[x].y) + ")";
  text += "<br><br>Mouse: (" + game.mouseX + "/" + game.mouseY + ")";
  text += "<br><br>HP: (" + entities[x].hp + "/" + entities[x].hpMax + ")";
  text += aff;
  text += "<br><br>Class: " + entities[x].classe;
  text += "<br><br>HPRegen: " + entities[x].hpRegen;
  text += "<br><br>BodyDmg: " + entities[x].bodyDmg;
  text += "<br><br>BulletS: " + entities[x].bulletSpd;
  text += "<br><br>BulletP: " + entities[x].bulletPen;
  text += "<br><br>BulletD: " + entities[x].bulletDmg;
  text += "<br><br>Reload : " + entities[x].reload + "/" + entities[x].reloadMax;
  text += "<br><br>MoveS : " + entities[x].spdMax;
  text += "<br><br>Exp : " + entities[x].exp + "/" + entities[x].nextLv;*/
  text += "<br><br>Up : " + entities[x].up;
  text += "<br><br>Left : " + entities[x].left;
  text += "<br><br>Down : " + entities[x].down;
  text += "<br><br>Right : " + entities[x].right;
  text += "<br><br>Enemies : " + entities.length;
  count++;
  if((new Date().getTime() - timestamp) >= 1000){
    timestamp = new Date().getTime();
    aux = count;
    count = 0;
    vezesAux = vezes;
    vezes = 0;
  }
  text += "<br><br>Vezes : " + vezesAux / aux;
  text += "<br><br>FPS: " + aux;
  document.getElementById("stats").innerHTML = text;
  let pontos = [], score = "", maior, atual;
  for(let entity of entities){
    pontos.push(entity.score);
  }
  for(let i = 0; i < 5; i++){
    maior = 0; atual = 0;
    for(let i = 0; i < pontos.length; i++){
      if(pontos[i] > atual){
        maior = i;
        atual = pontos[i];
      }
    }
    pontos[maior] = 0;
    score += maior + ": " + atual + "<br>";
  }document.getElementById("score").innerHTML = score;
}
