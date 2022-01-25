class Nave{
  constructor(x, y, r, spdMax, team, classe, id){
    this.init(x, y, r, spdMax, team, classe, id)
  }
  init(x, y, r, spdMax, team, classe, id){
    this.x = x; this.y = y; this.w = r; this.h = r; // Posição
    this.wA = this.w; this.hA = this.h; this.peso = r * r;
    this.drones = 0; this.id = id; this.qualCano = 0; this.dronesMax = 0;
    this.xSRC = 0; this.ySRC = 128 * team; this.wSRC = 128; this.hSRC = 128; // Sprite
    this.hp = 120; this.hpMax = 120; this.hpRegen = 1; this.bodyDmg = 4; // Stats
    this.bulletSpd = 4; this.bulletPen = 60; this.bulletDmg = 9;
    this.bulletSize = 24; this.team = team; this.spdMax = spdMax;
    this.tiroX = 0; this.tiroY = 0; this.angulo = 0; this.modulo = 0; this.vai = 0;

    this.ptStats = []; this.pt = 0; this.ptStats[0] = 0; this.ptStats[1] = 0; // Pontos
    this.ptStats[2] = 0; this.ptStats[3] = 0; this.ptStats[4] = 0;
    this.ptStats[5] = 0; this.ptStats[6] = 0; this.ptStats[7] = 0;

    this.clStats = []; this.classe = classe; this.clStats[0] = 0.1; this.clStats[1] = 120; // Classe
    this.clStats[2] = 4; this.clStats[3] = 4; this.clStats[4] = 60;
    this.clStats[5] = 4; this.clStats[6] = 60; this.clStats[7] = 2;
    this.clBulletSize = 32; this.ptClasse = 0;

    this.dirX = 1; this.dirY = 1; this.orientX = 1; this.orientY = 1; this.spd = 0;
    this.reload = 0; this.reloadMax = 60; this.reloadAuto = 0;
    this.batalha = 0; this.procura = 1; this.regenCooldown = 0; this.regenCooldownMax = 300;
    this.invisible = 120; this.invisibleMax = 120; this.skill = 0;
    this.score = 0; this.lv = 1; this.exp = 3000000; this.expTotal = 0; this.nextLv = this.lv * 100;
    this.up = 0; this.down = 0; this.left = 0; this.right = 0; this.tiro = 0;

    this.rot = 0; this.moveRot = 0;
    this.canos = [];
    this.levelUp();
    this.updateStats();
    this.canos.push(new Cano(0,classe,team, id));
  }
  fisica() {
    this.levelUp();
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
  perigo(){
    this.batalha =this.hp*this.bodyDmg*this.bulletSpd*this.bulletPen*this.bulletDmg*this.reloadMax*this.spdMax/1000000;
  }
  dano(){
    for(let i = naves.indexOf(this) + 1; i < naves.length; i++){ // Colidiu com inimigos n*n
      if(collision(this, naves[i])){
          collide(this,naves[i]);
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
    for(let i = 0; i < drones.length; i++){ // Colidiu com bala drone n*o
      if(this.team != drones[i].team){
        if(collision(this, drones[i])){
          collide(this,drones[i]);
          if(this.team != drones[i].team){
            drones[i].hp -= this.bodyDmg;
            this.hp -= drones[i].bodyDmg;
          }
          this.regenCooldown = this.regenCooldownMax;
        }
      }
    }
    for(let i = 0; i < npcs.length; i++){ // Colidiu com npc n*p
      if(collision(this, npcs[i])){
          collide(this,npcs[i]);
          npcs[i].hp -= this.bodyDmg;
          if(npcs[i].hp <= 0){
            this.exp += npcs[i].expTotal;
            this.expTotal += npcs[i].expTotal;
            if(this.classe == 33 && this.drones < naves[this.id].dronesMax && npcs[i].classe == 0){
              drones.push(new Drone(npcs[i].x, npcs[i].y, this.bulletSize, this.bulletSize, this.bulletSpd, this.rot, this.bulletPen, this.bulletDmg, this.team, this.classe, this.id));
              for(let i = 0; i < drones.length; i++)
                if(drones[i].id == naves.indexOf(this))
                  drones[i].hover = Math.PI * 2 / this.drones * i;
              npcs[i].fisica();
            }
          }
          this.hp -= npcs[i].bodyDmg;
          this.regenCooldown = this.regenCooldownMax;
        }
    }
  }
  move(){
    if(this.autos)
      this.rot += 0.0025;
    if(this.smasher)
      this.rot += 0.01;
    if(this.vai){
      if(this.invisibleSkill && this.invisible < 120) // Invisíveis
        this.invisible+=5;
      this.moveRot = this.angulo;
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
    switch(this.classe){
      case 0:{ // Normal
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 1:{ // Machine Gun
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 2:{ // Twin
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 3:{ // Sniper
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 4:{ // Flank
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 5:{ // Smasher
        break;
      }
      case 6:{ // Destroyer
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break; // 16 * 120 / 120 = 16
      } // X
      case 7:{ // Gunner
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 4;
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 8:{ // Rifle
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 9:{ // Triple Shot
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.reload = this.reloadMax;
        }
        break; // 3 * 4 * 60 / 45 = 16
      } // X
      case 10:{ // Quad Tank
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.canos[3].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 11:{ // Twin Flank
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0+this.qualCano].shoot();
          this.canos[2+this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 12:{ // Stalker
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
          this.invisible = this.invisibleMax;
        }
        break;
      } // X
      case 13:{ // Overseer
        if(this.reload > 0)
          this.reload--;
        else if(this.drones < 8){
          let hover = 0;
          this.canos[0].shoot();
          if(this.drones < 8)
            this.canos[1].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break;
      }
      case 14:{ // Hunter
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        if(this.reloadAuto > 0)
          this.reloadAuto--;
        else if(this.skill){
          this.spd = this.spdMax * 4;
          this.reloadAuto = this.reloadMax * 5;
        }
        break;
      }
      case 15:{ // Trapper
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 16:{ // Tri-Angle
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 17:{ // Auto 3
        this.canos[0].shoot();
        this.canos[1].shoot();
        this.canos[2].shoot();
        break;
      }
      case 18:{ // Hybrid
        if(this.drones < 2){
          let hover = 0;
          this.canos[1].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 19:{ // Annihilator
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 20:{ // Skimmer
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 21:{ // Rocketeer
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 22:{ // Auto Gunner
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 4;
          this.reload = this.reloadMax;
        }
        this.canos[4].shoot();
        break;
      }
      case 23:{ // Gunner Trapper
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }
        if(this.reloadAuto > 0)
          this.reloadAuto--;
        else if(this.tiro){
          this.canos[2].shoot();
          this.reloadAuto = this.reloadMax * 8;
        }
        break; // 4 * 60 / 15 = 16
      }
      case 24:{ // Streamer
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 25:{ // Triplet
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          if(this.qualCano == 1){
            this.canos[0].shoot();
            this.canos[1].shoot();
          }else{
            this.canos[2].shoot();
          }
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 26:{ // PentaShot
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.canos[3].shoot();
          this.canos[4].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 27:{ // SpreadShot
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.canos[3].shoot();
          this.canos[4].shoot();
          this.canos[5].shoot();
          this.canos[6].shoot();
          this.canos[7].shoot();
          this.canos[8].shoot();
          this.canos[9].shoot();
          this.canos[10].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 28:{ // Octa Tank
        if(this.reload > 0)
          this.reload--;
        else if(naves[this.id].tiro){
          this.canos[4 - 4 * this.qualCano].shoot();
          this.canos[5 - 4 * this.qualCano].shoot();
          this.canos[6 - 4 * this.qualCano].shoot();
          this.canos[7 - 4 * this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 29:{ // Auto 5
        this.canos[0].shoot();
        this.canos[1].shoot();
        this.canos[2].shoot();
        this.canos[3].shoot();
        this.canos[4].shoot();
        break;
      } // X
      case 30:{ // Triple Flank
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0+this.qualCano].shoot();
          this.canos[2+this.qualCano].shoot();
          this.canos[4+this.qualCano].shoot();
          this.qualCano = (this.qualCano + 1) % 2;
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 31:{ // Battleship
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          for(let i = 0; i < this.canos.length; i++)
            this.canos[i].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 32:{ // Overlord
        if(this.reload > 0)
          this.reload--;
        else if(this.drones < this.dronesMax){
          let hover = 0;
          for(let i = 0; i < this.canos.length; i++)
            this.canos[i].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break;
      }
      case 33:{ // Necromancer
        this.dronesMax = 16 * (1+this.ptStats[6]/7);
        break;
      }
      case 34:{ // Manager
        if(this.reload > 0)
          this.reload--;
        else if(this.drones < 8){
          let hover = 0;
          this.canos[0].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break;
      }
      case 35:{ // Overstrapper
        if(this.reloadAuto > 0)
          this.reloadAuto--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reloadAuto = this.reloadMax;
        }
        if(this.reload > 0)
          this.reload--;
        else if(this.drones < 4){
          let hover = 0;
          this.canos[1].shoot();
          if(this.drones < 4)
            this.canos[2].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break;
      }
      case 36:{ // Factory
        if(this.reload > 0)
          this.reload--;
        else if(this.drones < 8){
          let hover = 0;
          this.canos[0].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break;
      }
      case 37:{ // Assassin
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
          this.invisible = this.invisibleMax;
        }else if(this.skill){
          this.canos[1].shoot();
          this.reload = this.reloadMax * 10;
          this.invisible = this.invisibleMax;
        }
        break;
      }
      case 38:{ // Watcher
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
          this.invisible = this.invisibleMax;
        }
        break;
      } // X
      case 39:{ // Predator
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
          this.invisible = this.invisibleMax;
        }
        if(this.reloadAuto > 0)
          this.reloadAuto--;
        else if(this.skill){
          this.spd = this.spdMax * 4;
          this.reloadAuto = this.reloadMax * 5;
          this.invisible = this.invisibleMax;
        }
        break;
      }
      case 40:{ // Charger
        if(this.charge < this.chargeMax)
          this.charge++;
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          if(this.charge == this.chargeMax)
            this.canos[0].shoot();
          else
            this.canos[1].shoot();
          this.reload = this.reloadMax;
          this.charge = 0;
        }
        if(this.reloadAuto > 0)
          this.reloadAuto--;
        else if(this.skill){
          this.spd = this.spdMax * 4;
          this.reloadAuto = this.reloadMax * 5;
        }
        break;
      }
      case 41:{ // Ranger
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
          this.invisible = this.invisibleMax;
        }
        break;
      } // X
      case 42:{ // Tri-Trapper
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 43:{ // Auto Trapper
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        this.canos[1].shoot();
        this.canos[2].shoot();
        break;
      }
      case 44:{ // Big Trapper
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 45:{ // Grinder
        this.dRot = Math.abs(this.rotA - this.rot);
        this.rotA = this.rot;
        if(this.dRot > 1)
          this.dRot = 1;
        this.bodyDmg = (1 + this.dRot) * this.clStats[2]*(1+this.lv/45)*(1+this.ptStats[0]/7);
        break;
      }
      case 46:{ // Auto Smasher
        this.canos[1].shoot();
        break;
      } // X
      case 47:{ // Landmine
        break;
      }
      case 48:{ // Shield Smasher
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[1].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 49:{ // Oversmasher
        if(this.reload > 0)
          this.reload--;
        else if(this.drones < 2){
          let hover = 0;
          this.canos[0].shoot();
          for(let i = 0; i < drones.length; i++)
            if(drones[i].id == naves.indexOf(this))
              drones[i].hover = Math.PI * 2 / this.drones * i;
          this.reload = this.reloadMax;
        }
        break;
      }
      case 50:{ // Booster
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.canos[3].shoot();
          this.canos[4].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 51:{ // Warrior
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.canos[1].shoot();
          this.canos[2].shoot();
          this.canos[3].shoot();
          this.canos[4].shoot();
          this.reload = this.reloadMax;
        }
        break;
      } // X
      case 52:{ // Technician
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 53:{ // Engennier
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 54:{ // Scientist
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        break;
      }
      case 55:{ // Medic
        if(this.reload > 0)
          this.reload--;
        else if(this.tiro){
          this.canos[0].shoot();
          this.reload = this.reloadMax;
        }
        if(this.reloadAuto > 0)
          this.reloadAuto--;
        else if(this.skill){
          this.canos[1].shoot();
          this.reloadAuto = this.reloadMax*10;
        }
        break;
      }
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
    this.peso = this.w * this.h;
    this.hpRegen = this.clStats[0]*(1+this.lv/45)*(1+this.ptStats[0]/7);
    this.regenCooldownMax = 300 / this.hpRegen;
    this.hpMax = this.clStats[1]*(1+this.lv/45)*(1+this.ptStats[1]/7);
    this.hp = this.hpMax;
    this.bodyDmg = this.clStats[2]*(1+this.lv/45)*(1+this.ptStats[0]/7);
    this.bulletSpd = this.clStats[3]*(1+this.ptStats[3]/7);
    this.bulletPen = this.clStats[4]*(1+this.lv/45)*(1+this.ptStats[4]/7);
    this.bulletDmg = this.clStats[5]*(1+this.lv/45)*(1+this.ptStats[5]/7);
    this.reloadMax = this.clStats[6] / (1+this.ptStats[6]/7);
    this.spdMax = this.clStats[7]*(1+this.ptStats[7]/7);
    this.bulletSize = this.clBulletSize * (1 + this.lv / 90) * this.h / 128;
    for(let i = 0; i < drones.length; i++)
      if(naves.indexOf(this) == drones[i].id)
        drones[i].updateStats();
  }
  changeClass(classe){
    this.reload = 0; this.qualCano = 0; this.invisible = this.invisibleMax;
    this.invisibleSkill = 0; this.charge = 0; this.chargeMax = 0;
    this.smasher = 0; this.autos = 0; this.invisibleSkill = 0; this.grinder = 0;
    this.xSRC = 0; this.dronesMax = 0;
    for(let i = 0; i < drones.length; i++)
      if(drones[i].id == this.id)
        drones[i].hp = 0;
    switch(classe){
      case 0:{ // Normal -> MachineGun / Twin / Sniper / Flank / Smasher
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 60; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 60 = 4
      }
      case 1:{ // MachineGun -> Destroyer / Gunner / Rifle
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 28;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 30 = 8
      }
      case 2:{ // Twin -> Triple / Quad / Twin Flank
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 28;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 60 + 4 * 60 / 60 = 4 + 4 = 8
      }
      case 3:{ // Sniper -> Stalker / Overseer / Hunter / Trapper
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 4:{ // Flank -> Tri-Angle / Quad / Twin Flank / Auto 3
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 6;
        this.clStats[6] = 60; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 2 * 6 * 60 / 60 = 12
      }
      case 5:{ // Smasher
        this.clStats[0] = 0.1; this.clStats[1] = 240; this.clStats[2] = 16;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.smasher = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 6:{ // Destroyer ->
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 240; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 7:{ // Gunner
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 15; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 15 = 16
      }
      case 8:{ // Rifle
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 28;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 30 = 32
      }
      case 9:{ // Triple Shot
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4; //*3
        this.clStats[6] = 45; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 3 * 4 * 60 / 45 = 16
      }
      case 10:{ // Quad Tank
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 6;
        this.clStats[6] = 60; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        break; // 4 * 6 * 60 / 60 = 24
      }
      case 11:{ // Twin Flank
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        break; // 4 * 120 / 30 = 16
      }
      case 12:{ // Stalker
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.invisibleSkill = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 13:{ // Overseer
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.dronesMax = 8
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoOverseer(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(1,classe,this.team, naves.indexOf(this)));
        break; // 2 * 8 * 120 / 120 = 16
      }
      case 14:{ // Hunter
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 15:{ // Trapper
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoTrapper(0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 16:{ // Tri-Angle
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4; //*3
        this.clStats[6] = 45; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        break; // 3 * 4 * 60 / 45 = 16
      }
      case 17:{ // Auto 3
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 8;
        this.clStats[6] = 60; this.clStats[7] = 2; this.clBulletSize = 32;
        this.autos = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoAuto(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(2,classe,this.team, naves.indexOf(this)));
        break; // 3 * 8 * 60 / 60 = 24
      }
      case 18:{ // Hybrid
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        this.dronesMax = 2;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(1,classe,this.team, naves.indexOf(this)));
        break; // 2 * 16 * 120 / 120 = 32
      }
      case 19:{ // Annihilator
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 360; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoAnnihilator(0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 240 / 120 = 32
      }
      case 20:{ // Skimmer
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoSkimmer(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoSkimmer(1,classe,this.team, naves.indexOf(this)));
        break; // 32 * 120 / 120 = 32
      }
      case 21:{ // Rocketeer
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoRocketeer(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoRocketeer(1,classe,this.team, naves.indexOf(this)));
        break; // 32 * 120 / 120 = 32
      }
      case 22:{ // Auto Gunner
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 15; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(4,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 15 + 4 * 60 / 15 = 16 + 16 = 32
      }
      case 23:{ // Gunner Trapper
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 15; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoTrapper(2,classe,this.team, naves.indexOf(this)));
        break; // 4 * 60 / 15 + 4 * 60 / 15 = 16 + 16 = 32
      }
      case 24:{ // Streamer
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 60; this.clStats[5] = 8;
        this.clStats[6] = 15; this.clStats[7] = 2; this.clBulletSize = 8;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 60 / 15 = 32
      }
      case 25:{ // Triplet
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 6;
        this.clStats[6] = 15;/*30*/ this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 6 * 60 / 30 + 2 * 6 * 60 / 30 = 12 + 24 = 36
      }
      case 26:{ // PentaShot
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30;/*30*/ this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(4,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        break; // 5 * 4 * 60 / 30 = 5 * 8 = 40
      }
      case 27:{ // SpreadShot
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 3;
        this.clStats[6] = 30;/*30*/ this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(10,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(9,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(8,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(7,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(4,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(6,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(5,classe,this.team, naves.indexOf(this)));
        break; // 11 * 3 * 60 / 30 = 11 * 6 = 66
      }
      case 28:{ // Octa Tank
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 6;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(5,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(7,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(4,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(6,classe,this.team, naves.indexOf(this)));
        break; // 4 * 6 * 60 / 60 + 4 * 6 * 60 / 60 = 24 + 24 = 48
      }
      case 29:{ // Auto 5
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 8;
        this.clStats[6] = 60; this.clStats[7] = 2; this.clBulletSize = 32;
        this.autos = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoAuto(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(4,classe,this.team, naves.indexOf(this)));
        break; // 5 * 8 * 60 / 60 = 40
      }
      case 30:{ // Twin Flank
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(4,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(5,classe,this.team, naves.indexOf(this)));
        break; // 6 * 4 * 120 / 60 = 48
      }
      case 31:{ // Battleship
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 4;
        this.clStats[6] = 30; this.clStats[7] = 2; this.clBulletSize = 16;
        this.dronesMax = 256;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoOverseer(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(3,classe,this.team, naves.indexOf(this)));
        break; // 4 * 4 * 60 / 30 = 4 * 32
      }
      case 32:{ // Overlord
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.dronesMax = 8;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoOverseer(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(3,classe,this.team, naves.indexOf(this)));
        break; // 4 * 8 * 120 / 120 = 32
      }
      case 33:{ // Necromancer
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.dronesMax = 32;
        this.xSRC = 128;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoOverseer(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(1,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 34:{ // Manager
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.dronesMax = 8;
        this.invisibleSkill = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoOverseer(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 16
      }
      case 35:{ // Overtrapper
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.dronesMax = 4;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoTrapper(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoOverseer(2,classe,this.team, naves.indexOf(this)));
        break; // 2 * 8 * 120 / 120 + 16 * 120 / 120 = 16 + 16
      }
      case 36:{ // Factory
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 4;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.dronesMax = 8;
        this.xSRC = 128;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoFactory(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 4 * 120 / 120 = 64
      }
      case 37:{ // Assassin
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 8; this.clStats[4] = 120; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.invisibleSkill = 1;
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 32 * 120 / 120 = 32
      }
      case 38:{ // Watcher
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 8; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.invisibleSkill = 1;
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 39:{ // Predator
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 8; this.clStats[4] = 120; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.invisibleSkill = 1;
        this.canos = [];
          this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        break; // 32 * 120 / 120 = 32
      }
      case 40:{ // Charger
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 8; this.clStats[4] = 120; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.chargeMax = 300;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 32 * 120 / 120 = 32
      }
      case 41:{ // Ranger
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.invisibleSkill = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 32 * 120 / 120 = 32
      }
      case 42:{ // Tri-Trapper
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoTrapper(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoTrapper(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoTrapper(2,classe,this.team, naves.indexOf(this)));
        break; // 3 * 16 * 120 / 120 = 48
      }
      case 43:{ // Auto Trapper
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 80; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoTrapper(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(2,classe,this.team, naves.indexOf(this)));
        break; // 3 * 16 * 120 / 80 = 72
      }
      case 44:{ // Big Trapper
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 240; this.clStats[5] = 32;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 64;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoTrapper(0,classe,this.team, naves.indexOf(this)));
        break; // 32 * 240 / 120 = 64
      }
      case 45:{ // Grinder
        this.clStats[0] = 0.1; this.clStats[1] = 240; this.clStats[2] = 16;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.grinder = 1;
        this.dRot = 0; this.rotA = 0;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16 * (rot)
      }
      case 46:{ // Auto Smasher
        this.clStats[0] = 0.1; this.clStats[1] = 240; this.clStats[2] = 16;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.smasher = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new CanoAuto(1,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 + 16 * 120 / 120 = 16
      }
      case 47:{ // Landmine
        this.clStats[0] = 0.1; this.clStats[1] = 240; this.clStats[2] = 16;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.invisibleSkill = 1;
        this.smasher = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 = 16
      }
      case 48:{ // Shield Smasher
        this.clStats[0] = 0.1; this.clStats[1] = 240; this.clStats[2] = 16;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 600; this.clStats[7] = 2; this.clBulletSize = 128;
        this.smasher = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 + 16 * 120 / 600 = 16 + 16/5 = 19.2
      }
      case 49:{ // Oversmasher
        this.clStats[0] = 0.1; this.clStats[1] = 240; this.clStats[2] = 16;
        this.clStats[3] = 3; this.clStats[4] = 120; this.clStats[5] = 16;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.dronesMax = 2;
        this.smasher = 1;
        this.updateStats();
        this.canos = [];
        this.canos.push(new CanoOverseer(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 16 * 120 / 120 + 16 * 120 / 120 = 16 + 16 = 32
      }
      case 50:{ // Booster
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 8; //*5
        this.clStats[6] = 45; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(4,classe,this.team, naves.indexOf(this)));
        break; // 5 * 8 * 60 / 45 = 40
      }
      case 51:{ // Warrior
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 3; this.clStats[4] = 60; this.clStats[5] = 8; //*5
        this.clStats[6] = 45; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(2,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(3,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(4,classe,this.team, naves.indexOf(this)));
        break; // 5 * 8 * 60 / 45 = 40
      }
      case 52:{ // Technician
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 53:{ // Engennier
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 54:{ // Scientist
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 120; this.clStats[5] = 8;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 32;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
      case 55:{ // Medic
        this.clStats[0] = 0.1; this.clStats[1] = 120; this.clStats[2] = 4;
        this.clStats[3] = 6; this.clStats[4] = 12000; this.clStats[5] = 800;
        this.clStats[6] = 120; this.clStats[7] = 2; this.clBulletSize = 320;
        this.updateStats();
        this.canos = [];
        this.canos.push(new Cano(0,classe,this.team, naves.indexOf(this)));
        this.canos.push(new Cano(1,classe,this.team, naves.indexOf(this)));
        break; // 8 * 120 / 120 = 8
      }
    }
    if(classe)
      this.ptClasse -= classes[this.classe][classe];
    console.log("E passou da classe "+this.classe+" para a classe "+classe);
    this.classe = classe;
    this.updateStats();
  }
  levelUp(){
    let x = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
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
      this.ptClasse = 0;


      let x = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

      for(let i = 0; i < Math.floor(this.lv / 2); i++)
        this.expTotal += 100 * i * i;
      this.exp = this.expTotal;
      this.nextLv = 0;
      this.lv = 0;
      for(let i = 0; i < drones.length; i++)
        if(this.id == drones[i].id)
          drones[i].hp = 0;
      this.x = bases[this.team].x + Math.floor(Math.random() * bases[this.team].w - 32);
      this.y = bases[this.team].y + Math.floor(Math.random() * bases[this.team].h - 32);

      this.changeClass(0);
    }
  }
}
