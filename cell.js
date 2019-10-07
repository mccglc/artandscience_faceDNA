var zoom;
var spread;

class Cell {
  constructor() {
    zoom = floor(random(2,5));
    spread = random(3,20);
  }

  update(newImage,band,vol,size,startx,starty,vibrate) {
    let noises = map(noise((vol*spread) + noise(band)/3), 0, 1, 0, vibrate*zoom);
    let scale = size+noises;
    
    image(newImage,-scale/2,-scale/2, scale,scale);
  }
}