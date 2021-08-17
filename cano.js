class Cano{
  constructor(spriteSRC,n,classe,team,id){
    this.sprite = new Image();
    this.sprite.src = spriteSRC;
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.n = n;
    this.xSRC = 0; this.ySRC = 0; this.wSRC = 0; this.hSRC = 0;
    this.classe = classe; this.team = team; this.id = id; this.rot = 0;
  }
  update(){
    console.log("Cano: " + this.n + " - " + naves[this.id].drones);
    switch(this.classe){
      case 0:{ // Normal
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y  + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
        this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        break;
      }
      case 1:{ // Machine Gun
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y  + naves[this.id].h * 20 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
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
      case 4:{ // Flank x - dw/2     y + dh/2
        if(!this.n){
          this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 64 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 40 / 128 + naves[this.id].w * 80 / 128 * Math.cos(naves[this.id].rot + Math.PI);
          this.y = naves[this.id].y + naves[this.id].h * 32 / 128 + naves[this.id].w * 80 / 128 * Math.sin(naves[this.id].rot + Math.PI);
          this.w = naves[this.id].w * 48 / 128, this.h = naves[this.id].h / 2; this.rot = naves[this.id].rot  + Math.PI;
          this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
        }
        break;
      }
      case 5:{ // Smasher
        this.x = naves[this.id].x + naves[this.id].w * -1 / 128 + naves[this.id].w * 0 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * -11 / 128 + naves[this.id].w * 0 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 130 / 128, this.h = naves[this.id].h * 150 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
        break; // 8 * 120 / 120 = 8
      }
      case 6:{ // Destroyer
        this.x = naves[this.id].x + naves[this.id].w * 28 / 128 + naves[this.id].w * 84 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y  + naves[this.id].h * 20 / 128 + naves[this.id].w * 84 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 72 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
        break; // 16 * 120 / 120 = 16
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
          this.x = naves[this.id].x + naves[this.id].w * 12 / 128 + naves[this.id].w * 155 / 256 * Math.cos(naves[this.id].rot) - naves[this.id].w * 15/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 49 / 128 + naves[this.id].w * 155 / 256 * Math.sin(naves[this.id].rot) + naves[this.id].w * 15/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 103 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 49 / 256 + naves[this.id].w * 65 / 128 * Math.cos(naves[this.id].rot) - naves[this.id].w * -45/128 * Math.sin(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 98 / 256 + naves[this.id].w * 65 / 128 * Math.sin(naves[this.id].rot) + naves[this.id].w * -45/128 * Math.cos(naves[this.id].rot);
          this.w = naves[this.id].w * 78 / 128, this.h = naves[this.id].h * 30 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
        }

        break; // 4 * 60 / 15 = 16
      }
      case 8:{ // Triple Shot
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
        break; // 3 * 4 * 60 / 45 = 16
      }
      case 9:{ // Quad Tank
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
        break; // 8 * 120 / 120 = 8
      }
      case 10:{ // Twin Flank
        if(this.n == 0){
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 + naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 - naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }else if(this.n == 1){
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 - naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 + naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }else if(this.n == 2){
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 + naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot + Math.PI) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot + Math.PI);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 - naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot + Math.PI) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot + Math.PI);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot + Math.PI;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }else{
          this.x = naves[this.id].x + naves[this.id].w * 20 / 128 - naves[this.id].w * 55/256 * Math.sin(naves[this.id].rot + Math.PI) + naves[this.id].w * 78 / 128 * Math.cos(naves[this.id].rot + Math.PI);
          this.y = naves[this.id].y + naves[this.id].h * 73 / 256 + naves[this.id].w * 55/256 * Math.cos(naves[this.id].rot + Math.PI) + naves[this.id].w * 78 / 128 * Math.sin(naves[this.id].rot + Math.PI);
          this.w = naves[this.id].w * 88 / 128, this.h = naves[this.id].h * 55 / 128; this.rot = naves[this.id].rot + Math.PI;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
        }
        break; // 8 * 120 / 120 = 8
      }
      case 11:{ // Assassin
        this.x = naves[this.id].x + naves[this.id].w * 6 / 128 + naves[this.id].w * 116 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 36 / 128 + naves[this.id].w * 116 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 116 / 128, this.h = naves[this.id].h * 56 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 738; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
        break; // 8 * 120 / 120 = 8
      }
      case 12:{ // Overseer
        this.x = naves[this.id].x + naves[this.id].w * 32 / 128 + naves[this.id].w * 88 / 128 * Math.cos(naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 88 / 128 * Math.sin(naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2);
        this.w = naves[this.id].w / 2, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot + Math.PI * (2 * this.n - 1) / 2;
        this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
        break; // 8 * 120 / 120 = 8
      }
      case 13:{ // Hunter
        this.x = naves[this.id].x + naves[this.id].w * (24+8*this.n) / 128 + naves[this.id].w * (98-10*this.n) / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * (36-4*this.n) / 128 + naves[this.id].w * (98-10*this.n) / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * (80-16*this.n) / 128, this.h = naves[this.id].h * (56+8*this.n) / 128; this.rot = naves[this.id].rot;
        this.xSRC = 219*(1-this.n); this.ySRC = 0; this.wSRC = (80-16*this.n); this.hSRC = (56+8*this.n);
        break; // 8 * 120 / 120 = 8
      }
      case 14:{ // Trapper
        this.x = naves[this.id].x + naves[this.id].w * 39 / 128 + naves[this.id].w * 85 / 128 * Math.cos(naves[this.id].rot);
        this.y = naves[this.id].y + naves[this.id].h * 20 / 128 + naves[this.id].w * 85 / 128 * Math.sin(naves[this.id].rot);
        this.w = naves[this.id].w * 50 / 128, this.h = naves[this.id].h * 88 / 128; this.rot = naves[this.id].rot;
        this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
        break; // 8 * 120 / 120 = 8
      }
      case 15:{ // Tri-Angle
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
        break; // 8 * 120 / 120 = 8
      }

    }
  }
  shoot(){
    let x = (this.w>this.h)?(this.x+this.w/2-this.h/2):(this.x);
    let y = (this.w>this.h)?(this.y):(this.y+this.h/2-this.w/2);
    let w = (this.w>this.h)?this.h:this.w;
    let h = (this.w>this.h)?this.h:this.w;
    if(this.classe == 12)
      drones.push(new Drone("bala.png", x, y, w, w, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, this.team, 1, this.id));
    else
      balas.push(new Bala("bala.png", x, y, w, h, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id));
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
    ctx.drawImage(this.sprite, this.xSRC, this.ySRC, this.wSRC, this.hSRC, this.x, this.y, this.w, this.h);
    ctx.restore();
    }
}
