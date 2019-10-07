let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22;
let images = [];
let cells = [];
let randBand = [];
let randImg = [];
let randSizes = [];
let startxs = [];
let startys = [];
let randas = [];
let randrs = [];
let randgs = [];
let randbs = [];
let rotSpeeds = [];
let vibrates = [];
let radiuss = [];
let angs = [];
let x = [];
let y = [];
let cellsNo;
let opacities = [];
let repeatMode;
let rotateMode = [];

let mic, fft;
let spectrum;

let opacity;

function preload() {
  img1 = loadImage('images/img1.png');
  img2 = loadImage('images/img2.png');
  img3 = loadImage('images/img3.png');
  img4 = loadImage('images/img4.png');
  img5 = loadImage('images/img5.png');
  img6 = loadImage('images/img6.png');
  img7 = loadImage('images/img7.png');
  img8 = loadImage('images/img8.png');
  img9 = loadImage('images/img9.png');
  img10 = loadImage('images/img10.png');
  img11 = loadImage('images/img11.png');
  img12 = loadImage('images/img12.png');
  img13 = loadImage('images/img13.png');
  img14 = loadImage('images/img14.png');
  img15 = loadImage('images/img15.png');
  img16 = loadImage('images/img16.png');
  img17 = loadImage('images/img17.png');
  img18 = loadImage('images/img18.png');
  img19 = loadImage('images/img19.png');
  img20 = loadImage('images/img20.png');
  img21 = loadImage('images/img21.png');
  img22 = loadImage('images/img22.png');
}

function setup() {
  var can = createCanvas(windowWidth, windowHeight);
  opacity = floor(random(0,255));
  cellsNo = random(3,10);
  
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22];
   
  for (let i = 0; i < cellsNo; i++) {
    cells.push(new Cell());
    randImg[i] = floor(random(0,images.length-1));
    randBand[i] = floor(random(0,800));
    randSizes[i] = random(100,700);
    startxs[i] = random(width*0.3,width*0.8);
    startys[i] = random(height*0.2,height*0.8);
    if(rotateMode[i] === 1) {
      randas[i] = 0;
    } else {
      randas[i] = 0;
    }
    randrs[i] = floor(random(150,255));
    randgs[i] = floor(random(150,255));
    randbs[i] = floor(random(200,255));
    rotSpeeds[i] = random(0.001,0.002);
    vibrates[i] = random(50,500);
    angs[i] = 0;
    radiuss[i] = noise(map(randBand[i],0,400,0,1));
    opacities[i] = random(10,100);
    repeatMode = floor(random(0,2));
    rotateMode[i] = floor(random(0,2));
  }
}

function draw() {
  background(250,opacity);
  
  spectrum = fft.analyze();
  let vol = mic.getLevel();
  
  for(let i=0; i<cells.length; i++) {
    var newImage = images[randImg[i]];
    var freq = spectrum[randBand[i]];
    var startx = startxs[i];
    var starty = startys[i];
    var size = randSizes[i];
    var a = randas[i];
    var rotSpeed = rotSpeeds[i];
    var r = randrs[i];
    var g = randgs[i];
    var b = randbs[i];
    var vibrate = vibrates[i];
    
    angs[i] += map(randBand[i],0,300,0,1)/10;
    x[i] = startxs[i] + (cos(angs[i])*radiuss[i]*50);
    y[i] = startys[i] + (sin(angs[i])*radiuss[i]*50);
    
    if(repeatMode === 1) {
      fill(250,opacities[i]);
      rect(0,0,width,height); 
    }
    console.log(repeatMode);
    
    push();
    translate(x[i],y[i]);
    rotate(a);
    tint(r, g, b);
    cells[i].update(newImage,freq,vol,size,startx,starty,vibrate);
    pop();
    if(repeatMode[i] === 1) {
      randas[i]+=rotSpeed;
    } else {
      randas[i]-=rotSpeed;
    }
  }
}