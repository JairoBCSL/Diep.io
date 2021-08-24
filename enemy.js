class Enemy extends Nave{
  controle(){
    let pertos = 0, maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let perigo = 0, amigoDist;
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
    if(pertos || true){
      // Ataca
      this.rot = Math.atan2(naves[maisPerto].y+naves[maisPerto].h/2 - this.y - this.h/2, naves[maisPerto].x+naves[maisPerto].w-this.x-this.w);
      this.tiro = 1;
      let modulo = Math.sqrt( Math.pow(this.x+this.w-naves[maisPerto].x-naves[maisPerto].w, 2) + Math.pow(this.y+this.h-naves[maisPerto].y-naves[maisPerto].h, 2) );
      let angulo = Math.atan2(this.y+this.h-naves[maisPerto].y-naves[maisPerto].h, naves[maisPerto].x+naves[maisPerto].w-this.x-this.w);
      let vai; perigo = -9;
      if(perigo >= 3 * this.batalha)
        vai = -1;
      else if(perigo < 3 * this.batalha && modulo > this.w * 5)
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
