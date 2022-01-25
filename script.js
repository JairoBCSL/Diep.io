/*
Separar canos conroláveis e não controláveis

Technicians (ferramenta, engrenagem, átomo e engrenagem da medicina)1949
Tiro no final do cano
Só procurar se tiver na tela (cam.x<x<cam.w+cam.w)
Recoil
Modos
2 Teams
4 Teams
Battle Royale
Modo Mothership
Modo Conquista
Modo Pega bandeiras

Classes:
- Stalker (3ª classe): Invisível quando não se move
  - Assassin (4ª classe): Invisível + instakill se for de costas perto
  - Watcher (4ª classe): Insivível + vê longe mirando
  - Ranger (4ª classe): Invisível + Maior alcance
- Hunter (3ª classe): Dá dash
  - Predator (4ª classe): Invisível + Dash
  - Charger (4ª classe): Dash + Carga
- Smasher (3ª classe)
  - Grinder (4ª classe): Causa mais dano girando
  - Auto Smasher (4ª classe): Já sabe
  - Landmine (4ª classe): Fica invisível
- Destroyer (3ª classe)
  - Annihinator (4ª classe): Bala explode
- Technician (3ª classe) Instala torreta
  - Engennier (4ª classe) Instala base talvez
  - Scientist (4ª classe) Escudo muitxu louco
  - Medic (4ª classe) Cura em raio

O Escudador
O Excalibur
O Bardo
*/

var fps = 60, timestamp = new Date().getTime(), count = 0, aux = 0;
var vezes = 0, vezesAux = 0, aff = "", levelUp = 0, meuID = 0;
var dRot = 0, rotAux = 0, rotA = 0, rot = 0;

var classes = [
 //0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59
  [4, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4],//Normal
  [4, 4, 4, 4, 4, 4, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Machine Gun
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Twin
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Sniper
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Flank
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Smasher
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Destroyer
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Gunner
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Rifle
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Tiple Shot
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Quad Tank
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Twin Flank
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Stalker
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Overseer
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Hunter
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],//Trapper
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4],//Tri-Angle
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]//Auto 3
];

