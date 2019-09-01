var symbolSize = 36;
var streams = []

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  var y = 0;
  for(let i = 0; i <= window.innerWidth / symbolSize; i++){
    let stream = new Stream();
    stream.generateSymbols(x, y);
    streams.push(stream)
    x += symbolSize
    y += random(0, 20)
  }
  textSize(symbolSize);
}

function draw() {
  background(0);
  streams.forEach(stream => {
    stream.render();
  })
}

function Symbol(x, y, speed) {
	this.x = x
  this.y = y
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.value

  this.setToRandomSymbol = function() {
    if(frameCount % this.switchInterval == 0){
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      )
    }
  }
 
  this.setToRandomSymbol();

  this.rain = function (){
    if(this.y >= (window.innerHeight + symbolSize)){
      this.y = 0
    } else {
      this.y += this.speed
    }
    
  }
  
}


function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 20));
  this.speed = random(5, 10);

  this.generateSymbols = function(receivedX, receivedY) {
    let y = 0
    let x = receivedX

    for(let i = 0; i <= this.totalSymbols; i++){
      symbol = new Symbol(x, y, this.speed);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol)
      y -= symbolSize;
    }
  }

  this.render = function (){
    this.symbols.forEach(symbol => {
      this.symbols.indexOf(symbol)  === 0 ?  fill(0, 255, 0)  : fill(0, 180, 70);
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    })
  }
}