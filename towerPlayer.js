class TowerPlayer extends Tower{
  controle(){
    if(this.tiro){
      this.tiroX = (game.mouseX + cam.x);
      this.tiroY = (game.mouseY + cam.y);
      this.rot = Math.atan2(this.tiroY - (this.y + this.h / 2), this.tiroX - (this.x + this.w / 2));
    }else{
      //this.rot += 0.00125;
    }

  }
}