var game = {
  width: 2*8192,
  height: 2*8192,//6144
  canvas: document.createElement("canvas"),
  start: function(){
    this.canvas.width = 1600;
    this.canvas.height = 900;
    game.keys = [];
    game.mouseX = [];
    game.mouseY = [];
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
        game.mouseX = e.pageX;// * (1 + naves[0].lv / 90);// + cam.x;
        game.mouseY = e.pageY;// * (1 + naves[0].lv / 90);// + cam.y;
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
  w: 1600,
  h: 900,
  wMin: 1600,
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
    if(naves[meuID].classe == 38 && naves[meuID].skill){
      this.x += this.w*0.4*Math.cos(naves[meuID].rot);
      this.y += this.h*0.4*Math.sin(naves[meuID].rot);
    }
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

var imagens = {
  naves: new Image(), canos: new Image(), balas: new Image(),
  classes: new Image(), tiles: new Image(),
  init: function(){
    this.naves.src = "imagens/naves.png";
    this.canos.src = "imagens/canos.png";
    this.balas.src = "imagens/balas.png";
    this.classes.src = "imagens/classes.png";
    this.tiles.src = "imagens/tiles.png";
  }
}
imagens.init();
hud = new Hud();
map = new Map(mapas.layers, 64, 64, 256, 3);
balas = [];
drones = [];
naves = [];
npcs = [];
bases = [];
naves.push(new Player(game.width*0.05, game.height*0.96, 48, 3, 0, 0, naves.length));
bases.push(new Base(game.width*0.01, game.height*0.945, game.width*0.045, game.height*0.045, 0));
naves.push(new Tower(game.width*0.055-176, game.height*0.65-176, 192, 3, 0, 64, naves.length)); // Top
naves.push(new Tower(game.width*0.055-176, game.height*0.45-176, 192, 3, 0, 61, naves.length));
naves.push(new Tower(game.width*0.055-176, game.height*0.25-176, 192, 3, 0, 62, naves.length));
naves.push(new Tower(game.width*0.2-176, game.height*0.8-176, 192, 3, 0, 64, naves.length)); // Mid
naves.push(new Tower(game.width*0.3-176, game.height*0.7-176, 192, 3, 0, 61, naves.length));
naves.push(new Tower(game.width*0.4-176, game.height*0.6-176, 192, 3, 0, 62, naves.length));
naves.push(new Tower(game.width*0.35-176, game.height*0.945-176, 192, 3, 0, 64, naves.length)); // Bot
naves.push(new Tower(game.width*0.55-176, game.height*0.945-176, 192, 3, 0, 61, naves.length));
naves.push(new Tower(game.width*0.75-176, game.height*0.945-176, 192, 3, 0, 62, naves.length));
naves.push(new Tower(game.width*0.1275-176, game.height*0.9225-176, 192, 3, 0, 63, naves.length)); // Base
naves.push(new Tower(game.width*0.0775-176, game.height*0.8775-176, 192, 3, 0, 63, naves.length));
naves.push(new Mothership(game.width*0.0775-187, game.height*0.9225-187, 192, 3, 0, 60, naves.length));

bases.push(new Base(game.width*0.955, game.height*0.01, game.width*0.045, game.height*0.045, 1));
naves.push(new Tower(game.width*0.945-176, game.height*0.35-176, 192, 3, 1, 64, naves.length)); // Bot
naves.push(new Tower(game.width*0.945-176, game.height*0.55-176, 192, 3, 1, 61, naves.length));
naves.push(new Tower(game.width*0.945-176, game.height*0.75-176, 192, 3, 1, 62, naves.length));
naves.push(new Tower(game.width*0.8-176, game.height*0.2-176, 192, 3, 1, 64, naves.length)); // Mid
naves.push(new Tower(game.width*0.7-176, game.height*0.3-176, 192, 3, 1, 61, naves.length));
naves.push(new Tower(game.width*0.6-176, game.height*0.4-176, 192, 3, 1, 62, naves.length));
naves.push(new Tower(game.width*0.65-176, game.height*0.055-176, 192, 3, 1, 64, naves.length)); // Top
naves.push(new Tower(game.width*0.45-176, game.height*0.055-176, 192, 3, 1, 61, naves.length));
naves.push(new Tower(game.width*0.25-176, game.height*0.055-176, 192, 3, 1, 62, naves.length));
naves.push(new Tower(game.width*0.8725-176, game.height*0.0775-176, 192, 3, 1, 63, naves.length)); // Base
naves.push(new Tower(game.width*0.9225-176, game.height*0.1225-176, 192, 3, 1, 63, naves.length));
naves.push(new Mothership(game.width*0.9225-187, game.height*0.0775-187, 192, 3, 1, 60, naves.length));

for(let i = 0; i < 4; i++)
  naves.push(new Enemy(bases[0].x + Math.floor(Math.random() * (bases[0].w-48)), bases[0].y + Math.floor(Math.random() * (bases[0].h-48)), 48, 3, 0, 0, naves.length));
for(let i = 0; i < 5; i++)
  naves.push(new Enemy(bases[1].x + Math.floor(Math.random() * (bases[1].w-48)), bases[1].y + Math.floor(Math.random() * (bases[1].h-48)), 48, 3, 1, 0, naves.length));
for(let i = 0; i < 0; i++)
  npcs.push(new Npc(bases[0].x + Math.floor(Math.random() * bases[0].w - 16), bases[0].y + Math.floor(Math.random() * bases[0].h - 16), 0));

paredes = [];
paredes.push(new Parede([ // South
  {x:game.width*0.1, y:game.height*0.9},
  {x:game.width*0.01, y:game.height*0.99},
  {x:game.width*0.9, y:game.height*0.99},
  {x:game.width*0.8, y:game.height*0.9},
  {x:game.width*0.1, y:game.height*0.9}
]));
paredes.push(new Parede([ // Southeast
  {x:game.width*0.8, y:game.height*0.9},
  {x:game.width*0.9, y:game.height*0.99},
  {x:game.width*0.99, y:game.height*0.9},
  {x:game.width*0.9, y:game.height*0.8},
  {x:game.width*0.8, y:game.height*0.9}
]));
paredes.push(new Parede([ // East
  {x:game.width*0.9, y:game.height*0.1},
  {x:game.width*0.9, y:game.height*0.8},
  {x:game.width*0.99, y:game.height*0.9},
  {x:game.width*0.99, y:game.height*0.01},
  {x:game.width*0.9, y:game.height*0.1}
]));
paredes.push(new Parede([ // Northeast
  {x:game.width*0.7, y:game.height*0.1},
  {x:game.width*0.75, y:game.height*0.25},
  {x:game.width*0.9, y:game.height*0.3},
  {x:game.width*0.99, y:game.height*0.2},
  {x:game.width*0.8, y:game.height*0.01},
  {x:game.width*0.7, y:game.height*0.1}
]));
paredes.push(new Parede([ // North
  {x:game.width*0.1, y:game.height*0.01},
  {x:game.width*0.2, y:game.height*0.1},
  {x:game.width*0.9, y:game.height*0.1},
  {x:game.width*0.99, y:game.height*0.01},
  {x:game.width*0.1, y:game.height*0.01}
]));
paredes.push(new Parede([ // Northwest
  {x:game.width*0.01, y:game.height*0.1},
  {x:game.width*0.1, y:game.height*0.2},
  {x:game.width*0.2, y:game.height*0.1},
  {x:game.width*0.1, y:game.height*0.01},
  {x:game.width*0.01, y:game.height*0.1}
]));
paredes.push(new Parede([ // West
  {x:game.width*0.01, y:game.height*0.1},
  {x:game.width*0.01, y:game.height*0.99},
  {x:game.width*0.1, y:game.height*0.9},
  {x:game.width*0.1, y:game.height*0.2},
  {x:game.width*0.01, y:game.height*0.1}
]));
paredes.push(new Parede([ // Southwest
  {x:game.width*0.01, y:game.height*0.8},
  {x:game.width*0.2, y:game.height*0.99},
  {x:game.width*0.3, y:game.height*0.9},
  {x:game.width*0.25, y:game.height*0.75},
  {x:game.width*0.1, y:game.height*0.7},
  {x:game.width*0.01, y:game.height*0.8}
]));
paredes.push(new Parede([ // Mid
  {x:game.width*0.01, y:game.height*0.9},
  {x:game.width*0.1, y:game.height*0.99},
  {x:game.width*0.99, y:game.height*0.1},
  {x:game.width*0.9, y:game.height*0.01},
  {x:game.width*0.01, y:game.height*0.9}
]));

function startGame(){
  game.start();
}

function update(){
  redraw();
  controls();
  physic();
  //debug();
}
function redraw(){
  game.clear();
  var ctx = game.canvas.getContext("2d");
  cam.center();
  ctx.save();
  ctx.scale(cam.wMin / cam.w, cam.hMin / cam.h);
  ctx.translate(-cam.x, -cam.y);
  for(let base of bases) // Bases
    base.draw();
  ctx.fillStyle = "#4F4";
  for(let i = Math.floor(cam.x / map.tSize); i <= Math.floor((cam.x + cam.w) / map.tSize); i++)
    for(let j = Math.floor(cam.y / map.tSize); j <= Math.floor((cam.y + cam.h) / map.tSize); j++)
      ctx.drawImage(imagens.tiles, 0, 0, map.tSize, map.tSize, i * map.tSize, j * map.tSize, map.tSize, map.tSize);
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
  //mapa.draw();
  for(let i = 0; i < paredes.length; i++)
    paredes[i].draw();
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
  if ((game.keys && game.keys[69])) { // Skill
     naves[0].skill = 1;
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
  if (!(game.keys && game.keys[69])) { // Skill
    naves[0].skill = 0;
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
  if(dist < r1.w / 2 + r2.w / 2){
    return true;
  }
  else
    return false;
}
var collisionSQ = function(r1, r2){
  if(r1.x+ r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h)
    return true;
  return false;
}
var collide = function(r1, r2){
  let difX = (r2.x + r2.w / 2) - (r1.x + r1.w / 2);
  let difY = (r2.y + r2.h / 2) - (r1.y + r1.h / 2);
  let angulo = Math.atan2(difY, difX);
  for(let i = 0; i < paredes.length; i++){
    if(paredes[i].isDentro({x:r1.x+r1.w/2-Math.cos(angulo), y:r1.y+r1.h/2})){
      if(r1.pesado != 1)
        r1.x -= Math.cos(angulo);
      i = paredes.length;
    }
  }
  for(let i = 0; i < paredes.length; i++){
    if(paredes[i].isDentro({x:r1.x+r1.w/2, y:r1.y+r1.h/2-Math.sin(angulo)})){
      if(r1.pesado != 1)
        r1.y -= Math.sin(angulo);
      i = paredes.length;
    }
  }
  for(let i = 0; i < paredes.length; i++){
    if(paredes[i].isDentro({x:r2.x+r2.w/2+Math.cos(angulo), y:r2.y+r2.h/2})){
      if(r2.pesado != 1)
        r2.x += Math.cos(angulo);
      i = paredes.length;
    }
  }
  for(let i = 0; i < paredes.length; i++){
    if(paredes[i].isDentro({x:r2.x+r2.w/2, y:r2.y+r2.h/2+Math.sin(angulo)})){
      if(r2.pesado != 1)
        r2.y += Math.sin(angulo);
      i = paredes.length;
    }
  }
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
  //for(let i = 0; i < drones.length; i++)
    //if(collision({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, naves[i]))
      //x = i;
  text = "";
  /*text += "<br><br>Class: " + naves[x].classe;
  text += "<br><br>Pontos: " + naves[x].pt;
  text += "<br><br>Pontos de Classe: " + naves[x].ptClasse;
  text += "<br><br>HPRegen: (" + naves[x].clStats[0] + ", " + naves[x].ptStats[0] + ") => " + naves[x].hpRegen + " - " + naves[x].regenCooldownMax;
  text += "<br><br>HP: (" + naves[x].clStats[1] + ", " + naves[x].ptStats[1] + ") => " + naves[x].hpMax;
  text += "<br><br>HPBodyDmg: (" + naves[x].clStats[2] + ", " + naves[x].ptStats[2] + ") => " + naves[x].bodyDmg;
  text += "<br><br>BulletSpd: (" + naves[x].clStats[3] + ", " + naves[x].ptStats[3] + ") => " + naves[x].bulletSpd;
  text += "<br><br>BulletPen: (" + naves[x].clStats[4] + ", " + naves[x].ptStats[4] + ") => " + naves[x].bulletPen;
  text += "<br><br>BulletDmg: (" + naves[x].clStats[5] + ", " + naves[x].ptStats[5] + ") => " + naves[x].bulletDmg;
  text += "<br><br>Reload: (" + naves[x].clStats[6] + ", " + naves[x].ptStats[6] + ") => " + naves[x].reloadMax;
  text += "<br><br>MoveSpd: (" + naves[x].clStats[7] + ", " + naves[x].ptStats[7] + ") => " + naves[x].spdMax;
  text += "<br><br>Poder = " + naves[x].clStats[5] * naves[x].clStats[4] / naves[x].clStats[6];
  text += "<br><br>Exp: (" + naves[x].exp + "," + naves[x].nextLv + ") => " + naves[x].lv;
  text += "<br><br>Reload: (" + naves[x].reload + " / " + naves[x].reloadMax + ")";
  text += "<br><br>Reload Auto: (" + naves[x].reloadAuto + " / " + naves[x].reloadMax + ")";
  text += "<br><br>Drones: (" + naves[x].drones + " / " + naves[x].dronesMax + ")";*/
  let x0 = (naves[x].x+naves[x].w/2) / game.width;
  let y0 = (naves[x].y+naves[x].h/2) / game.height;
  text += "<br><br>Posição: "+"("+x0+","+y0+")";
  //text += "<br><br>South: "+(paredes[0].isDentro({x:naves[meuID].x+naves[meuID].w/2, y:naves[meuID].y+naves[meuID].h/2}));
  //text += "<br><br>Southeast: "+(paredes[1].isDentro({x:naves[meuID].x+naves[meuID].w/2, y:naves[meuID].y+naves[meuID].h/2}));
  //text += "<br><br>East: "+(paredes[2].isDentro({x:naves[meuID].x+naves[meuID].w/2, y:naves[meuID].y+naves[meuID].h/2}));
  //text += "<br><br>North: "+(paredes[3].isDentro({x:naves[meuID].x+naves[meuID].w/2, y:naves[meuID].y+naves[meuID].h/2}));
  //text += "<br><br>Northwest: "+(paredes[4].isDentro({x:naves[meuID].x+naves[meuID].w/2, y:naves[meuID].y+naves[meuID].h/2}));
  //text += "<br><br>West: "+(paredes[0].isDentro({x:naves[meuID].x+naves[meuID].w/2, y:naves[meuID].y+naves[meuID].h/2}));
  //text += "<br><br>Mid: "+(paredes[6].isDentro({x:naves[meuID].x+naves[meuID].w/2, y:naves[meuID].y+naves[meuID].h/2}));
  count++;
  dRot = Math.abs(rotA - naves[0].rot);
  rotA = naves[0].rot;
  rotAux += dRot;
  if((new Date().getTime() - timestamp) >= 1000){
    timestamp = new Date().getTime();
    aux = count;
    count = 0;
    vezesAux = vezes;
    vezes = 0;
    rot = rotAux / aux;
    rotAux = 0;
  }
  text += "<br><br>Vezes : " + vezesAux / aux;
  text += "<br><br>FPS: " + aux;
  text += "<br><br>Rot: " + rot;
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
