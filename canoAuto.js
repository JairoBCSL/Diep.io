class CanoAuto extends Cano{
  init(n,classe,team,id){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.n = n; this.recuo = 0;
    this.classe = classe; this.team = team; this.id = id; this.rot = 0;
    this.modulo; this.reloadMax = naves[id].reloadMax; this.reload = 0;
    this.dist = naves[id].w * 9;
    switch(classe){
      case 17:{ // Auto 3
        this.x0 =  19 / 128; this.x1 = 64 / 128; this.x2 = 0;
        this.y0 =  19 / 128; this.y1 = 64 / 128; this.y2 = 0;
        this.w0 =  90 / 128; this.h0 = 90 / 128;
        this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
        this.r0 = Math.PI * 2 / 3 * this.n; this.r1 = 1;
        this.anguloL = Math.PI / 2; this.anguloH = Math.PI * 3 / 2;
        break;
      }
      case 22:{ // Auto Gunner
          this.x0 =  38 / 256; this.x1 = 0; this.x2 = 0;
          this.y0 =  38 / 256; this.y1 = 0; this.y2 = 0;
          this.w0 =  90 / 128; this.h0 = 90 / 128;
          this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
          this.r0 = 0; this.r1 = 0;
          this.anguloL = Math.PI * 2; this.anguloH = 0;
        break;
      }
      case 29:{ // Auto 5
        this.x0 =  19 / 128; this.x1 = 64 / 128; this.x2 = 0;
        this.y0 =  19 / 128; this.y1 = 64 / 128; this.y2 = 0;
        this.w0 =  90 / 128; this.h0 = 90 / 128;
        this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
        this.r0 = Math.PI * 2 / 5 * this.n; this.r1 = 1;
        this.anguloL = Math.PI / 2; this.anguloH = Math.PI * 3 / 2;
        break;
      }
      case 43:{ // Auto Trapper
        this.x0 =  38 / 256; this.x1 = 0; this.x2 = 16*(2*this.n-3) / 128;
        this.y0 =  38 / 256; this.y1 = 0; this.y2 = -16*(2*this.n-3) / 128;
        this.w0 =  90 / 128; this.h0 = 90 / 128;
        this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
        this.r0 = 0; this.r1 = 0;
        this.anguloL = Math.PI * 2; this.anguloH = 0;
        break;
      }
      case 46:{ // Auto Smasher
        this.x0 =  38 / 256; this.x1 = 0; this.x2 = 0;
        this.y0 =  38 / 256; this.y1 = 0; this.y2 = 0;
        this.w0 =  90 / 128; this.h0 = 90 / 128;
        this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
        this.r0 = 0; this.r1 = 0;
        this.anguloL = Math.PI * 2; this.anguloH = 0;
        break;
      }
    }
  }
  shoot(){
    if(this.reload > 0)
      this.reload--;
    else{
      let pertos = 0, maisPerto = -1, maisPertoDist = 1000000, atualDist;
      let x, y, vai, npc = 0, angulo, anguloNave = naves[this.id].rot + this.r0;
      if(naves[this.id].tiro && (this.classe == 17 ||this.classe == 29 )){ // Comandando
        angulo = Math.atan2(naves[this.id].tiroY - (this.y + this.h / 2), naves[this.id].tiroX - (this.x + this.w / 2));
        console.log(angulo);
        if(Math.abs(angulo-anguloNave) <= this.anguloL || Math.abs(angulo-anguloNave) >= this.anguloH)
          npc = 3;
      }
      if(npc < 3){ // Vai atirar
        for(let i = 0; i < naves.length; i++){ // Procurando inimigo
          if(naves[i].team != this.team){
            angulo = Math.atan2(naves[i].y+naves[i].h/2-this.y-this.h/2, naves[i].x+naves[i].w/2-this.x-this.w/2);
            if(Math.abs(angulo-anguloNave) <= this.anguloL || Math.abs(angulo-anguloNave) >= this.anguloH){
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
        }
      }
      if(npc < 2){
        for(let i = 0; i < npcs.length; i++){ // Procurando npc
          angulo = Math.atan2(npcs[i].y+npcs[i].h/2-this.y-this.h/2, npcs[i].x+npcs[i].w/2-this.x-this.w/2);
          if(Math.abs(angulo-anguloNave) <= this.anguloL || Math.abs(angulo-anguloNave) >= this.anguloH){
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
        }
      }
      if(npc){ // Atacando
        this.recuo = 30;
        if(npc == 3){
          x = naves[this.id].tiroX;
          y = naves[this.id].tiroY;
        }
        else if(npc == 2){ // É Nave
          x = naves[maisPerto].x + naves[maisPerto].w / 2;
          y = naves[maisPerto].y + naves[maisPerto].h / 2;
        }else if(npc == 1){ // É NPC
          x = npcs[maisPerto].x + npcs[maisPerto].w / 2;
          y = npcs[maisPerto].y + npcs[maisPerto].h / 2;
        }
        this.rot = Math.atan2(y - this.y - this.h / 2,  x - this.x - this. w / 2);
        let x0 = (this.w>this.h)?(this.x+this.w/2-this.h/2):(this.x+this.h/2-this.w/2);
        let y0 = (this.w>this.h)?(this.y+this.w/2-this.h/2):(this.y+this.h/2-this.w/2);
        balas.push(new Bala(x0, y0, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
        this.reload = this.reloadMax;
      }
      else{ // Cano desligado
        this.rot = naves[this.id].rot * this.r1 + this.r0;
      }
    }
  }
  update(){
    this.x = naves[this.id].x + naves[this.id].w * this.x0 + naves[this.id].w * this.x1 * Math.cos(naves[this.id].rot*this.r1+this.r0) + naves[this.id].w * this.x2 * Math.sin(naves[this.id].rot*this.r1+this.r0);
    this.y = naves[this.id].y + naves[this.id].h * this.y0 + naves[this.id].h * this.y1 * Math.sin(naves[this.id].rot*this.r1+this.r0) + naves[this.id].h * this.y2 * Math.cos(naves[this.id].rot*this.r1+this.r0);
    this.w = this.w0 * naves[this.id].w; this.h = this.h0 * naves[this.id].w;
    //this.rot = naves[this.id].rot*this.r1 + this.r0;
  }
  draw(){
    var ctx = game.canvas.getContext("2d");
    ctx.save()
    if(this.n == 0)
      ctx.fillStyle = "#F00F";
    else if(this.n == 1)
      ctx.fillStyle = "#0F0F";
    else if(this.n == 2)
      ctx.fillStyle = "#00FF";
    else
      ctx.fillStyle = "#FF0F";
    //ctx.fillRect(this.x-5, this.y-5, this.w+10, this.h+10);
    ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
    ctx.rotate(this.rot);
    ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
    ctx.drawImage(imagens.canos, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
    ctx.restore();
    }
}
