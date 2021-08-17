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
    game.keys = [];
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(update, 1000 / fps);
    window.addEventListener('keydown', function (e) {
      game.keys = (game.keys || []);
      game.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function (e) {
      game.keys[e.keyCode] = !(e.type != "keydown");
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
    if(naves[0].x < this.leftEdge()){
      this.x = naves[0].x - this.port * this.w;
    }
    if(naves[0].x + naves[0].w > this.rightEdge()){
      this.x = naves[0].x + naves[0].w - (1 - this.port) * this.w;
    }
    if(naves[0].y < this.topEdge()){
      this.y = naves[0].y - this.port * this.h;
    }
    if(naves[0].y + naves[0].h > this.bottomEdge()){
      this.y = naves[0].y + naves[0].h - (1 - this.port) * this.h;
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

hud = new Hud();
map = new Map(mapas.layers, 64, 64, 256, "tiles.png", 3);
naves = [];
balas = [];
npcs = [];
bases = [];
drones = [];
bases.push(new Base(32, 32, 1200, game.height - 32 - 32, 0));
bases.push(new Base(game.width - 1200 - 32, 32, 1200, game.height - 32 - 32, 1));
naves.push(new Player("nave.png", spriteX, 300, 300, 160, 160, 3, 5, 0, 0, naves.length));
for(let i = 0; i < 0; i++)
  naves.push(new Enemy("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 32), bases[0].y + Math.floor(Math.random() * bases[0].h - 32), 64, 64, 3, 5, 0, 0, naves.length));
for(let i = 0; i < 0; i++)
  naves.push(new Enemy("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 32), bases[1].y + Math.floor(Math.random() * bases[1].h - 32), 64, 64, 3, 5, 1, 0, naves.length));
for(let i = 0; i < 0; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 16), bases[0].y + Math.floor(Math.random() * bases[0].h - 16), 0));
for(let i = 0; i < 0; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 16), bases[0].y + Math.floor(Math.random() * bases[0].h - 16), 1));
for(let i = 0; i < 0; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[0].x + Math.floor(Math.random() * bases[0].w - 16), bases[0].y + Math.floor(Math.random() * bases[0].h - 16), 2));
for(let i = 0; i < 0; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 16), bases[1].y + Math.floor(Math.random() * bases[1].h - 16), 0));
for(let i = 0; i < 0; i++)
  npcs.push(new Npc("nave.png", spriteX, bases[1].x + Math.floor(Math.random() * bases[1].w - 16), bases[1].y + Math.floor(Math.random() * bases[1].h - 16), 1));
for(let i = 0; i < 0; i++)
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
  for(let bala of balas)
    if(isOnScreen(bala))
      bala.draw();
  for(let npc of npcs)
    if(isOnScreen(npc))
      npc.draw();
  for(let nave of naves)
    if(isOnScreen(nave))
      nave.draw();
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
  for(let nave of naves)
    nave.fisica();
  for(let npc of npcs)
    npc.fisica();
  for(let bala of balas)
    bala.fisica();
  for(let drone of drones)
    drone.fisica();
}

// Controls
var keyPressed = function() {
  if ((game.keys && game.keys[87])) { // Pula
     naves[0].up = 1;
  }
  if ((game.keys && game.keys[65])) { // Left
     naves[0].left = 1;
  }
  if ((game.keys && game.keys[83])) { // Down
     naves[0].down = 1;
  }
  if ((game.keys && game.keys[68])) { // Right
     naves[0].right = 1;
  }
  if ((game.keys && game.keys[75])) { // Tiro
     levelUp = 1;
  }
  if ((game.keys && game.keys[79])) { // Morre
     naves[0].hp = 0;
  }
  if(game.mouseClick.button == 1 && game.mouseClick.type == "mousedown"){
    naves[0].tiro = 1;
    hud.click = 1;
  }
};
var keyReleased = function() {
  if (!(game.keys && game.keys[87])) { // Pula
    naves[0].up = 0;
  }
  if (!(game.keys && game.keys[65])) { // Left
    naves[0].left = 0;
  }
  if (!(game.keys && game.keys[83])) { // Down
    naves[0].down = 0;
  }
  if (!(game.keys && game.keys[68])) { // Right
    naves[0].right = 0;
  }
  if (!(game.keys && game.keys[75])) { // Tiro
    if(levelUp){
      levelUp = 0;
      naves[0].exp = naves[0].nextLv;
    }
  }
  if(game.mouseClick.button == 1 && game.mouseClick.type == "mouseup"){
    naves[0].tiro = 0;
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
var isOnScreen = function(nave){
  if(nave.x < cam.x + cam.w &&
     nave.x + nave.w > cam.x &&
     nave.y < cam.y + cam.h &&
     nave.y + nave.h > cam.y)
     return true;
  return false;
}

// Debug
function debug(){
  let x = 0;
  //for(let i = 0; i < naves.length; i++)
    //if(collision({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, naves[i]))
      //x = i;
  text = "";
  text += "<br><br>Class: " + naves[x].classe;
  text += "<br><br>Pontos: " + naves[x].pt;
  text += "<br><br>Pontos de Classe: " + naves[x].ptClasse;
  text += "<br><br>HPRegen: (" + naves[x].clStats[0] + ", " + naves[x].ptStats[0] + ") => " + naves[x].hpRegen;
  text += "<br><br>HPRegen: (" + naves[x].clStats[1] + ", " + naves[x].ptStats[1] + ") => " + naves[x].hpMax;
  text += "<br><br>HPBodyDmg: (" + naves[x].clStats[2] + ", " + naves[x].ptStats[2] + ") => " + naves[x].bodyDmg;
  text += "<br><br>BulletSpd: (" + naves[x].clStats[3] + ", " + naves[x].ptStats[3] + ") => " + naves[x].bulletSpd;
  text += "<br><br>BulletPen: (" + naves[x].clStats[4] + ", " + naves[x].ptStats[4] + ") => " + naves[x].bulletPen;
  text += "<br><br>BulletDmg: (" + naves[x].clStats[5] + ", " + naves[x].ptStats[5] + ") => " + naves[x].bulletDmg;
  text += "<br><br>Reload: (" + naves[x].clStats[6] + ", " + naves[x].ptStats[6] + ") => " + naves[x].reloadMax;
  text += "<br><br>MoveSpd: (" + naves[x].clStats[7] + ", " + naves[x].ptStats[7] + ") => " + naves[x].spdMax;
  text += "<br><br>Poder = " + naves[x].clStats[5] * naves[x].clStats[4] / naves[x].clStats[6];
  text += "<br><br>Exp: (" + naves[x].exp + "," + naves[x].nextLv + ") => " + naves[x].lv;
  text += "<br><br>Reload: (" + naves[x].reload + " / " + naves[x].reloadMax + ")";
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
  for(let nave of naves){
    pontos.push(nave.score);
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
