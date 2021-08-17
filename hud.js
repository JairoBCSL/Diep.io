class Hud{
  constructor(){
    this.stats = [];
    this.botoesStats = [];
    this.botoesClasses = [];
    this.msgs = ["Health Regen", "Health", "Body Damage", "Bullet Speed", "Bullet Penetration", "Bullet Damage", "Reload", "Speed"];
    this.colors = ["#80ff", "#a84f", "#f80f", "#0f0f", "#ff0f", "#f00f", "#0fff", "#f08f"];
    for(let i = 0; i < 8; i++)
      this.stats.push(new Stat(i, this.msgs[i], this.colors[i]));
    for(let i = 0; i < 8; i++)
      this.botoesStats.push(new BotaoStats(i, this.colors[i]));
    for(let i = 0; i < 21; i++)
      this.botoesClasses.push(new BotaoClasses("classes.png", i));
    this.click = 1;
  }
  clicked(){
    if(naves[0].pt){
      for(let i = 0; i < this.botoesStats.length; i++){
        if(collisionSQ({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, this.botoesStats[i])){
          this.botoesStats[i].add();
        }
      }
    }
    if(naves[0].ptClasse){
      for(let i = 0; i < this.botoesClasses.length; i++){
        if(collisionSQ({x:game.mouseX+cam.x,y:game.mouseY+cam.y,w:1,h:1}, this.botoesClasses[i])){
          console.log("Classe: "+i);
          naves[0].changeClass(i);
          naves[0].updateStats();
        }
      }
    }
  }
  draw(){
    this.x = cam.x; this.y = cam.y + cam.h * 0.7; this.w = cam.w * 0.2; this.h = cam.h * 0.3;
    var ctx = game.canvas.getContext("2d");
    for(let botao of this.botoesStats){
      botao.x = -9000; botao.y = -9000;
    }
    if(naves[0].pt){ //Pontos
      this.drawStats();
    }
    for(let botao of this.botoesClasses){
      botao.x = -9000; botao.y = -9000;
    }
    if(naves[0].ptClasse){ //Classe
      this.drawClass();
    }
    if(naves[0].lv < 45){ //Exp
      ctx.fillStyle = "#888f";
      ctx.fillRect(cam.x + cam.w * 0.25, cam.y + cam.h - cam.h / 24, cam.w * 0.5, cam.h / 64);
      ctx.fillStyle = "#fffa";
      ctx.fillRect(cam.x + cam.w * 0.25, cam.y + cam.h - cam.h / 24, cam.w * 0.5 * naves[0].exp / naves[0].nextLv , cam.h / 64);
    }
  }
  drawStats(){
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = "#888a";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "#000f";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    for(let stat of this.stats)
      stat.draw()
    for(let botao of this.botoesStats)
      botao.draw();
  }
  drawClass(){
    var ctx = game.canvas.getContext("2d");
    var nClasses = [];
    for(let i = 0; i < classes[0].length; i++)
      if(naves[0].ptClasse >= classes[naves[0].classe][i])
        nClasses.push(i);
    ctx.fillStyle = "#888a";
    ctx.fillRect(cam.x, cam.y, (nClasses.length>1)?256:128, Math.ceil(nClasses.length/2)*128);
    ctx.strokeStyle = "#000f";
    ctx.fillRect(cam.x, cam.y, (nClasses.length>1)?256:128, Math.ceil(nClasses.length/2)*128);
    for(let i = 0; i < nClasses.length; i++){
      let x = (i % 2) * 128; let y = Math.floor(i / 2) * 128;
      this.botoesClasses[nClasses[i]].draw(cam.x + x, cam.y + y);
    }
  }
}
