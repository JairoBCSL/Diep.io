class Map{
  constructor(layers, cols, rows, tSize,colsImage){
    this.layers = layers; // Dizer qual eh a camada que o jogador eh desenhado
    this.cols = cols;
    this.rows = rows;
    this.tSize = tSize;
    this.colsImage = colsImage;
  }
  getTile(k, col, row){
    return this.layers[k].data[row * this.cols + col];
  }
  getTileX(index){
    index = index % 536870912;
    return (index - 1) % this.colsImage;
  }
  getTileY(index){
    index = index % 536870912;
    return ((index - 1) / this.colsImage) | 0;
  }
}
