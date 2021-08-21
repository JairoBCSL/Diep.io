class Player extends Nave{
  controle(){
    let pertos = [], maisPerto = -1, maisPertoDist = 1000000, atualDist;
    let amigoDist, perigo = 0;
    for(let nave of naves){ // Procurando inimigo
      if(nave.team != this.team){
        atualDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(atualDist < 960)
          perigo += nave.batalha;
        if(atualDist < maisPertoDist){
          maisPertoDist = atualDist;
          maisPerto = naves.indexOf(nave);
        }
      }else{
        amigoDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
        if(amigoDist < 960)
          perigo -= nave.batalha;
      }
    }
  }
  aim(){
    if(this.classe == 17 || this.classe == 29){ // Autos
        
    }else{
      let difX = (game.mouseX + cam.x) - (this.x + this.w / 2);
      let difY = (game.mouseY + cam.y) - (this.y + this.h / 2);
      this.rot = Math.atan2(difY, difX);
    }
  }
}
