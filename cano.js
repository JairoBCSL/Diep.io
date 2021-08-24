class Cano{
  constructor(n,classe,team,id){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.n = n;
    this.xSRC = 0; this.ySRC = 0; this.wSRC = 0; this.hSRC = 0;
    this.classe = classe; this.team = team; this.id = id; this.rot = 0;
    this.foguetes = 0; this.autos = 0; this.trappers = 0; this.overseers = 0;
    if(classe == 20 || classe == 21)
      this.foguetes = 1;
    else if(classe == 13 || (classe == 18 && n) || classe == 31 || classe == 32 || classe == 34 || (classe == 35 && n > 0) || classe == 36 || (classe == 49 && n == 1) || classe == 60 || classe == 64)
      this.overseers = 1;
    else if(classe == 17 || (classe == 22 && n == 4) || classe == 29 || (classe == 43 && n > 0))
      this.autos = 1;
    else if(classe == 15 || (classe == 23 && n == 2) || classe == 35 || classe == 42 || (classe == 43 && n == 0) || classe == 44 || classe == 63)
      this.trappers = 1;
  }
  update(){
    switch(this.classe){
      case 0:{ // Normal
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
        this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        break;
      }
      case 1:{ // Machine Gun
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break;
      }
      case 2:{ // Twin
        this.x = naves[this.id].x + naves[this.id].w * 20 / 128 - naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot)*(2*this.n-1) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 73 / 256 + naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot)*(2*this.n-1) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        break;
      }
      case 3:{ // Sniper
        this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 98 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 98 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 219; this.ySRC = 0; this.wSRC = 80; this.hSRC = 56;
        break;
      }
      case 4:{ // Flank
        this.x = naves[this.id].x + naves[this.id].w * (32 + 8 * this.n) / 128 + naves[this.id].w * (88 - 8 * this.n) / 128 * Math.cos(naves[this.id].rot + Math.PI * this.n);
        this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * (88 - 8 * this.n) / 128 * Math.sin(naves[this.id].rot + Math.PI * this.n);
        this.w = naves[this.id].w * (64 - 16 * this.n) / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI * this.n;
        this.xSRC = 300 * this.n; this.ySRC = 0; this.wSRC = 64 - 16 * this.n; this.hSRC = 64;
        break;
      }
      case 5:{ // Smasher
        this.x = naves[this.id].x + naves[this.id].w * -1 / 128 + naves[this.id].w * 0 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * -11 / 128 + naves[this.id].w * 0 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 130 / 128, this.h = naves[this.id].h * 150 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
        break;
      }
      case 6:{ // Destroyer
        this.x = naves[this.id].x + naves[this.id].w * 28 / 128 + naves[this.id].w * 84 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 84 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 72 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
        break;
      }
      case 7:{ // Gunner
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 49 / 256 + naves[this.id].w * 65 / 128 * Math.cos(naves[this.id].rot) + naves[this.id].w * -45/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 98 / 256 + naves[this.id].w * 65 / 128 * Math.sin(naves[this.id].rot) - naves[this.id].w * -45/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 78 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 12 / 128 + naves[this.id].w * 155 / 256 * Math.cos(naves[this.id].rot) + naves[this.id].w * 15/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * 155 / 256 * Math.sin(naves[this.id].rot) - naves[this.id].w * 15/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 103 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
        }else if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 12 / 128 + naves[this.id].w * 155 / 256 * Math.cos(naves[this.id].rot) + naves[this.id].w * -15/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * 155 / 256 * Math.sin(naves[this.id].rot) - naves[this.id].w * -15/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 103 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 49 / 256 + naves[this.id].w * 65 / 128 * Math.cos(naves[this.id].rot) + naves[this.id].w * +45/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 98 / 256 + naves[this.id].w * 65 / 128 * Math.sin(naves[this.id].rot) - naves[this.id].w * +45/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 78 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
        }
        break;
      }
      case 8:{ // Rifle
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 98 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 98 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 219; this.ySRC = 0; this.wSRC = 80; this.hSRC = 56;
        }
        break;
      }
      case 9:{ // Triple Shot
        if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot + Math.PI / 4);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot + Math.PI / 4);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot  + Math.PI / 4;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot - Math.PI / 4);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot - Math.PI / 4);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI / 4;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        }
        break;
      }
      case 10:{ // Quad Tank
        if(this.n == 3){
          this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 96 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 96 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        }
        else if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 96 / 128 * Math.cos(naves[this.id].rot + Math.PI / 2);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 96 / 128 * Math.sin(naves[this.id].rot + Math.PI / 2);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI / 2;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 96 / 128 * Math.cos(naves[this.id].rot + Math.PI);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 96 / 128 * Math.sin(naves[this.id].rot + Math.PI);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot  + Math.PI;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 96 / 128 * Math.cos(naves[this.id].rot - Math.PI / 2);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 96 / 128 * Math.sin(naves[this.id].rot - Math.PI / 2);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI / 2;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        }
        break;
      }
      case 11:{ // Twin Flank
        let angulo = Math.PI * Math.floor(this.n / 2);
        if(this.n % 2 == 0){
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 + naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 - naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 - naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 + naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }
        break;
      }
      case 12:{ // Stalker
        this.x = naves[this.id].x + naves[this.id].w * 6 / 128 + naves[this.id].w * 116 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 116 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 116 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 738; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
        break;
      }
      case 13:{ // Overseer
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break;
      }
      case 14:{ // Hunter
        if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 28 / 128 + naves[this.id].w * 84 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 84 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 72 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
        }else{
          this.x = naves[this.id].x + naves[this.id].w / 4 + naves[this.id].w * 103 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h / 4 + naves[this.id].w * 103 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }
        break;
      }
      case 15:{ // Trapper
        this.x = naves[this.id].x + naves[this.id].w * 39 / 128 + naves[this.id].w * 72 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 72 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 50 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        break;
      }
      case 16:{ // Tri-Angle
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 64 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot + Math.PI * 5 / 6);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot + Math.PI * 5 / 6);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI * 5 / 6;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot - Math.PI * 5 / 6);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot - Math.PI * 5 / 6);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI * 5 / 6;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }
        break;
      }
      case 17:{ // Auto 3
        this.x = naves[this.id].x + naves[this.id].w * 19 / 128 + naves[this.id].w * 64 / 128 * Math.cos(naves[this.id].rot + Math.PI * 2 / 3 * this.n);
        this.y = naves[this.id].y + naves[this.id].h * 19 / 128 + naves[this.id].w * 64 / 128 * Math.sin(naves[this.id].rot + Math.PI * 2 / 3 * this.n);
        this.w = naves[this.id].w * 90 / 128; this.h = naves[this.id].h * 90 / 128; this.rot = naves[this.id].rot + Math.PI * 2 / 3 * this.n;
        this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
        if(naves[this.id].tiro){
          let angulo = Math.atan2(game.mouseY + cam.y - this.y - this.h / 2, game.mouseX + cam.x - this.x - this.w / 2);
          if(Math.abs(angulo-this.rot) < Math.PI / 2 || Math.abs(angulo-this.rot) > Math.PI * 3 / 2){
            this.rot = angulo;
          }
        }
        break;
      }
      case 18:{ // Hybrid
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 28 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 72 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot + Math.PI);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot + Math.PI);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + Math.PI;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        }
        break
      }
      case 19:{ // Annihilator
        this.x = naves[this.id].x + naves[this.id].w * 26 / 128 + naves[this.id].w * 71 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 8 / 128 + naves[this.id].w * 71 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 76 / 128, this.h = naves[this.id].h * 112 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 906; this.ySRC = 0; this.wSRC = 76; this.hSRC = 112;
        break
      }
      case 20:{ // Skimmer
        if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 98 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 98 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 28 / 128 + naves[this.id].w * 84 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 84 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 72 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
        }
        break
      }
      case 21:{ // Rocketeer
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + Math.PI;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 43 / 128 + naves[this.id].w * 104 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 26 / 128 + naves[this.id].w * 104 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 42 / 128, this.h = naves[this.id].h * 76 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 983; this.ySRC = 0; this.wSRC = 42; this.hSRC = 76;
        }
        break
      }
      case 22:{ // Auto Gunner
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 49 / 256 + naves[this.id].w * 65 / 128 * Math.cos(naves[this.id].rot) + naves[this.id].w * -45/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 98 / 256 + naves[this.id].w * 65 / 128 * Math.sin(naves[this.id].rot) - naves[this.id].w * -45/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 78 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 12 / 128 + naves[this.id].w * 155 / 256 * Math.cos(naves[this.id].rot) + naves[this.id].w * 15/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * 155 / 256 * Math.sin(naves[this.id].rot) - naves[this.id].w * 15/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 103 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
        }else if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 12 / 128 + naves[this.id].w * 155 / 256 * Math.cos(naves[this.id].rot) - naves[this.id].w * 15/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * 155 / 256 * Math.sin(naves[this.id].rot) + naves[this.id].w * 15/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 103 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
        }else if(this.n == 3){
          this.x = naves[this.id].x + naves[this.id].w * 49 / 256 + naves[this.id].w * 65 / 128 * Math.cos(naves[this.id].rot) - naves[this.id].w * -45/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 98 / 256 + naves[this.id].w * 65 / 128 * Math.sin(naves[this.id].rot) + naves[this.id].w * -45/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 78 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 38 / 256;
          this.y = naves[this.id].y + naves[this.id].h * 38 / 256;
          this.w = naves[this.id].w * 90 / 128; this.h = naves[this.id].h * 90 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
          if(naves[this.id].tiro){
            let angulo = Math.atan2(game.mouseY + cam.y - this.y - this.h / 2, game.mouseX + cam.x - this.x - this.w / 2);
            if(Math.abs(angulo-this.rot) < Math.PI / 2 || Math.abs(angulo-this.rot) > Math.PI * 3 / 2){
              this.rot = angulo;
            }
          }
        }
        break; // 4 * 60 / 15 = 16
      }
      case 23:{ // Gunner Trapper
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 12 / 128 + naves[this.id].w * 155 / 256 * Math.cos(naves[this.id].rot) + naves[this.id].w * 20/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * 155 / 256 * Math.sin(naves[this.id].rot) - naves[this.id].w * 20/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 103 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 12 / 128 + naves[this.id].w * 155 / 256 * Math.cos(naves[this.id].rot) - naves[this.id].w * 20/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * 155 / 256 * Math.sin(naves[this.id].rot) + naves[this.id].w * 20/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 103 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 39 / 128 + naves[this.id].w * 85 / 128 * Math.cos(naves[this.id].rot + Math.PI);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 85 / 128 * Math.sin(naves[this.id].rot + Math.PI);
          this.w = naves[this.id].w * 50 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + Math.PI;
          this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        }
        break;
      }
      case 24:{ // Streamer
        this.x = naves[this.id].x + naves[this.id].w * 6 / 128 + naves[this.id].w * 116 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 116 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 116 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 1116; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
        break;
      }
      case 25:{ // Triplet
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 256 + naves[this.id].w * 102 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 72 / 256 + naves[this.id].w * 102 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 56;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 256 + naves[this.id].w * 75 / 128 * Math.cos(naves[this.id].rot) + naves[this.id].w * -29/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 72 / 256 + naves[this.id].w * 75 / 128 * Math.sin(naves[this.id].rot) - naves[this.id].w * -29/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 56;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 40 / 256 + naves[this.id].w * 75 / 128 * Math.cos(naves[this.id].rot) + naves[this.id].w * 29/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 72 / 256 + naves[this.id].w * 75 / 128 * Math.sin(naves[this.id].rot) - naves[this.id].w * 29/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 56;
        }
        break;
      }
      case 26:{ // PentaShot
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * (88 - 16 * Math.abs(this.n-2)) / 128 * Math.cos(naves[this.id].rot - Math.PI / 4 + Math.PI / 8 * this.n);
        this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * (88 - 16 * Math.abs(this.n-2)) / 128 * Math.sin(naves[this.id].rot - Math.PI / 4 + Math.PI / 8 * this.n);
        this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI / 4 + Math.PI / 8 * this.n;
        this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        break;
      }
      case 27:{ // SpreadShot
        this.x = naves[this.id].x + naves[this.id].w * 25 / 128 + naves[this.id].w * (81 - 8 * Math.abs(this.n-5)) / 128 * Math.cos(naves[this.id].rot - Math.PI * 4 / 9 + Math.PI * 4 / 45 * this.n);
        this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * (81 - 8 * Math.abs(this.n-5)) / 128 * Math.sin(naves[this.id].rot - Math.PI * 4 / 9 + Math.PI * 4 / 45 * this.n);
        this.w = naves[this.id].w * 78 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot - Math.PI * 4 / 9 + Math.PI * 4 / 45 * this.n;
        this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
        break;
      }
      case 28:{ // Octa Tank
        this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 96 / 128 * Math.cos(naves[this.id].rot + Math.PI / 4 * this.n);
        this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 96 / 128 * Math.sin(naves[this.id].rot + Math.PI / 4 * this.n);
        this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI / 4 * this.n;
        this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
        break;
      }
      case 29:{ // Auto 5
        this.x = naves[this.id].x + naves[this.id].w * 19 / 128 + naves[this.id].w * 64 / 128 * Math.cos(naves[this.id].rot + Math.PI * 2 / 5 * this.n);
        this.y = naves[this.id].y + naves[this.id].h * 19 / 128 + naves[this.id].w * 64 / 128 * Math.sin(naves[this.id].rot + Math.PI * 2 / 5 * this.n);
        this.w = naves[this.id].w * 90 / 128; this.h = naves[this.id].h * 90 / 128; this.rot = naves[this.id].rot + Math.PI * 2 / 5 * this.n;
        this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
        if(naves[this.id].tiro){
          let angulo = Math.atan2(game.mouseY + cam.y - this.y - this.h / 2, game.mouseX + cam.x - this.x - this.w / 2);
          if(Math.abs(angulo-this.rot) < Math.PI / 2 || Math.abs(angulo-this.rot) > Math.PI * 3 / 2){
            this.rot = angulo;
          }
        }
        break;
      }
      case 30:{ // Triple Flank
        let angulo = Math.PI * 2 / 3 * Math.floor(this.n / 2);
        if(this.n % 2 == 0){
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 + naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 - naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 - naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 + naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot + angulo) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }
        break;
      }
      case 31:{ // Battleship
        let angulo = Math.PI / 2 + Math.PI * Math.floor(this.n / 2);
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 64 / 128 * Math.cos(naves[this.id].rot + angulo) + (1-2*(this.n%2)) * naves[this.id].w * 49/256 * Math.sin(naves[this.id].rot + angulo);
        this.y = naves[this.id].y + naves[this.id].h * 64 / 256 + naves[this.id].w * 64 / 128 * Math.sin(naves[this.id].rot + angulo) - (1-2*(this.n%2)) * naves[this.id].w * 49/256 * Math.cos(naves[this.id].rot + angulo);
        this.w = naves[this.id].w * 64 / 128, this.h = naves[this.id].h * 64 / 128; this.rot = naves[this.id].rot + angulo;
        this.xSRC = 1234; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        break;
      }
      case 32:{ // Overlord
        let angulo = naves[this.id].rot + Math.PI * this.n / 2;
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(angulo);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(angulo);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = angulo;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break;
      }
      case 33:{ // Necromancer
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break;
      }
      case 34:{ // Manager
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break;
      }
      case 35:{ // Overtrapper
        let angulo = Math.PI * 2 / 3 * this.n;
        if(this.n > 0){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 39 / 128 + naves[this.id].w * 85 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 85 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w * 50 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        }
        break;
      }
      case 36:{ // Factory
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break;
      }
      case 37:{ // Assassin
        this.x = naves[this.id].x + naves[this.id].w * 6 / 128 + naves[this.id].w * 109 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 24 / 128 + naves[this.id].w * 109 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 116 / 128, this.h = naves[this.id].h * 80 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 1299; this.ySRC = 0; this.wSRC = 116; this.hSRC = 80;
        break;
      }
      case 38:{ // Watcher
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 39 / 128 + naves[this.id].w * 105 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 105 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 50 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }
        break;
      }
      case 39:{ // Predator
        if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 28 / 128 + naves[this.id].w * 83 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 83 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 72 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w / 4 + naves[this.id].w * 102 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h / 4 + naves[this.id].w * 102 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 6 / 128 + naves[this.id].w * 90 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 90 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 116 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 738; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
        }
        break;
      }
      case 40:{ // Charger
        if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 28 / 128 + naves[this.id].w * 83 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 83 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 72 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 25 / 128 + naves[this.id].w * 104 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 104 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 78 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 1416; this.ySRC = 0; this.wSRC = 78; this.hSRC = 88;
        }
        break;
      }
      case 41:{ // Ranger
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 6 / 128 + naves[this.id].w * 116 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 116 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 116 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 738; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 47 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 24 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 34 / 128, this.h = naves[this.id].h * 80 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 1495; this.ySRC = 0; this.wSRC = 34; this.hSRC = 80;
        }
        break;
      }
      case 42:{ // Tri-Trapper
        let angulo = Math.PI * this.n * 2 / 3;
        this.x = naves[this.id].x + naves[this.id].w * 39 / 128 + naves[this.id].w * 72 / 128 * Math.cos(naves[this.id].rot + angulo);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 72 / 128 * Math.sin(naves[this.id].rot + angulo);
        this.w = naves[this.id].w * 50 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + angulo;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        break;
      }
      case 43:{ // Auto Trapper
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 39 / 128 + naves[this.id].w * 72 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 72 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 50 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 38 / 256 + naves[this.id].w * 16 / 128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 38 / 256 - naves[this.id].w * 16 / 128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 90 / 128; this.h = naves[this.id].h * 90 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
          if(naves[this.id].tiro){
            let angulo = Math.atan2(game.mouseY + cam.y - this.y - this.h / 2, game.mouseX + cam.x - this.x - this.w / 2);
            if(Math.abs(angulo-this.rot) < Math.PI / 2 || Math.abs(angulo-this.rot) > Math.PI * 3 / 2){
              this.rot = angulo;
            }
          }
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 38 / 256 - naves[this.id].w * 16 / 128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 38 / 256 + naves[this.id].w * 16 / 128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 90 / 128; this.h = naves[this.id].h * 90 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
          if(naves[this.id].tiro){
            let angulo = Math.atan2(game.mouseY + cam.y - this.y - this.h / 2, game.mouseX + cam.x - this.x - this.w / 2);
            if(Math.abs(angulo-this.rot) < Math.PI / 2 || Math.abs(angulo-this.rot) > Math.PI * 3 / 2){
              this.rot = angulo;
            }
          }
        }
        break;
      }
      case 44:{ // Big Trapper
        this.x = naves[this.id].x + naves[this.id].w * 26 / 128 + naves[this.id].w * 72 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * -2 / 128 + naves[this.id].w * 72 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 75 / 128, this.h = naves[this.id].h * 132 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 1530; this.ySRC = 0; this.wSRC = 75; this.hSRC = 132;
        break;
      }
      case 45:{ // Grinder
        this.x = naves[this.id].x + naves[this.id].w * -21 / 128 + naves[this.id].w * 0 / 128 * Math.cos(naves[this.id].rot * (1 - 2 * this.n));
        this.y = naves[this.id].y + naves[this.id].h * -21 / 128 + naves[this.id].w * 0 / 128 * Math.sin(naves[this.id].rot * (1 - 2 * this.n));
        this.w = naves[this.id].w * 170 / 128, this.h = naves[this.id].h * 170 / 128; this.rot = naves[this.id].rot * (1 - 2 * this.n);
        this.xSRC = 1606; this.ySRC = 0; this.wSRC = 170; this.hSRC = 170;
        break;
      }
      case 46:{ // Auto Smasher
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * -1 / 128 + naves[this.id].w * 0 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * -11 / 128 + naves[this.id].w * 0 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 130 / 128, this.h = naves[this.id].h * 150 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 38 / 256;
          this.y = naves[this.id].y + naves[this.id].h * 38 / 256;
          this.w = naves[this.id].w * 90 / 128; this.h = naves[this.id].h * 90 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 1026; this.ySRC = 0; this.wSRC = 90; this.hSRC = 90;
          if(naves[this.id].tiro){
            let angulo = Math.atan2(game.mouseY + cam.y - this.y - this.h / 2, game.mouseX + cam.x - this.x - this.w / 2);
            if(Math.abs(angulo-this.rot) < Math.PI / 2 || Math.abs(angulo-this.rot) > Math.PI * 3 / 2){
              this.rot = angulo;
            }
          }
        }
        break;
      }
      case 47:{ // Landmine
        this.x = naves[this.id].x + naves[this.id].w * -21 / 128 + naves[this.id].w * 0 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * -21 / 128 + naves[this.id].w * 0 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 170 / 128, this.h = naves[this.id].h * 170 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 1778; this.ySRC = 0; this.wSRC = 170; this.hSRC = 170;
        break;
      }
      case 48:{ // Shield Smasher
        this.x = naves[this.id].x + naves[this.id].w * -1 / 128 + naves[this.id].w * 0 / 128 * Math.cos(naves[this.id].rot + Math.PI / 6 * this.n);
        this.y = naves[this.id].y + naves[this.id].h * -11 / 128 + naves[this.id].w * 0 / 128 * Math.sin(naves[this.id].rot + Math.PI / 6 * this.n);
        this.w = naves[this.id].w * 130 / 128, this.h = naves[this.id].h * 150 / 128; this.rot = naves[this.id].rot + Math.PI / 6 * this.n;
        this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
        break;
      }
      case 49:{ // Oversmasher
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * -1 / 128 + naves[this.id].w * 0 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * -11 / 128 + naves[this.id].w * 0 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 130 / 128, this.h = naves[this.id].h * 150 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot + Math.PI);
          this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot + Math.PI);
          this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + Math.PI;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        }
        break;
      }
      case 50:{ // Booster
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 64 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 60 / 128 * Math.cos(naves[this.id].rot + Math.PI * 2 / 3);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 60 / 128 * Math.sin(naves[this.id].rot + Math.PI * 2 / 3);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI * 2 / 3;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }else if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 60 / 128 * Math.cos(naves[this.id].rot - Math.PI * 2 / 3);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 60 / 128 * Math.sin(naves[this.id].rot - Math.PI * 2 / 3);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI * 2 / 3;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }else if(this.n == 3){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot + Math.PI * 5 / 6);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot + Math.PI * 5 / 6);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI * 5 / 6;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot - Math.PI * 5 / 6);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot - Math.PI * 5 / 6);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI * 5 / 6;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }
        break;
      }
      case 51:{ // Warrior
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 64 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot + Math.PI * 5 / 6);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot + Math.PI * 5 / 6);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI * 5 / 6;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }else if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot - Math.PI * 5 / 6);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot - Math.PI * 5 / 6);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI * 5 / 6;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }else if(this.n == 3){
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot + Math.PI / 2);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot + Math.PI / 2);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot + Math.PI / 2;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot - Math.PI / 2);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot - Math.PI / 2);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot - Math.PI / 2;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }
        break;
      }
      case 60:{ // Mothership
        this.x = naves[this.id].x + naves[this.id].w * 56 / 128 + naves[this.id].w * 70 / 128 * Math.cos(naves[this.id].rot + Math.PI / 8 * this.n);
        this.y = naves[this.id].y + naves[this.id].h * 56 / 128 + naves[this.id].w * 70 / 128 * Math.sin(naves[this.id].rot + Math.PI / 8 * this.n);
        this.w = naves[this.id].w * 16 / 128, this.h = naves[this.id].h * 16 / 128; this.rot = naves[this.id].rot + Math.PI / 8 * this.n;
        this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        break;
      }
      case 61:{ // Rifle Tower
        if(this.n == 0){ // Base
          this.x = naves[this.id].x + naves[this.id].w * 47 / 128 + naves[this.id].w * 68 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 24 / 128 + naves[this.id].w * 68 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 34 / 128, this.h = naves[this.id].h * 80 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 1495; this.ySRC = 0; this.wSRC = 34; this.hSRC = 80;
        }else if(this.n == 1){ // Fora
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 83 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 31 / 128 + naves[this.id].w * 83 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h * 66 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        }else{ // Dentro
          this.x = naves[this.id].x + naves[this.id].w * 24 / 128 + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 80 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 219; this.ySRC = 0; this.wSRC = 80; this.hSRC = 56;
        }
        break;
      }
      case 62:{ // 16 Shot Tower
        let angulo = Math.PI * this.n * 2 / 16;
        if(this.n < 16){
          this.x = naves[this.id].x + naves[this.id].w * 54 / 128 + naves[this.id].w * 73 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 59 / 128 + naves[this.id].w * 73 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w * 20 / 128, this.h = naves[this.id].h * 14 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 219; this.ySRC = 0; this.wSRC = 80; this.hSRC = 56;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 56 / 128 + naves[this.id].w * 69 / 128 * Math.cos(naves[this.id].rot + angulo);
          this.y = naves[this.id].y + naves[this.id].h * 55 / 128 + naves[this.id].w * 69 / 128 * Math.sin(naves[this.id].rot + angulo);
          this.w = naves[this.id].w * 16 / 128, this.h = naves[this.id].h * 22 / 128; this.rot = naves[this.id].rot + angulo;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        }
        break;
      }
      case 63:{ // Trapper Tower
        let angulo = Math.PI * this.n * 2 / 12;
        this.x = naves[this.id].x + naves[this.id].w * 103 / 256 + naves[this.id].w * 139 / 256 * Math.cos(naves[this.id].rot + angulo);
        this.y = naves[this.id].y + naves[this.id].h * 42 / 128 + naves[this.id].w * 139 / 256 * Math.sin(naves[this.id].rot + angulo);
        this.w = naves[this.id].w * 25 / 128, this.h = naves[this.id].h * 44 / 128; this.rot = naves[this.id].rot + angulo;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        break;
      }
      case 64:{ // Summoner Tower x += (64 - w) y += (64 - h)
        let angulo = naves[this.id].rot + Math.PI * this.n / 4;
        this.x = naves[this.id].x + naves[this.id].w * 48 / 128 + naves[this.id].w * 68 / 128 * Math.cos(angulo);
        this.y = naves[this.id].y + naves[this.id].h * 42 / 128 + naves[this.id].w * 68 / 128 * Math.sin(angulo);
        this.w = naves[this.id].w * 32 / 128, this.h = naves[this.id].h * 44 / 128; this.rot = angulo;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break;
      }
    }
  }
  shoot(){
    let x = (this.w>this.h)?(this.x+this.w/2-this.h/2):(this.x+this.h/2-this.w/2);
    let y = (this.w>this.h)?(this.y+this.w/2-this.h/2):(this.y+this.h/2-this.w/2);
    let w = (this.w>this.h)?this.h:this.w;
    let h = (this.w>this.h)?this.h:this.w;
    if(this.overseers){
      drones.push(new Drone(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, this.team, this.classe, this.id));
    }
    else if(this.autos){
      let angulo;
      if(naves[this.id].tiro){ // Mirando
        angulo = Math.atan2(game.mouseY + cam.y - this.y - this.h / 2, game.mouseX + cam.x - this.x - this.w / 2);
      }
      else{ // Auto
        let atualDist, maisPertoDist = 9999999, maisPerto;
        for(let nave of naves){ // Procurando inimigo
          if(nave.team != this.team){
            atualDist = Math.sqrt(Math.pow(nave.x+nave.w/2-this.x-this.w/2, 2) + Math.pow(nave.y+nave.h/2-this.y-this.h/2, 2));
            if(atualDist < maisPertoDist){
              maisPertoDist = atualDist;
              maisPerto = naves.indexOf(nave);
            }
          }
        }
        if(maisPertoDist < naves[this.id].w * 7){
          angulo = Math.atan2(this.y + this.h / 2 - naves[maisPerto].y - cam.y, naves[maisPerto].x + cam.x - this.x - this.w / 2);
        }
      }
      if(Math.abs(angulo-this.rot) < Math.PI / 2 || Math.abs(angulo-this.rot) > Math.PI * 3 / 2){
        balas.push(new Bala(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, angulo, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
        //naves[this.id].spd += this.rot;
      }
    }
    else if(this.trappers){
      balas.push(new Bala(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen*4, naves[this.id].bulletDmg, this.team, this.classe, this.id, this.n));
    }
    //Resto
    else{
      if(this.classe == 37 && this.n == 1)
        balas.push(new Bala(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen / 20, naves[this.id].bulletDmg * 100, naves[this.id].team, naves[this.id].classe, this.id, this.n));
      else if(this.classe == 40 && this.n == 0)
        balas.push(new Bala(x, y, naves[this.id].bulletSize*2, naves[this.id].bulletSize*2, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg*4, naves[this.id].team, naves[this.id].classe, this.id, this.n));
      else
        balas.push(new Bala(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
    }
  }
  draw(){
    var ctx = game.canvas.getContext("2d");
    ctx.save()
    if(this.n == 0)
      ctx.fillStyle = "#F00F";
    else if(this.n == 1)
      ctx.fillStyle = "#0F0F";
    else if(this.n == 2)
      ctx.fillStyle = "#00FF";
    else
      ctx.fillStyle = "#FF0F";
    //ctx.fillRect(this.x-5, this.y-5, this.w+10, this.h+10);
    ctx.translate(+this.x + this.w / 2, + this.y + this.h / 2);
    ctx.rotate(this.rot);
    ctx.translate(-this.x - this.w / 2, - this.y - this.h / 2);
    ctx.drawImage(imagens.canos, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
    ctx.restore();
    }
}
