class BotaoStats{
  constructor(id, color){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.id = id;
    this.stat = 0; this.color = color; this.msg = " + ";
  }
  add(){
    if(naves[0].ptStats[this.id] < 7){
      naves[0].ptStats[this.id]++;
      naves[0].pt--;
      naves[0].updateStats();
    }
  }
  update(){
    this.x = hud.x + hud.h * 25 / 32;
    this.y = hud.y + hud.h / 8 * this.id + hud.h / 32;
    this.w = hud.w * 3 / 32; this.h = hud.h / 16;
  }
  draw(){
    this.update();
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.font = "22px Arial";
    ctx.fillStyle = "#000f";
    ctx.fillText(this.msg, this.x, this.y + 17);
  }
}
