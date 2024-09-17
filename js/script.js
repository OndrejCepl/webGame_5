const canvas = document.getElementById('canvas5');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500; // time to trigger next raven
let lastTime = 0;

let ravens = [];
class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        // width and height of the rectangle
        this.width = this.spriteWidth * this.sizeModifier; //px
        this.height = this.spriteHeight * this.sizeModifier; //px
        this.x = canvas.width;
        // random position of the raven to fit the canvas win
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 + - 2.5;
        this.markedForDeletion = false;
        this.image = new Image()
        this.image.src = './img/raven.png';
        // sprite animation
        this.frame = 0;
        this.maxFrame = 4; 
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
    }

    // move the raven around
    update(deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        // delete ravens out of canvas
        if (this.x < 0 - this.width) this.markedForDeletion = true;

        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame ++; 
            this.timeSinceFlap = 0;
        }
    }

    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

// console.log(raven);
//value of timestamp is miliseconds
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if (timeToNextRaven > ravenInterval) {
        // create one new Raven obj and push it to ravens array
        ravens.push(new Raven());
        timeToNextRaven = 0;
    };
    // console.log(timeToNextRaven);
    // array literal
    // ... spread operator --> spreading ravens array inside new quick array
    // i can spread iterable to be expanded into another array
    [...ravens].forEach(object => object.update(deltaTime));
    [...ravens].forEach(object => object.draw());
    // filter method creates a new array with all the elements that pass the test
    // ravens = ravens.filter(object => !object.markedForDeletion);

    requestAnimationFrame(animate);
}

animate(0);
