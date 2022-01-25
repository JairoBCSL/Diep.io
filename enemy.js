class Enemy extends Nave{
  controle(){
    let pertos = 0, maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let perigo = 0, amigoDist; this.vai = 0;
    for(let nave of naves){ // Procurando inimigo
      if(nave.team != this.team){
        atualDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(atualDist < this.w * 9){
          pertos++;
          perigo += nave.batalha;
        }
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = naves.indexOf(nave);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(amigoDist < this.w * 9){
          perigo -= nave.batalha;
        }
      }
    }
    /*for(let base of bases){ // Procurando base
      if(base.team != this.team){
        if(collisionSQ(this, {x:base.x-base.w/3, y:base.y-base.h/3, w:base.w*5/3, h:base.h*5/3})){
          perigo = 999999;
          pertos++;
        }
      }else {
        if(collisionSQ(this, {x:base.x, y:base.y, w:base.w, h:base.h})){
          perigo = -999999;
        }
      }
    }*/
    // Tem alguém perto?
    if(pertos){
      // Ataca
      this.rot = Math.atan2(naves[maisPerto].y+naves[maisPerto].h/2 - this.y - this.h/2, naves[maisPerto].x+naves[maisPerto].w-this.x-this.w);
      this.tiro = 1;
      this.modulo = Math.sqrt( Math.pow(this.x+this.w-naves[maisPerto].x-naves[maisPerto].w, 2) + Math.pow(this.y+this.h-naves[maisPerto].y-naves[maisPerto].h, 2) );
      this.angulo = Math.atan2(this.y+this.h-naves[maisPerto].y-naves[maisPerto].h, naves[maisPerto].x+naves[maisPerto].w-this.x-this.w);
      this.tiroX = naves[maisPerto].x + naves[maisPerto].w / 2;
      this.tiroY = naves[maisPerto].y + naves[maisPerto].h / 2;
      //let perigo = -9;
      if(perigo < 3 * this.batalha && this.modulo > this.w * 7){ // Vai pra cima
        this.vai = +1;
      }
      else if((perigo < 3 * this.batalha && this.modulo < this.w * 5) || perigo >= 3 * this.batalha){ // Foge
        this.vai = -1;
      }
      else{ // Mantém
        this.vai = 0;
      }
    }
    // Procura
    else{
      //Sorteia uma distância e ângulo
      this.tiro = 0;
      this.angulo = -Math.PI/4 + (this.team)*Math.PI;
      this.rot = this.angulo;
      this.vai = 1;
    }
  }
}
