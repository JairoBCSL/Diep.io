class Cano{
  constructor(n,classe,team,id){
    this.init(n,classe,team,id);
  }
  init(n,classe,team,id){
    this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.n = n; this.recuo = 0;
    this.classe = classe; this.team = team; this.id = id; this.rot = 0;
      switch(classe){
        case 0:{ // Normal
          this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
          this.w0 = 64 / 128; this.h0 = 64 / 128;
          this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 1:{ // Machine Gun
          this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
          this.y0 =  20 / 128; this.y1 = 88 / 128; this.y2 = 0;
          this.w0 =  64 / 128; this.h0 = 88 / 128;
          this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 2:{ // Twin
          this.x0 =  20 / 128; this.x1 = 78 / 128; this.x2 = -55/256*(2*this.n-1);
          this.y0 =  73 / 256; this.y1 = 78 / 128; this.y2 = +55/256*(2*this.n-1);
          this.w0 =  88 / 128; this.h0 = 55 / 128;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 3:{ // Sniper
          this.x0 =  24 / 128; this.x1 = 98 / 128; this.x2 = 0;
          this.y0 =  36 / 128; this.y1 = 98 / 128; this.y2 = 0;
          this.w0 =  80 / 128; this.h0 = 56 / 128;
          this.xSRC = 219; this.ySRC = 0; this.wSRC = 80; this.hSRC = 56;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 4:{ // Flank
          this.x0 = (32 + 8 * this.n) / 128; this.x1 = (88 - 8 * this.n) / 128;  this.x2 = 0;
          this.y0 = 32 / 128; this.y1 = (88 - 8 * this.n) / 128; this.y2 = 0;
          this.w0 =  (64 - 16 * this.n) / 128, this.h0 = 64 / 128;
          this.xSRC = 300 * this.n; this.ySRC = 0; this.wSRC = 64 - 16 * this.n; this.hSRC = 64;
          this.r0 = Math.PI * this.n; this.r1 = 1;
          break;
        }
        case 5:{ // Smasher
          this.x0 =  -1 / 128; this.x1 = 0; this.x2 = 0; this.x2 = 0;
          this.y0 =  -11 / 128; this.y1 = 0; this.y2 = 0; this.y2 = 0;
          this.w0 =  130 / 128; this.h0 = 150 / 128;
          this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 6:{ // Destroyer
          this.x0 =  28 / 128; this.x1 = 84 / 128; this.x2 = 0;
          this.y0 =  20 / 128; this.y1 = 84 / 128;  this.y2 = 0;
          this.w0 =  72 / 128; this.h0 = 88 / 128;
          this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 7:{ // Gunner
          if(this.n == 0){
            this.x0 =  49 / 256; this.x1 = 65 / 128; this.x2 = -45/128;
            this.y0 =  98 / 256; this.y1 = 65 / 128; this.y2 = 45/128;
            this.w0 =  78 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 =  12 / 128; this.x1 = 155 / 256; this.x2 = 15/128;
            this.y0 =  49 / 128; this.y1 = 155 / 256; this.y2 = -15/128;
            this.w0 =  103 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 2){
            this.x0 =  12 / 128; this.x1 = 155 / 256; this.x2 = -15/128;
            this.y0 =  49 / 128; this.y1 = 155 / 256; this.y2 = 15/128;
            this.w0 =  103 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }else{
            this.x0 =  49 / 256; this.x1 = 65 / 128; this.x2 = 45/128;
            this.y0 =  98 / 256; this.y1 = 65 / 128; this.y2 = -45/128;
            this.w0 =  78 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 8:{ // Rifle
          this.x0 =  (32-this.n*8) / 128; this.x1 = (88+this.n*10) / 128; this.x2 = 0;
          this.y0 =  (20+this.n*16) / 128; this.y1 = (88+this.n*10) / 128; this.y2 = 0;
          this.w0 =  (64+this.n*16) / 128; this.h0 = (88-this.n*32) / 128;
          this.xSRC = (65+this.n*154); this.ySRC = 0; this.wSRC = (64+this.n*16); this.hSRC = (88-this.n*32);
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 9:{ // Triple Shot
          this.x0 =  24 / 128; this.x1 = 96 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 96 / 128; this.y2 = 0;
          this.w0 =  80 / 128; this.h0 = 64 / 128;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
          this.r0 = (this.n-1)*Math.PI/4; this.r1 = 1;
          break;
        }
        case 10:{ // Quad Tank
          this.x0 =  24 / 128; this.x1 = 96 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 96 / 128; this.y2 = 0;
          this.w0 =  80 / 128; this.h0 = 64 / 128;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
          this.r0 = this.n*Math.PI/2; this.r1 = 1;
          break;
        }
        case 11:{ // Twin Flank
          this.x0 =  20 / 128; this.x1 = 78 / 128; this.x2 = -55/256*(2*(this.n%2)-1);
          this.y0 =  73 / 256; this.y1 = 78 / 128; this.y2 = +55/256*(2*(this.n%2)-1);
          this.w0 =  88 / 128; this.h0 = 55 / 128;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
          this.r0 = Math.floor(this.n/2)*Math.PI; this.r1 = 1;
          break;
        }
        case 12:{ // Stalker
          this.x0 =  6 / 128; this.x1 = 116 / 128; this.x2 = 0;
          this.y0 =  36 / 128; this.y1 = 116 / 128; this.y2 = 0;
          this.w0 =  116 / 128; this.h0 = 56 / 128;
          this.xSRC = 738; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 14:{ // Hunter
            this.x0 =  (32-4*this.n) / 128; this.x1 = (103-19*this.n) / 128; this.x2 = 0;
            this.y0 =  (32-12*this.n) / 128; this.y1 = (103-19*this.n) / 128; this.y2 = 0;
            this.w0 =  (64+8*this.n) / 128; this.h0 = (64+24*this.n) / 128;
            this.xSRC = 480*this.n; this.ySRC = 0; this.wSRC = (64+8*this.n); this.hSRC = (64+24*this.n);
            this.r0 = 0; this.r1 = 1;
          break;
        }
        case 16:{ // Tri-Angle
          if(this.n == 0){
            this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
            this.w0 =  64 / 128; this.h0 = 64 / 128;
            this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 =  Math.PI * 5 / 6; this.r1 = 1;
          }else{
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = -Math.PI * 5 / 6; this.r1 = 1;
          }
          break;
        }
        case 18:{ // Hybrid
          this.x0 =  28 / 128; this.x1 = 84 / 128; this.x2 = 0;
          this.y0 =  20 / 128; this.y1 = 84 / 128;  this.y2 = 0;
          this.w0 =  72 / 128; this.h0 = 88 / 128;
          this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 22:{ // Auto Gunner
          if(this.n == 0){
            this.x0 =  49 / 256; this.x1 = 65 / 128; this.x2 = -45/128;
            this.y0 =  98 / 256; this.y1 = 65 / 128; this.y2 = 45/128;
            this.w0 =  78 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 =  12 / 128; this.x1 = 155 / 256; this.x2 = 15/128;
            this.y0 =  49 / 128; this.y1 = 155 / 256; this.y2 = -15/128;
            this.w0 =  103 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 2){
            this.x0 =  12 / 128; this.x1 = 155 / 256; this.x2 = -15/128;
            this.y0 =  49 / 128; this.y1 = 155 / 256; this.y2 = 15/128;
            this.w0 =  103 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 3){
            this.x0 =  49 / 256; this.x1 = 65 / 128; this.x2 = 45/128;
            this.y0 =  98 / 256; this.y1 = 65 / 128; this.y2 = -45/128;
            this.w0 =  78 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 23:{ // Gunner Trapper
          if(this.n == 0){
            this.x0 =  12 / 128; this.x1 = 155 / 256; this.x2 = 20/128;
            this.y0 =  49 / 128; this.y1 = 155 / 256; this.y2 = -20/128;
            this.w0 =  103 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 =  12 / 128; this.x1 = 155 / 256; this.x2 = -20/128;
            this.y0 =  49 / 128; this.y1 = 155 / 256; this.y2 = 20/128;
            this.w0 =  103 / 128; this.h0 = 30 / 128;
            this.xSRC = 553; this.ySRC = 31; this.wSRC = 103; this.hSRC = 30;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 24:{ // Streamer
          this.x0 =  6 / 128; this.x1 = 115 / 128; this.x2 = 0;
          this.y0 =  36 / 128; this.y1 = 115 / 128; this.y2 = 0;
          this.w0 =  116 / 128; this.h0 = 56 / 128;
          this.xSRC = 1116; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 25:{ // Triplet
          if(this.n == 0){
            this.x0 =  40 / 256; this.x1 = 102 / 128; this.x2 = 0;
            this.y0 =  72 / 256; this.y1 = 102 / 128; this.y2 = 0;
            this.w0 =  88 / 128; this.h0 = 56 / 128;
            this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 56;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 =  40 / 256; this.x1 = 75 / 128; this.x2 = -29/128;
            this.y0 =  72 / 256; this.y1 = 75 / 128; this.y2 = 29/128;
            this.w0 =  88 / 128; this.h0 = 56 / 128;
            this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 56;
            this.r0 = 0; this.r1 = 1;
          }else{
            this.x0 =  40 / 256; this.x1 = 75 / 128; this.x2 = 29/128;
            this.y0 =  72 / 256; this.y1 = 75 / 128; this.y2 = -29/128;
            this.w0 =  88 / 128; this.h0 = 56 / 128;
            this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 56;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 26:{ // PentaShot
          this.x0 =  24 / 128; this.x1 = (96 - 16 * Math.abs(this.n-2)) / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = (96 - 16 * Math.abs(this.n-2)) / 128; this.y2 = 0;
          this.w0 =  80 / 128; this.h0 = 64 / 128;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
          this.r0 = - Math.PI / 4 + Math.PI / 8 * this.n; this.r1 = 1;
          break;
        }
        case 27:{ // SpreadShot
          this.x0 =  25 / 128; this.x1 = (81 - 8 * Math.abs(this.n-5)) / 128; this.x2 = 0;
          this.y0 =  49 / 128; this.y1 = (81 - 8 * Math.abs(this.n-5)) / 128; this.y2 = 0;
          this.w0 =  78 / 128; this.h0 = 30 / 128;
          this.xSRC = 553; this.ySRC = 0; this.wSRC = 78; this.hSRC = 30;
          this.r0 = - Math.PI * 4 / 9 + Math.PI * 4 / 45 * this.n; this.r1 = 1;
          break;
        }
        case 28:{ // Octa Tank
          this.x0 =  24 / 128; this.x1 = 96 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 96 / 128; this.y2 = 0;
          this.w0 =  80 / 128; this.h0 = 64 / 128;
          this.xSRC = 657; this.ySRC = 0; this.wSRC = 80; this.hSRC = 64;
          this.r0 = Math.PI / 4 * this.n; this.r1 = 1;
          break;
        }
        case 30:{ // Triple Flank
          this.x0 =  20 / 128; this.x1 = 78 / 128; this.x2 = -55/256*(2*(this.n%2)-1);
          this.y0 =  73 / 256; this.y1 = 78 / 128; this.y2 = +55/256*(2*(this.n%2)-1);
          this.w0 =  88 / 128; this.h0 = 55 / 128;
          this.xSRC = 130; this.ySRC = 0; this.wSRC = 88; this.hSRC = 55;
          this.r0 = Math.floor(this.n/2)*Math.PI*2/3; this.r1 = 1;
          break;
        }
        case 37:{ // Assassin
          this.x0 =  6 / 128; this.x1 = 109 / 128; this.x2 = 0;
          this.y0 =  24 / 128; this.y1 = 109 / 128; this.y2 = 0;
          this.w0 =  116 / 128; this.h0 = 80 / 128;
          this.xSRC = 1299; this.ySRC = 0; this.wSRC = 116; this.hSRC = 80;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 38:{ // Watcher
          if(this.n == 0){
            this.x0 =  39 / 128; this.x1 = 105 / 128; this.x2 = 0;
            this.y0 =  20 / 128; this.y1 = 105 / 128; this.y2 = 0;
            this.w0 =  50 / 128; this.h0 = 88 / 128;
            this.xSRC = 855; this.ySRC = 0; this.wSRC = 50; this.hSRC = 88;
            this.r0 = 0; this.r1 = 1;
          }else{
            this.x0 =  32 / 128; this.x1 = 78 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 78 / 128; this.y2 = 0;
            this.w0 = 64 / 128; this.h0 = 64 / 128;
            this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 39:{ // Predator
          if(this.n == 2){
            this.x0 =  28 / 128; this.x1 = 83 / 128; this.x2 = 0;
            this.y0 =  20 / 128; this.y1 = 83 / 128; this.y2 = 0;
            this.w0 =  72 / 128; this.h0 = 88 / 128;
            this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 = 32 / 128; this.x1 = 102 / 128; this.x2 = 0;
            this.y0 = 32 / 128; this.y1 = 102 / 128; this.y2 = 0;
            this.w0 = 64 / 128; this.h0 = 64 / 128;
            this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
            this.r0 = 0; this.r1 = 1;
          }else{
            this.x0 =  6 / 128; this.x1 = 90 / 128; this.x2 = 0;
            this.y0 =  36 / 128; this.y1 = 90 / 128; this.y2 = 0;
            this.w0 =  116 / 128; this.h0 = 56 / 128;
            this.xSRC = 738; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 40:{ // Charger
          if(this.n == 1){
            this.x0 =  28 / 128; this.x1 = 83 / 128; this.x2 = 0;
            this.y0 =  20 / 128; this.y1 = 83 / 128; this.y2 = 0;
            this.w0 =  72 / 128; this.h0 = 88 / 128;
            this.xSRC = 480; this.ySRC = 0; this.wSRC = 72; this.hSRC = 88;
            this.r0 = 0; this.r1 = 1;
          }else{
            this.x0 =  25 / 128; this.x1 = 104 / 128; this.x2 = 0;
            this.y0 =  20 / 128; this.y1 = 104 / 128; this.y2 = 0;
            this.w0 =  78 / 128; this.h0 = 88 / 128;
            this.xSRC = 1416; this.ySRC = 0; this.wSRC = 78; this.hSRC = 88;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 41:{ // Ranger
          if(this.n == 0){
            this.x0 =  6 / 128; this.x1 = 116 / 128; this.x2 = 0;
            this.y0 =  36 / 128; this.y1 = 116 / 128; this.y2 = 0;
            this.w0 =  116 / 128; this.h0 = 56 / 128;
            this.xSRC = 738; this.ySRC = 0; this.wSRC = 116; this.hSRC = 56;
            this.r0 = 0; this.r1 = 1;
          }else{
            this.x0 =  47 / 128; this.x1 = 68 / 128; this.x2 = 0;
            this.y0 =  24 / 128; this.y1 = 68 / 128; this.y2 = 0;
            this.w0 =  34 / 128; this.h0 = 80 / 128;
            this.xSRC = 1495; this.ySRC = 0; this.wSRC = 34; this.hSRC = 80;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 45:{ // Grinder
          this.x0 =  -21 / 128; this.x1 = 0 / 128; this.x2 = 0;
          this.y0 =  -21 / 128; this.y1 = 0 / 128; this.y2 = 0;
          this.w0 =  170 / 128; this.h0 = 170 / 128;
          this.xSRC = 1606; this.ySRC = 0; this.wSRC = 170; this.hSRC = 170;
          this.r0 = 0; this.r1 = (1 - 2 * this.n);
          break;
        }
        case 46:{ // Auto Smasher
          this.x0 =  -1 / 128; this.x1 = 0; this.x2 = 0; this.x2 = 0;
          this.y0 =  -11 / 128; this.y1 = 0; this.y2 = 0; this.y2 = 0;
          this.w0 =  130 / 128; this.h0 = 150 / 128;
          this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 47:{ // Landmine
          this.x0 =  -21 / 128; this.x1 = 0; this.x2 = 0;
          this.y0 =  -21 / 128; this.y1 = 0; this.y2 = 0;
          this.w0 =  170 / 128; this.h0 = 170 / 128;
          this.xSRC = 1778; this.ySRC = 0; this.wSRC = 170; this.hSRC = 170;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 48:{ // Shield Smasher
          this.x0 =  -1 / 128; this.x1 = 0; this.x2 = 0;
          this.y0 =  -11 / 128; this.y1 = 0; this.y2 = 0;
          this.w0 =  130 / 128; this.h0 = 150 / 128; this.r0 = + Math.PI / 6 * this.n;
          this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
          this.r0 = Math.PI / 6 * this.n; this.r1 = 1;
          break;
        }
        case 49:{ // Oversmasher
          if(this.n == 0){
            this.x0 =  -1 / 128; this.x1 = 0; this.x2 = 0;
            this.y0 =  -11 / 128; this.y1 = 0; this.y2 = 0;
            this.w0 =  130 / 128; this.h0 = 150 / 128;
            this.xSRC = 349; this.ySRC = 0; this.wSRC = 130; this.hSRC = 150;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 50:{ // Booster
          if(this.n == 0){
            this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
            this.w0 =  64 / 128; this.h0 = 64 / 128;
            this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 =  40 / 128; this.x1 = 60 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 60 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = Math.PI * 2 / 3; this.r1 = 1;
          }else if(this.n == 2){
            this.x0 =  40 / 128; this.x1 = 60 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 60 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = -Math.PI * 2 / 3; this.r1 = 1;
          }else if(this.n == 3){
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = Math.PI * 5 / 6; this.r1 = 1;
          }else{
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = -Math.PI * 5 / 6; this.r1 = 1;
          }
          break;
        }
        case 51:{ // Warrior
          if(this.n == 0){
            this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
            this.w0 =  64 / 128; this.h0 = 64 / 128;
            this.xSRC = 0; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = Math.PI * 5 / 6; this.r1 = 1;
          }else if(this.n == 2){
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = -Math.PI * 5 / 6; this.r1 = 1;
          }else if(this.n == 3){
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = Math.PI / 2; this.r1 = 1;
          }else{
            this.x0 =  40 / 128; this.x1 = 80 / 128; this.x2 = 0;
            this.y0 =  32 / 128; this.y1 = 80 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 64 / 128;
            this.xSRC = 300; this.ySRC = 0; this.wSRC = 48; this.hSRC = 64;
            this.r0 = -Math.PI / 2; this.r1 = 1;
          }
          break;
        }
        case 52:{ // Technician
          this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
          this.w0 = 64 / 128; this.h0 = 64 / 128;
          this.xSRC = 1949; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 53:{ // Engennier
          this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
          this.w0 = 64 / 128; this.h0 = 64 / 128;
          this.xSRC = 1949; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 54:{ // Scientist
          this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
          this.w0 = 64 / 128; this.h0 = 64 / 128;
          this.xSRC = 1949; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 55:{ // Medic
          this.x0 =  32 / 128; this.x1 = 88 / 128; this.x2 = 0;
          this.y0 =  32 / 128; this.y1 = 88 / 128; this.y2 = 0;
          this.w0 = 64 / 128; this.h0 = 64 / 128;
          this.xSRC = 1949; this.ySRC = 0; this.wSRC = 64; this.hSRC = 64;
          this.r0 = 0; this.r1 = 1;
          break;
        }
        case 61:{ // Rifle Tower
          if(this.n == 0){ // Base
            this.x0 =  47 / 128; this.x1 = 68 / 128; this.x2 = 0;
            this.y0 =  24 / 128; this.y1 = 68 / 128; this.y2 = 0;
            this.w0 =  34 / 128; this.h0 = 80 / 128;
            this.xSRC = 1495; this.ySRC = 0; this.wSRC = 34; this.hSRC = 80;
            this.r0 = 0; this.r1 = 1;
          }else if(this.n == 1){ // Fora
            this.x0 =  40 / 128; this.x1 = 83 / 128; this.x2 = 0;
            this.y0 =  31 / 128; this.y1 = 83 / 128; this.y2 = 0;
            this.w0 =  48 / 128; this.h0 = 66 / 128;
            this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
            this.r0 = 0; this.r1 = 1;
          }else{ // Dentro
            this.x0 =  24 / 128; this.x1 = 78 / 128; this.x2 = 0;
            this.y0 =  36 / 128; this.y1 = 78 / 128; this.y2 = 0;
            this.w0 =  80 / 128; this.h0 = 56 / 128;
            this.xSRC = 219; this.ySRC = 0; this.wSRC = 80; this.hSRC = 56;
            this.r0 = 0; this.r1 = 1;
          }
          break;
        }
        case 62:{ // 16 Shot Tower
          if(this.n < 16){
            this.x0 =  54 / 128; this.x1 = 73 / 128; this.x2 = 0;
            this.y0 =  59 / 128; this.y1 = 73 / 128; this.y2 = 0;
            this.w0 =  20 / 128; this.h0 = 14 / 128;
            this.xSRC = 219; this.ySRC = 0; this.wSRC = 80; this.hSRC = 56;
            this.r0 = Math.PI * this.n * 2 / 16; this.r1 = 1;
          }else{
            this.x0 =  56 / 128; this.x1 = 69 / 128; this.x2 = 0;
            this.y0 =  55 / 128; this.y1 = 69 / 128; this.y2 = 0;
            this.w0 =  16 / 128; this.h0 = 22 / 128;
            this.xSRC = 65; this.ySRC = 0; this.wSRC = 64; this.hSRC = 88;
            this.r0 = Math.PI * this.n * 2 / 16; this.r1 = 1;
          }
          break;
        }
      }
  }
  update(){
    if(this.recuo>0)
      this.recuo--;
    this.x = naves[this.id].x + naves[this.id].w * this.x0 + (300-this.recuo)/300 * naves[this.id].w * this.x1 * Math.cos(naves[this.id].rot*this.r1+this.r0) + naves[this.id].w * this.x2 * Math.sin(naves[this.id].rot*this.r1+this.r0);
    this.y = naves[this.id].y + naves[this.id].h * this.y0 + (300-this.recuo)/300 * naves[this.id].h * this.y1 * Math.sin(naves[this.id].rot*this.r1+this.r0) + naves[this.id].h * this.y2 * Math.cos(naves[this.id].rot*this.r1+this.r0);
    this.w = this.w0 * naves[this.id].w; this.h = this.h0 * naves[this.id].w;
    this.rot = naves[this.id].rot*this.r1 + this.r0;
  }
  shoot(){
    this.recuo = 30;
    let x = (this.w>this.h)?(this.x+this.w/2-this.h/2):(this.x+this.h/2-this.w/2);
    let y = (this.w>this.h)?(this.y+this.w/2-this.h/2):(this.y+this.h/2-this.w/2);
    let w = (this.w>this.h)?this.h:this.w;
    let h = (this.w>this.h)?this.h:this.w;
    if(this.classe == 37 && this.n == 1)
      balas.push(new Bala(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen / 20, naves[this.id].bulletDmg * 100, naves[this.id].team, naves[this.id].classe, this.id, this.n));
    else if(this.classe == 40 && this.n == 0)
      balas.push(new Bala(x, y, naves[this.id].bulletSize*2, naves[this.id].bulletSize*2, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg*4, naves[this.id].team, naves[this.id].classe, this.id, this.n));
    else if(this.classe == 55 && this.n == 1)
      balas.push(new Bala(x, y, naves[this.id].bulletSize*32, naves[this.id].bulletSize*32, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
    else if(this.classe == 48)
      balas.push(new Escudo(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
    else
      balas.push(new Bala(x, y, naves[this.id].bulletSize, naves[this.id].bulletSize, naves[this.id].bulletSpd, this.rot, naves[this.id].bulletPen, naves[this.id].bulletDmg, naves[this.id].team, naves[this.id].classe, this.id, this.n));
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
