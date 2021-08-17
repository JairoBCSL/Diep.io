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
    ctx.drawImage(this.sprite, this.classe * this.wSRC, naves[0].team * this.hSRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
  }
}
