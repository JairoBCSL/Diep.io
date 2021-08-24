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
    for(let i = 0; i < classes[0].length; i++)
      this.botoesClasses.push(new BotaoClasses(i));
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
    this.drawMinimap();
  }
  drawStats(){
    var ctx = game.canvas.getContext("2d");
    ctx.fillStyle = "#888a";
    ctx.fillRect(cam.x, cam.y + cam.h * 0.7, cam.w * 0.2, cam.h * 0.3);
    ctx.strokeStyle = "#000f";
    ctx.strokeRect(cam.x, cam.y + cam.h * 0.7, cam.w * 0.2, cam.h * 0.3);
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
  drawMinimap(){
    var ctx = game.canvas.getContext("2d");
    let x = cam.x + cam.w * 0.775, y = cam.y + cam.h * 0.775;
    let w = cam.w * 0.2, h = cam.h * 0.2;
    ctx.fillStyle = "#888a";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#000f";
    ctx.strokeRect(x, y, w, h);
    ctx.strokeStyle = "#0008";
    ctx.strokeRect(x+0.1*w, y+0.1*h, w*0.8, h*0.8);
    ctx.fillStyle = "#000a";
    x = x + naves[meuID].x / game.width * w; w = w / 30;
    y = y + naves[meuID].y / game.height * h; h = h / 20;
    ctx.translate(+ x + w / 2, + y + h / 2);
    ctx.rotate(naves[meuID].rot);
    ctx.translate(- x - w / 2, - y - h / 2);
    ctx.drawImage(imagens.balas, 512, 128 * naves[meuID].team, 128, 120, x, y, w, h);
  }
}
