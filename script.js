var fps = 60, timestamp = new Date().getTime(), count = 0, aux = 0;
var vezes = 0, vezesAux = 0, aff = "", levelUp = 0;
var classes = [[4, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Normal
               [4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4],//Machine Gun
               [4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4],//Twin
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 4],//Sniper
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 1],//Flank
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Smasher
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
             ];

var game = {
  width: 8192,
  height: 6144,
  canvas: document.createElement("canvas"),
  start: function(){
    this.canvas.width = 1200;
    this.canvas.height = 900;
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
  w: 1200,
  h: 900,
  wMin: 1200,
  hMin: 900,
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

class Projetil{
  constructor(spriteSRC, x, y, w, h, spd, rot, hpMax, bodyDmg, team, classe, id){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    //this.spriteCFG = spriteCFG;
    this.x = x; this.y = y; this.w = w; this.h = h;
    //this.xSRC = xSRC; this.ySRC = ySRC; this.wSRC = wSRC; this.hSRC = hSRC;
    this.hpMax = hpMax; this.hp = this.hpMax; this.bodyDmg = bodyDmg;
    this.rot = rot; this.spd = spd; this.spdMax = this.spd; this.team = team; this.classe = classe;
    this.id = id;
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
    this.spd -= this.spdMax * 0.002;
    this.hp -= this.hpMax * 0.005;
  }
  dano(){
    for(let i = projetils.indexOf(this) + 1; i < projetils.length; i++){ // Colidiu com projetil inimigos m*m
      if(this.team != projetils[i].team){
        if(collision(this, projetils[i])){
          let difX = (projetils[i].x + projetils[i].w / 2) - (this.x + this.w / 2);
          let difY = (projetils[i].y + projetils[i].h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo);
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(projetils[i].x + Math.cos(angulo) < game.width && projetils[i].x + Math.cos(angulo) > 0)
            projetils[i].x += Math.cos(angulo);
          if(projetils[i].y + Math.sin(angulo) < game.height && projetils[i].y + Math.sin(angulo) > 0)
            projetils[i].y += Math.sin(angulo);
          if(this.team != projetils[i].team){
            projetils[i].hp -= this.bodyDmg;
            this.hp -= projetils[i].bodyDmg;
          }
        }
      }

    }
    for(let entity of entities){ // Colidiu com inimigos m*n
      if(this.team != entity.team)
        if(collision(this, entity)){
          let difX = (entity.x + entity.w / 2) - (this.x + this.w / 2);
          let difY = (entity.y + entity.h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo) ;
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(entity.x + Math.cos(angulo) < game.width && entity.x + Math.cos(angulo) > 0)
            entity.x += Math.cos(angulo);
          if(entity.y + Math.sin(angulo) < game.height && entity.y + Math.sin(angulo) > 0)
            entity.y += Math.sin(angulo);
          entity.hp -= this.bodyDmg;
          if(entity.hp <= 0){
            entities[this.id].score++;
            entities[this.id].exp += 1000 + entity.expTotal;
            entities[this.id].expTotal += 1000 + entity.expTotal;
          }

          this.hp -= entity.bodyDmg;
          entity.regenCooldown = entity.regenCooldownMax;
        }
    }
    for(let drone of drones){ // Colidiu com projetil drone m*o
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
    for(let npc of npcs){ // Colidiu com projetil npc m*p
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
              entities[this.id].exp += npc.expTotal;
              entities[this.id].expTotal += npc.expTotal;
            }

          }
        }
    }

  }
  die(){
    if(this.hp <= 0){ // Projetil dissipou
      let x = projetils.indexOf(this);
      projetils.splice(x, 1);
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
      ctx.drawImage(this.sprite, 0, 32 * this.team, 128, 128, this.x, this.y, this.w, this.h);

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

class Entity{
  constructor(spriteSRC, spriteCFG, x, y, w, h, spdMax, jumpHeight, team, classe){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    this.spriteCFG = spriteCFG;
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.wA = this.w; this.hA = this.h;
    this.canoX = 0; this.canoY = 0; this.canoZ = 0; this.canoW = 0;
    this.drones = 0;
    this.xSRC = 384 * classe; this.ySRC = 384 * team; this.wSRC = 384; this.hSRC = 384; // Sprite

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
    this.score = 0; this.lv = 1; this.exp = 0; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;
    this.waitCount = 0; this.frameCount = 0; this.estado = 0; this.estado_a = 0;
    this.rot = 0;

    this.updateStats();
  }
  fisica() {
    this.levelUp();
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
    for(let i = entities.indexOf(this) + 1; i < entities.length; i++){ // Colidiu com inimigos n*n
      if(collision(this, entities[i])){
          let difX = (entities[i].x + entities[i].w / 2) - (this.x + this.w / 2);
          let difY = (entities[i].y + entities[i].h / 2) - (this.y + this.h / 2);
          let angulo = Math.atan2(difY, difX);
          if(this.x - Math.cos(angulo) < game.width && this.x - Math.cos(angulo) > 0)
            this.x -= Math.cos(angulo);
          if(this.y - Math.sin(angulo) < game.height && this.y - Math.sin(angulo) > 0)
            this.y -= Math.sin(angulo);
          if(entities[i].x + Math.cos(angulo) < game.width && entities[i].x + Math.cos(angulo) > 0)
            entities[i].x += Math.cos(angulo);
          if(entities[i].y + Math.sin(angulo) < game.height && entities[i].y + Math.sin(angulo) > 0)
            entities[i].y += Math.sin(angulo);
          if(this.team != entities[i].team){
            entities[i].hp -= this.bodyDmg;
            if(entities[i].hp <= 0){
              this.score++;
              this.exp += 1000 + entities[i].expTotal;
              this.expTotal += 1000 + entities[i].expTotal;
            }
            this.hp -= entities[i].bodyDmg;
            this.regenCooldown = this.regenCooldownMax;
          }
        }
    }
    for(let drone of drones){ // Colidiu com projetil drone n*o
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
  cano(){
    switch(this.classe){
      case 0:{ //Normal
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 1:{ //Machine Gun
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot + Math.random() * 0.4 - 0.2;
        break;
      }
      case 2:{ //Twin
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);// + Math.sin(this.rot) * (this.w * 7 / 32 - this.canoW * 56 / 64);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);// + Math.cos(this.rot) * (this.w * 7 / 32 - this.canoW * 56 / 64);
        this.canoZ = this.rot;
        this.canoW = (this.canoW + this.w / 2) % this.w;
        break;
      }
      case 3:{ //Sniper
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 4:{ //Flank
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot + this.canoW) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot + this.canoW) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot + this.canoW;
        this.canoW = (this.canoW + Math.PI) % (Math.PI * 2);
        break;
      }
      case 5:{ //Smasher
        //this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        //this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        //this.canoZ = this.rot;
        break;
      }
      case 6:{ //Destroyer
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 7:{ //Gunner
        let canoU = [-this.w * 45 / 128, +this.w * 45 / 128, -this.w * 15 / 128, +this.w * 15 / 128];
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2) + Math.sin(this.rot) * (canoU[this.canoW]);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2) + Math.cos(this.rot) * (canoU[this.canoW]);
        this.canoZ = this.rot;
        this.canoW = (this.canoW + 1) % 4;
        break;
      }
      case 8:{ //Triple Shot
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 9:{ //Quad Tank
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 10:{ //Twin Flank
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 11:{ //Assassin
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 12:{ //Overseer
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot + this.canoW + Math.PI / 2) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot + this.canoW + Math.PI / 2) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = Math.PI / 2 + this.rot + this.canoW;
        this.canoW = (this.canoW + Math.PI) % (Math.PI * 2);
        break;
      }
      case 13:{ //Hunter
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 14:{ //Trapper
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 15:{ //Tri-Angle
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
    }
  }
  shoot(){
    if(this.classe == 5){//Smashers

    }
    else if(this.classe == 12){//Overseers
      if(this.reload <= 0 && this.drones < 8){
        let hover = 0;
        this.cano();
        drones.push(new Drone("projetil.png", this.canoX, this.canoY, this.bulletSize, this.bulletSize, this.bulletSpd, this.canoZ, this.bulletPen, this.bulletDmg, this.team, 1, entities.indexOf(this)));
        for(let i = 0; i < drones.length; i++)
          if(drones[i].id == entities.indexOf(this))
            drones[i].hover = Math.PI * 2 / this.drones * i;
        this.reload = this.reloadMax;
      }
    }
    else if(this.reload <= 0){
      if(this.tiro){
        this.cano();
        projetils.push(new Projetil("projetil.png", this.canoX, this.canoY, this.bulletSize, this.bulletSize, this.bulletSpd, this.canoZ, this.bulletPen, this.bulletDmg, this.team, this.classe, entities.indexOf(this)));
        this.reload = this.reloadMax;
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
      if(entities.indexOf(this) == drones[i].id)
        drones[i].updateStats();
  }
  changeClass(classe){
    this.canoz = this.rot; this.canoW = 0;
    this.reload = 0;
    switch(classe){
      case 0:{ // Normal
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 60; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 4 * 60 / 60 = 4
      }
      case 1:{ // Machine Gun
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 28;
        break; // 4 * 60 / 30 = 8
      }
      case 2:{ // Twin
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 28;
        break; // 4 * 60 / 30 = 8
      }
      case 3:{ // Sniper
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 4:{ // Flank
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 4 * 60 / 30 = 8
      }
      case 5:{ // Smasher
        this.clStats[0] = 1; this.clStats[1] = 240; this.clStats[2] = 8;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 6:{ // Destroyer
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        break; // 16 * 120 / 120 = 16
      }
      case 7:{ // Gunner
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 15; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 4 * 60 / 15 = 16
      }
      case 8:{ // Triple Shot
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 60; this.clStats[5] = 4; //*3
        this.clStats[6] = 45; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 3 * 4 * 60 / 45 = 16
      }
      case 9:{ // Quad Tank
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 10:{ // Twin Flank
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 11:{ // Assassin
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 12:{ // Overseer
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 13:{ // Hunter
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 14:{ // Trapper
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }
      case 15:{ // Tri-Angle
        this.clStats[0] = 1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        break; // 8 * 120 / 120 = 8
      }

    }
    if(!entities.indexOf(this))
      console.log("Tem "+this.ptClasse+" pontos");
    this.ptClasse -= classes[this.classe][classe];
    if(!entities.indexOf(this)){
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
      //this.anima();
      ctx.save();
      //ctx.strokeRect(this.x, this.y, this.w, this.h);
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      ctx.drawImage(this.sprite, 384 * this.classe, 384 * this.team, this.wSRC, this.hSRC, this.x - this.w, this.y - this.h, this.w * 3, this.h * 3);
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
      this.ptClasse = 1;
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

class Cano{
  constructor(){
    this.sprite = new Image(x,y,w,h,);
    this.sprite.src = spriteSRC;
    this.x = x; this.y = y; this.w = w; this.h = h; this.rot = rot;
    this.classe = classe; this.id = id;
  }
}

class Drone{
  constructor(spriteSRC, x, y, w, h, spdMax, rot, bulletPen, bulletDmg, team, classe, id){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    this.x = x; this.y = y; this.w = w; this.h = h; // Posição
    this.wA = this.w; this.hA = this.h;
    this.canoX = 0; this.canoY = 0; this.canoZ = 0; this.canoW = 0;
    this.id = id; this.hover = 0; entities[this.id].drones++;
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
    for(let entity of entities){ // Procurando inimigo
      if(entity.team != this.team){
        atualDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(atualDist < 480){
          pertos++;
          perigo += entity.batalha;
        }
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = entities.indexOf(entity);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(amigoDist < 480){
          perigo -= entity.batalha;
        }
      }
    }
    let x = entities[this.id].x + entities[this.id].w / 2 + 160 * Math.cos(this.hover);
    let y = entities[this.id].y + entities[this.id].h / 2 + 160 * Math.sin(this.hover);
    let z = Math.atan2(this.y + this.h - y, x - this.x - this.w);
    this.hover += 0.005;
    // Comandando
    if(entities[this.id].tiro){
      this.rot = Math.atan2(game.mouseY + cam.y - this.y - this.h/2, game.mouseX + cam.x - this.x - this.w);
      this.tiro = 1;
      let modulo = Math.sqrt( Math.pow(this.x + this.w - game.mouseX - cam.x, 2) + Math.pow(this.y + this.h - game.mouseY - cam.y, 2) );
      let angulo = Math.atan2(this.y + this.h - game.mouseY - cam.y, game.mouseX + cam.x - this.x - this.w);
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
      this.rot = Math.atan2(entities[maisPerto].y+entities[maisPerto].h/2 - this.y - this.h/2, entities[maisPerto].x+entities[maisPerto].w-this.x-this.w);
      this.tiro = 1;
      let modulo = Math.sqrt( Math.pow(this.x+this.w-entities[maisPerto].x-entities[maisPerto].w, 2) + Math.pow(this.y+this.h-entities[maisPerto].y-entities[maisPerto].h, 2) );
      let angulo = Math.atan2(this.y+this.h-entities[maisPerto].y-entities[maisPerto].h, entities[maisPerto].x+entities[maisPerto].w-this.x-this.w);
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
      let x = entities[this.id].x + entities[this.id].w / 2 + 160 * Math.cos(this.hover);
      let y = entities[this.id].y + entities[this.id].h / 2 + 160 * Math.sin(this.hover);
      this.rot = Math.atan2(y - this.y - this.h/2, x - this.x - this.w);
      this.tiro = 1;
      let modulo = Math.sqrt(Math.pow(this.x + this.w - x, 2) + Math.pow(this.y + this.h - y, 2));
      let angulo = Math.atan2(this.y + this.h - y, x - this.x - this.w);
      let vai;
      if(modulo > 1)
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
            entities[this.id].exp += npc.expTotal;
            entities[this.id].expTotal += npc.expTotal;
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
  cano(){
    switch(this.classe){
      case 0:{ //Normal
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 1:{ //Shotgun
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot + Math.random() * 0.2 - 0.1;
        break;
      }
      case 2:{ //Twin
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2) + Math.sin(this.rot) * (this.w * 7 / 32 - this.canoW * 56 / 64);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2) + Math.cos(this.rot) * (this.w * 7 / 32 - this.canoW * 56 / 64);
        this.canoZ = this.rot;
        this.canoW = (this.canoW + this.w / 2) % this.w;
        break;
      }
      case 3:{ //Sniper
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot;
        break;
      }
      case 4:{ //Flank
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot + this.canoW) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot + this.canoW) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = this.rot + this.canoW;
        this.canoW = (this.canoW + Math.PI) % (Math.PI * 2);
        break;
      }
      case 5:{ //Overseer, mas eh 12
        this.canoX = this.x + this.w / 2 - this.bulletSize / 2 + Math.cos(this.rot + this.canoW + Math.PI / 2) * (this.w / 2 + this.bulletSize / 2);
        this.canoY = this.y + this.h / 2 - this.bulletSize / 2 + Math.sin(this.rot + this.canoW + Math.PI / 2) * (this.h / 2 + this.bulletSize / 2);
        this.canoZ = Math.PI / 2 + this.rot + this.canoW;
        this.canoW = (this.canoW + Math.PI) % (Math.PI * 2);
        break;
      }
    }
  }
  updateStats(){
    this.w = this.wA * (1 + entities[this.id].lv / 90);
    this.h = this.hA * (1 + entities[this.id].lv / 90);
    this.hpMax = entities[this.id].clStats[1]*(1+entities[this.id].lv/45)*(1+entities[this.id].ptStats[1]/7);
    this.bodyDmg = entities[this.id].clStats[2]*(1+entities[this.id].lv/45)*(1+entities[this.id].ptStats[0]/7);
    this.spdMax = entities[this.id].clStats[3]*(1+entities[this.id].ptStats[3]/7);
    this.bulletSize = entities[this.id].clBulletSize * (1 + entities[this.id].lv / 90);
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
    if(this.hp <= 0){ // Projetil dissipou
      entities[this.id].drones--;
      let x = drones.indexOf(this);
      drones.splice(x, 1);
    }
  }
}

class Npc{
  constructor(spriteSRC, spriteCFG, x, y, classe){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    this.spriteCFG = spriteCFG;
    this.x = x; this.y = y; // Posição
    this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64; this.rot = 0; // Sprite
    this.hp = 120; this.hpMax = 120; this.classe = classe; this.bodyDmg = 4; // Stats
    if(this.classe == 0){
      this.hp = 100; this.hpMax = 120; this.bodyDmg = 1;
      this.w = 32; this.h = 32; this.expTotal = 100;
    }else if(this.classe == 1){
      this.hp = 200; this.hpMax = 240; this.bodyDmg = 2;
      this.w = 48; this.h = 48; this.expTotal = 400;
    }else if(this.classe == 2){
      this.hp = 400; this.hpMax = 480; this.bodyDmg = 4;
      this.w = 64; this.h = 64; this.expTotal = 1600;
    }
  }
  fisica() {
    if(this.hp <= 0){
      this.x = Math.floor(Math.random() * 4096 - 16);
      this.y = Math.floor(Math.random() * 3072 - 16);
      this.hp = this.hpMax;
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
  draw(){
    let x0 = (this.x + this.w > cam.x);
    let x1 = (this.x < cam.x + cam.w);
    let y0 = (this.y + this.h > cam.y);
    let y1 = (this.y < cam.y + cam.h);
    if(x0 && y0 && x1 && y1){
      var ctx = game.canvas.getContext("2d");
      ctx.save();
      ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
      this.rot+=0.025;
      ctx.rotate(this.rot);
      ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
      if(this.classe == 0){
        ctx.fillStyle = "#ff0f";
        ctx.fillRect(this.x, this.y, this.w, this.h);
      }else if(this.classe == 1){
        ctx.fillStyle = "#f00f";
        ctx.beginPath();
        ctx.moveTo(this.x + this.w * (1+Math.cos(0*120*Math.PI/180)) / 2, this.y + this.h * (1+Math.sin(0*120*Math.PI/180)) / 2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(1*120*Math.PI/180)) / 2, this.y + this.h * (1+Math.sin(1*120*Math.PI/180)) / 2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(2*120*Math.PI/180)) / 2, this.y + this.h * (1+Math.sin(2*120*Math.PI/180)) / 2);
        ctx.fill();
      }else if(this.classe == 2){
        ctx.fillStyle = "#f0ff";
        ctx.beginPath();
        ctx.moveTo(this.x + this.w * (1+Math.cos(0*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(0*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(1*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(1*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(2*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(2*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(3*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(3*72*Math.PI/180))/2);
        ctx.lineTo(this.x + this.w * (1+Math.cos(4*72*Math.PI/180))/2, this.y + this.h * (1+Math.sin(4*72*Math.PI/180))/2);
        ctx.fill();
      }

      //this.w = this.wSRC; this.h = this.hSRC;

      ctx.restore();
      this.stats();
    }
  }
}

class Nave extends Entity{

}

class Player extends Nave{
  controle(){
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

class Enemy extends Nave{
  controle(){
    let pertos = 0, maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let perigo = 0, amigoDist;
    for(let entity of entities){ // Procurando inimigo
      if(entity.team != this.team){
        atualDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(atualDist < 450){
          pertos++;
          perigo += entity.batalha;
        }
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = entities.indexOf(entity);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(entity.x+entity.w/2-this.x-this.w/2, 2) + Math.pow(entity.y+entity.h/2-this.y-this.h/2, 2));
        if(amigoDist < 450){
          perigo -= entity.batalha;
        }
      }
    }
    // Tem alguém perto?
    if(pertos){
      // Ataca
      this.rot = Math.atan2(entities[maisPerto].y+entities[maisPerto].h/2 - this.y - this.h/2, entities[maisPerto].x+entities[maisPerto].w-this.x-this.w);
      this.tiro = 1;
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
      this.tiro = 0;
      this.right = 1 - this.team;
      this.left = this.team;
    }
  }
  procura(){

  }
  aim(){

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
        if(collisionSQ(this, entity))
          entity.hp -= this.bodyDmg;
    for(let projetil of projetils) // Colidiu com projetil inimigos m*m
      if(this.team != projetil.team)
      if(collisionSQ(this, projetil))
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

class Stat{
  constructor(id, msg, color){
    this.id = id; this.msg = msg; this.color = color;
    this.x = 0; this.y = 0; this.w = 0; this.h = 0;
  }
  update(){
    this.x = hud.x + hud.h / 32;
    this.y = hud.y + hud.h / 8 * this.id + hud.h / 32;
    this.w = hud.w * 25 / 32; this.h = hud.h / 16;
  }
  draw(){
    this.update();
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "#fffc";
    ctx.fillRect(this.x, this.y, this.w * (entities[0].ptStats[hud.stats.indexOf(this)]) / 7, this.h);
    ctx.font = "22px Arial";
    ctx.fillStyle = "#000f";
    ctx.fillText(this.msg, this.x, this.y + 16);
  }
}

class BotaoStats{
  constructor(id, color){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.id = id;
    this.stat = 0; this.color = color; this.msg = " + ";
  }
  add(){
    if(entities[0].ptStats[this.id] < 7){
      entities[0].ptStats[this.id]++;
      entities[0].pt--;
      entities[0].updateStats();
    }
  }
  update(){
    this.x = hud.x + hud.h * 25 / 32;
    this.y = hud.y + hud.h / 8 * this.id + hud.h / 32;
    this.w = hud.w * 3 / 32; this.h = hud.h / 16;
  }
  draw(){
    this.update();
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.font = "22px Arial";
    ctx.fillStyle = "#000f";
    ctx.fillText(this.msg, this.x, this.y + 17);
  }
}

class BotaoClasses{
  constructor(spriteSRC, classe){
    this.sprite = new Image();
    this.sprite.src = spriteSRC; this.h = 0; this.y = 0;
    this.classe = classe; this.w = 128; this.h = 128; this.wSRC = 384; this.hSRC = 384;
  }
  draw(x, y){
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = "#000f"; this.x = x; this.y = y;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.sprite, 384 * this.classe, 0, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
  }
}

class Hud{
  constructor(){
    this.stats = [];
    this.botoesStats = [];
    this.botoesClasses = [];
    this.msgs = ["Health Regen", "Health", "Body Damage", "Bullet Speed", "Bullet Penetration", "Bullet Damage", "Reload", "Speed"];
    this.colors = ["#80ff", "#a84f", "#f80f", "#0f0f", "#ff0f", "#f00f", "#0fff", "#f08f"];
    for(let i = 0; i < 8; i++)
      this.stats.push(new Stat(i, this.msgs[i], this.colors[i]));
    for(let i = 0; i < 8; i++)
      this.botoesStats.push(new BotaoStats(i, this.colors[i]));
    for(let i = 0; i <= 15; i++)
      this.botoesClasses.push(new BotaoClasses("nave.png", i));
    this.click = 1;
  }
  clicked(){
    if(entities[0].pt){
      for(let i = 0; i < this.botoesStats.length; i++){
        if(collisionSQ({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, this.botoesStats[i])){
          this.botoesStats[i].add();
        }
      }
    }
    if(entities[0].ptClasse){
      for(let i = 0; i < this.botoesClasses.length; i++){
        if(collisionSQ({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, this.botoesClasses[i])){
          console.log("Classe: "+i);
          entities[0].changeClass(i);
          entities[0].updateStats();
        }
      }
    }
  }
  draw(){
    this.x = cam.x; this.y = cam.y + cam.h * 0.7; this.w = cam.w * 0.2; this.h = cam.h * 0.3;
    var ctx = game.canvas.getContext("2d");
    for(let botao of this.botoesStats){
      botao.x = -9000; botao.y = -9000;
    }
    if(entities[0].pt){ //Pontos
      this.drawStats();
    }
    for(let botao of this.botoesClasses){
      botao.x = -9000; botao.y = -9000;
    }
    if(entities[0].ptClasse){ //Classe
      this.drawClass();
    }
    if(entities[0].lv < 45){ //Exp
      ctx.fillStyle = "#888f";
      ctx.fillRect(cam.x + cam.w * 0.25, cam.y + cam.h - cam.h / 24, cam.w * 0.5, cam.h / 64);
      ctx.fillStyle = "#fffa";
      ctx.fillRect(cam.x + cam.w * 0.25, cam.y + cam.h - cam.h / 24, cam.w * 0.5 * entities[0].exp / entities[0].nextLv , cam.h / 64);
    }
  }
  drawStats(){
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = "#888a";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "#000f";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    for(let stat of this.stats)
      stat.draw()
    for(let botao of this.botoesStats)
      botao.draw();
  }
  drawClass(){
    var ctx = game.canvas.getContext("2d");
    var nClasses = [];
    for(let i = 0; i < classes[0].length; i++){
      console.log("Tentou "+i);
      if(entities[0].ptClasse >= classes[entities[0].classe][i]){
        nClasses.push(i);
        console.log("Adicionou "+i);
      }
    }
    ctx.fillStyle = "#888a";
    ctx.fillRect(cam.x, cam.y, (nClasses.length>1)?256:128, Math.ceil(nClasses.length/2)*128);
    ctx.strokeStyle = "#000f";
    ctx.fillRect(cam.x, cam.y, (nClasses.length>1)?256:128, Math.ceil(nClasses.length/2)*128);
    /*console.log("Tem [");
    for(let i of nClasses)
      console.log("{"+i.classe+","+i.preco+"},");
    console.log("];")*/
    for(let i = 0; i < nClasses.length; i++){
      let x = (i % 2) * 128; let y = Math.floor(i / 2) * 128;
      this.botoesClasses[nClasses[i]].draw(cam.x + x, cam.y + y);
    }
  }
}

hud = new Hud();
map = new Map(mapas.layers, 64, 64, 256, "tiles.png", 3);
entities = [];
projetils = [];
npcs = [];
bases = [];
drones = [];
bases.push(new Base(32, 32, 1200, game.height - 32 - 32, 0));
bases.push(new Base(game.width - 1200 - 32, 32, 1200, game.height - 32 - 32, 1));
entities.push(new Player("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 32), bases[0].y + Math.floor(Math.random() * bases[0].h - 32), 64, 64, 3, 5, 0, 0));
for(let i = 0; i < 63; i++)
  entities.push(new Enemy("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 32), bases[0].y + Math.floor(Math.random() * bases[0].h - 32), 64, 64, 3, 5, 0, 0));
for(let i = 0; i < 64; i++)
  entities.push(new Enemy("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 32), bases[1].y + Math.floor(Math.random() * bases[1].h - 32), 64, 64, 3, 5, 1, 0));
for(let i = 0; i < 32; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 16), bases[0].y + Math.floor(Math.random() * bases[0].h - 16), 0));
for(let i = 0; i < 32; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 16), bases[0].y + Math.floor(Math.random() * bases[0].h - 16), 1));
for(let i = 0; i < 32; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 16), bases[0].y + Math.floor(Math.random() * bases[0].h - 16), 2));
for(let i = 0; i < 32; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 16), bases[1].y + Math.floor(Math.random() * bases[1].h - 16), 0));
for(let i = 0; i < 32; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 16), bases[1].y + Math.floor(Math.random() * bases[1].h - 16), 1));
for(let i = 0; i < 32; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 16), bases[1].y + Math.floor(Math.random() * bases[1].h - 16), 2));

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
  //ctx.scale(cam.wMin / cam.w, cam.hMin / cam.h);
  ctx.translate(-cam.x, -cam.y);
  for(let base of bases) // Bases
    base.draw();
  ctx.fillStyle = "#4F4";
  for(let i = Math.floor(cam.x / map.tSize); i <= Math.floor((cam.x + cam.w) / map.tSize); i++)
    for(let j = Math.floor(cam.y / map.tSize); j <= Math.floor((cam.y + cam.h) / map.tSize); j++)
      ctx.drawImage(map.bg, 0, 0, map.tSize, map.tSize, i * map.tSize, j * map.tSize, map.tSize, map.tSize);
  for(let projetil of projetils)
    if(isOnScreen(projetil))
      projetil.draw();
  for(let npc of npcs)
    if(isOnScreen(npc))
      npc.draw();
  for(let entity of entities)
    if(isOnScreen(entity))
      entity.draw();
  for(let drone of drones)
    if(isOnScreen(drone))
      drone.draw();

  hud.draw();
  ctx.restore();
}
function controls(){
  keyPressed();
  keyReleased();
}
function physic(){
  for(let base of bases)
    base.dano();
  for(let entity of entities)
    entity.fisica();
  for(let npc of npcs)
    npc.fisica();
  for(let projetil of projetils)
    projetil.fisica();
  for(let drone of drones)
    drone.fisica();
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
     levelUp = 1;
  }
  if ((game.keys && game.keys[79])) { // Morre
     entities[0].hp = 0;
  }
  if(game.mouseClick.button == 1 && game.mouseClick.type == "mousedown"){
    entities[0].tiro = 1;
    hud.click = 1;
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
    if(levelUp){
      levelUp = 0;
      entities[0].exp = entities[0].nextLv;
    }
  }
  if(game.mouseClick.button == 1 && game.mouseClick.type == "mouseup"){
    entities[0].tiro = 0;
    if(hud.click){
      hud.clicked();
      hud.click = 0;
    }
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
var collisionSQ = function(r1, r2){
  if(r1.x+ r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h)
    return true;
  return false;
}
var isOnScreen = function(entity){
  if(entity.x < cam.x + cam.w &&
     entity.x + entity.w > cam.x &&
     entity.y < cam.y + cam.h &&
     entity.y + entity.h > cam.y)
     return true;
  return false;
}

// Debug
function debug(){
  let x = 0;
  //for(let i = 0; i < entities.length; i++)
    //if(collision({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, entities[i]))
      //x = i;
  text = "";
  text += "<br><br>Class: " + entities[x].classe;
  text += "<br><br>Pontos: " + entities[x].pt;
  text += "<br><br>Pontos de Classe: " + entities[x].ptClasse;
  text += "<br><br>HPRegen: (" + entities[x].clStats[0] + ", " + entities[x].ptStats[0] + ") => " + entities[x].hpRegen;
  text += "<br><br>HPRegen: (" + entities[x].clStats[1] + ", " + entities[x].ptStats[1] + ") => " + entities[x].hpMax;
  text += "<br><br>HPBodyDmg: (" + entities[x].clStats[2] + ", " + entities[x].ptStats[2] + ") => " + entities[x].bodyDmg;
  text += "<br><br>BulletSpd: (" + entities[x].clStats[3] + ", " + entities[x].ptStats[3] + ") => " + entities[x].bulletSpd;
  text += "<br><br>BulletPen: (" + entities[x].clStats[4] + ", " + entities[x].ptStats[4] + ") => " + entities[x].bulletPen;
  text += "<br><br>BulletDmg: (" + entities[x].clStats[5] + ", " + entities[x].ptStats[5] + ") => " + entities[x].bulletDmg;
  text += "<br><br>Reload: (" + entities[x].clStats[6] + ", " + entities[x].ptStats[6] + ") => " + entities[x].reloadMax;
  text += "<br><br>MoveSpd: (" + entities[x].clStats[7] + ", " + entities[x].ptStats[7] + ") => " + entities[x].spdMax;
  text += "<br><br>Poder = " + entities[x].clStats[5] * entities[x].clStats[4] / entities[x].clStats[6];
  text += "<br><br>Exp: (" + entities[x].exp + "," + entities[x].nextLv + ") => " + entities[x].lv;
  text += "<br><br>Reload: (" + entities[x].reload + " / " + entities[x].reloadMax + ")";
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

/*
Classes:
Os Smashers causam mais dano girando
A Bala que explode
O Teleguiado
O Escudador
O Teleportador
O Healer
O Excalibur
O Bardo
O Engenheiro
*/
