class Stat{
  constructor(id, msg, color){
    this.id = id; this.msg = msg; this.color = color;
    this.x = 0; this.y = 0; this.w = 0; this.h = 0;
  }
  update(){
    this.x = hud.x + hud.h / 32;
    this.y = hud.y + hud.h / 8 * this.id + hud.h / 32;
    this.w = hud.w * 25 / 32; this.h = hud.h / 16;
  }
  draw(){
    this.update();
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "#fffc";
    ctx.fillRect(this.x, this.y, this.w * (naves[0].ptStats[hud.stats.indexOf(this)]) / 7, this.h);
    ctx.font = "22px Arial";
    ctx.fillStyle = "#000f";
    ctx.fillText(this.msg, this.x, this.y + 16);
  }
}
