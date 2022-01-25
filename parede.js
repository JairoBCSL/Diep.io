class Parede{
  constructor(vertices){
    this.vertices = vertices; this.dentro;
  }
  isDentro(ponto){
    this.dentro = true;
    let d, a;
    for(let i = 0; i < this.vertices.length-1; i++){
      d = Math.atan2(ponto.y-this.vertices[i].y, ponto.x-this.vertices[i].x);
      a = Math.atan2(this.vertices[i+1].y-this.vertices[i].y, this.vertices[i+1].x-this.vertices[i].x);
      if((a-d) > 0 && (a-d) < Math.PI || (a-d) < -Math.PI && (a-d) > -2*Math.PI){
        this.dentro = this.dentro && true;
      }else{
        this.dentro = false;
      }
    }
    return this.dentro;
  }
  draw(){
    var ctx = game.canvas.getContext("2d");
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.vertices[this.vertices.length-1].x, this.vertices[this.vertices.length-1].y);
    for(let i = 0; i < this.vertices.length; i++)
      ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    ctx.strokeStyle = "#000f";
    ctx.stroke();
    ctx.restore();
  }
}
