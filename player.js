class Player extends Nave{
  controle(){
    this.vai = 0;
    this.tiroX = (game.mouseX + cam.x);
    this.tiroY = (game.mouseY + cam.y);
    if(this.classe != 17 && this.classe != 29)
      this.rot = Math.atan2(this.tiroY - (this.y + this.h / 2), this.tiroX - (this.x + this.w / 2));
    if(this.left || this.right || this.up || this.down){
      this.angulo = Math.atan2(this.down - this.up, this.right - this.left);
      this.vai = 1;
    }

  }
}
